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