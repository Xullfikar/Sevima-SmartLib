import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

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
                },
                select: {
                    level: true
                }
            }),
            pinjamanWait: await prisma.peminjaman.findMany({
                where: {
                    status: 'wait'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true,
                            lokasi: true
                        }
                    },
                    peminjam: {
                        select: {
                            nama: true
                        }
                    },
                    penanggungJawab: {
                        select: {
                            nama: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }),
            pinjamanReady: await prisma.peminjaman.findMany({
                where: {
                    status: 'ready'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true
                        }
                    },
                    peminjam: {
                        select: {
                            nama: true
                        }
                    },
                    penanggungJawab: {
                        select: {
                            nama: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }),
            pinjamanCancel: await prisma.peminjaman.findMany({
                where: {
                    status: 'cancel'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true
                        }
                    },
                    peminjam: {
                        select: {
                            nama: true
                        }
                    },
                    penanggungJawab: {
                        select: {
                            nama: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }),
            pinjamanBorrowed: await prisma.peminjaman.findMany({
                where: {
                    status: 'borrowed'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true
                        }
                    },
                    peminjam: {
                        select: {
                            nama: true
                        }
                    },
                    penanggungJawab: {
                        select: {
                            nama: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }),
            pinjamanReturned: await prisma.peminjaman.findMany({
                where: {
                    status: 'returned'
                },
                include: {
                    buku: {
                        select: {
                            judulBuku: true
                        }
                    },
                    peminjam: {
                        select: {
                            nama: true
                        }
                    },
                    penanggungJawab: {
                        select: {
                            nama: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            })
        };
    } catch (error) {
        console.error(error);
    }
};

export const actions: Actions = {
    siapkanBuku: async ({ url, locals }) => {
        const { user, session } = await locals.auth.validateUser();
        if (!session) {
            throw redirect(302, '/login');
        }
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        const currentTimestamp = new Date();

        try {
            await prisma.peminjaman.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status: 'ready',
                    updatedAt: currentTimestamp,
                    penanggungJawabId: user.userId
                }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Gagal Update Data' });
        }

        return { successReady: true };
    },

    cancelBuku: async ({ url, locals, request }) => {
        const { user, session } = await locals.auth.validateUser();
        if (!session) {
            throw redirect(302, '/login');
        }
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        const { catatan } = Object.fromEntries(await request.formData()) as unknown as {
            catatan: string;
        };

        if (!catatan) {
            return fail(400, { missingCatatan: true });
        }

        try {
            await prisma.peminjaman.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status: 'cancel',
                    catatan: catatan,
                    penanggungJawabId: user.userId
                }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Gagal Update Data' });
        }

        return { successCancel: true };
    },

    pinjamkanBuku: async ({ locals, url, request }) => {
        const { user, session } = await locals.auth.validateUser();
        if (!session) {
            throw redirect(302, '/login');
        }
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }
        const { kodeBuku } = Object.fromEntries(await request.formData()) as unknown as {
            kodeBuku: string;
        };
        if (!kodeBuku) {
            return fail(400, { missingKode: true });
        }
        try {
            await prisma.peminjaman.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status: 'borrowed',
                    kodeBuku: kodeBuku,
                    penanggungJawabId: user.userId
                }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Gagal Update Data' });
        }

        return { successKode: true };
    },

    kembalikanBuku: async ({ locals, url, request }) => {
        const { user, session } = await locals.auth.validateUser();
        if (!session) {
            throw redirect(302, '/login');
        }
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        const { catatan, masalah } = Object.fromEntries(await request.formData()) as unknown as {
            catatan: string;
            masalah: string;
        };

        if (masalah && !catatan) {
            return fail(400, { missingCatatan: true });
        }

        const today = new Date();

        try {
            await prisma.peminjaman.update({
                where: {
                    id: Number(id)
                },
                data: {
                    tanggalPengembalian: today,
                    status: 'returned',
                    catatan: catatan,
                    penanggungJawabId: user.userId
                }
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Gagal Update Data' });
        }

        return { successReturned: true };
    }
};