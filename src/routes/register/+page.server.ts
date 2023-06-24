import { auth } from '$lib/server/lucia.js';
import { redirect, fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { Actions } from './$types.js';

export const actions: Actions = {
    default: async ({ request }) => {
        const { nama, username, password, kpassword } =
            Object.fromEntries(await request.formData()) as Record<string, string>;

        let masalah = {
            nama,
            username,
            password,
            kpassword,
        };

        if (!nama) {
            masalah.missingNama = true;
        }

        if (!username) {
            masalah.missingUsername = true;
        }

        const usernameCheck = await prisma.authUser.findUnique({
            where: {
                username: username
            }
        });

        if (usernameCheck) {
            masalah.usernameReady = true;
        }

        if (password != kpassword) {
            masalah.incorrect = true;
        }

        if (
            !nama ||
            !username ||
            usernameCheck ||
            password != kpassword
        ) {
            return fail(400, masalah);
        }
        const level = "ANGGOTA";
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
                    level,
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
        throw redirect(302, '/login');
    }
}