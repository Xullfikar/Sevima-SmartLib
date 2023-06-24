import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { auth } from '$lib/server/lucia.js';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser();
    if (!session) {
        throw redirect(302, '/login');
    }

    const userLevel = await prisma.authUser.findUnique({
        select: {
            level: true
        },
        where: {
            id: user.userId
        }
    });

    if (userLevel?.level != 'ADMIN') {
        console.log(user);
        throw redirect(302, '/');
    }

    return {
        users: await prisma.authUser.findMany()
    };
};

export const actions: Actions = {
    createUser: async ({ request }) => {
        const students = Object.fromEntries(await request.formData()) as Record<string, string>;

        const arrayStudent = JSON.parse(students.students);

        const naCheck = await prisma.authUser.findMany({
            select: {
                na: true
            }
        });

        const NAA = naCheck.map((item) => item.na);

        createUsersWithDelay(arrayStudent);
        async function createUsersWithDelay(arrayStudent: string | any[]) {
            for (let i = 0; i < arrayStudent.length; i++) {
                const e = arrayStudent[i];
                if (!NAA.includes(e.NA)) {
                    const username = e.NA;
                    const password = e.NA;
                    const nama = e.Nama;
                    const na = e.NA;
                    await createUser(username, password, nama, na);
                }
            }
        }

        async function createUser(username: any, password: any, nama: any, na: any) {
            const level = 'ANGGOTA';
            const foto = null;
            const wa = null;
            const np = null;
            try {
                await auth.createUser({
                    primaryKey: {
                        providerId: 'username',
                        providerUserId: username,
                        password
                    },
                    attributes: {
                        nama,
                        username,
                        foto,
                        wa,
                        level,
                        np,
                        na,
                    }
                });
            } catch (error) {
                console.error(error);
                if (error instanceof LuciaError) {
                    const message = error.message;
                    console.error(message);
                }
                return fail(400, { message: 'Gagal membuat akun' });
            }
        }

        throw redirect(302, '/users');
    },

    deleteUser: async ({ url }) => {
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        try {
            await auth.deleteUser(id);
        } catch (error) {
            console.error(error);
            if (error instanceof LuciaError) {
                const message = error.message;
                console.error(message);
            }
            return fail(400, { message: 'Gagal menghapus user' });
        }

        throw redirect(302, '/users');
    }
};