import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (session) {
        throw redirect(302, '/')
    }
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { username, password } = Object.fromEntries(await request.formData()) as Record<
            string,
            string
        >;

        const usernameCheck = await prisma.authUser.findUnique({
            where: {
                username: username
            }
        });

        if (!usernameCheck) {
            return fail(400, { username, noUsername: true });
        }

        try {
            const key = await auth.useKey('username', username, password)
            const session = await auth.createSession(key.userId)
            locals.auth.setSession(session)
        } catch (error) {
            console.log(error);
            return fail(400, { missingLogin: true, username });
        }

        throw redirect(302, '/');
    }
};