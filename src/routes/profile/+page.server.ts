import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { auth } from '$lib/server/lucia.js';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser();
    if (!session) {
        throw redirect(302, '/login');
    }

    try {
        return {
            userDetail: await prisma.authUser.findUnique({
                where: {
                    id: user.userId
                }
            }),
            pinjamanWait: await prisma.peminjaman.findMany({
                where: {
                    peminjamId: user.userId,
                    status: 'wait'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true,
                            id: true
                        }
                    }
                }
            }),
            pinjamanReady: await prisma.peminjaman.findMany({
                where: {
                    peminjamId: user.userId,
                    status: 'ready'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true,
                            id: true
                        }
                    }
                }
            }),
            pinjamanBorrowed: await prisma.peminjaman.findMany({
                where: {
                    peminjamId: user.userId,
                    status: 'borrowed'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true,
                            id: true
                        }
                    }
                }
            }),
            pinjamanReturned: await prisma.peminjaman.findMany({
                where: {
                    peminjamId: user.userId,
                    status: 'returned'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true,
                            id: true
                        }
                    }
                }
            })
        };
    } catch (error) {
        console.error(error);
    }
};

export const actions: Actions = {
    updatePassword: async ({ request }) => {
        const { username, password, Kpassword } = Object.fromEntries(await request.formData()) as {
            username: string;
            password: string;
            Kpassword: string;
        };

        if (password != Kpassword) {
            return fail(400, { incorrect: true });
        }

        try {
            await auth.updateKeyPassword('username', username, password);
        } catch (error) {
            console.error(error);
            if (error instanceof LuciaError) {
                const message = error.message;
                console.error(message);
            }
            return fail(400, { message: 'Gagal mengubah password' });
        }

        throw redirect(302, '/profile');
    }
};