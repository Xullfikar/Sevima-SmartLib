import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user, session } = await locals.auth.validateUser();
    if (!session) {
        throw redirect(302, '/login');
    }

    let book;
    try {
        book = await prisma.buku.findUnique({
            where: {
                id: Number(params.bookId)
            },
            include: {
                category: true
            }
        });
    } catch (error) {
        console.error(error);
        return fail(500, { message: 'Invalid Requets' });
    }

    return {
        book,
        userDetail: await prisma.authUser.findUnique({
            where: {
                id: user.userId
            }
        }),
        stokUsed: await prisma.peminjaman.findMany({
            where: {
                OR: [{ status: 'wait' }, { status: 'ready' }, { status: 'borrowed' }]
            },
            select: {
                bookId: true
            }
        })
    };
};

export const actions: Actions = {
    borrowBook: async ({ url, locals, request }) => {
        const { lamaPinjam } = Object.fromEntries(await request.formData()) as unknown as {
            lamaPinjam: number;
        };

        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        if (!lamaPinjam) {
            return fail(400, { required: true });
        }

        const bookId = Number(id);
        const peminjamId = (await locals.auth.validateUser()).user?.userId;
        const tanggalPeminjaman = new Date();
        let tanggalTenggat;

        if (lamaPinjam) {
            const tanggal = new Date();
            const tanggalProses = tanggal.setDate(tanggal.getDate() + Number(lamaPinjam));
            tanggalTenggat = new Date(tanggalProses);
        }

        const dalamProses = await prisma.peminjaman.findFirst({
            where: {
                OR: [
                    {
                        AND: [{ bookId: bookId }, { peminjamId: peminjamId }, { status: 'wait' }]
                    },
                    {
                        AND: [{ bookId: bookId }, { peminjamId: peminjamId }, { status: 'ready' }]
                    },
                    {
                        AND: [{ bookId: bookId }, { peminjamId: peminjamId }, { status: 'borrowed' }]
                    }
                ]
            }
        });

        const tenggat = await prisma.peminjaman.findFirst({
            where: {
                AND: [{ peminjamId: peminjamId }, { status: 'borrowed' }]
            },
            select: {
                tanggalTenggat: true
            }
        });

        // Menghitung selisih hari
        if (tenggat != null) {
            // @ts-ignore
            const timeDiff = tenggat.tanggalTenggat.getTime() - tanggalPeminjaman.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff < 0) {
                return fail(400, { deadline: true });
            }
        }

        if (dalamProses) {
            return fail(400, { onproses: true });
        }

        try {
            if (tanggalTenggat) {
                await prisma.peminjaman.create({
                    data: {
                        bookId,
                        peminjamId,
                        tanggalPeminjaman,
                        tanggalTenggat,
                        updatedAt: tanggalPeminjaman
                    }
                });
            }
        } catch (error) {
            console.error(error);
            return fail(400, { message: 'Gagal meminjam buku' });
        }

        return { success: true };
    },

    deleteBook: async ({ url }) => {
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        try {
            await prisma.buku.delete({
                where: {
                    id: Number(id)
                }
            });
        } catch (error) {
            console.error(error);
            return fail(400, { message: 'Gagal menghapus buku' });
        }

        throw redirect(302, '/');
    }
};