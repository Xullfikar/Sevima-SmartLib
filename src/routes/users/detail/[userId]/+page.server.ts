import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { auth } from '$lib/server/lucia.js';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, '/login');
    }

    return {
        userDetail: await prisma.authUser.findUnique({
            where: {
                id: params.userId
            }
        })
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
    },

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

        throw redirect(302, '/users');
    }
};