import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma.js';
import { sveltekit } from 'lucia-auth/middleware';
import { dev } from '$app/environment';

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: dev ? 'DEV' : 'PROD',
    middleware: sveltekit(),
    transformUserData: (userData) => {
        return {
            userId: userData.id,
            username: userData.username,
            nama: userData.nama
        };
    }
});

export type Auth = typeof auth;