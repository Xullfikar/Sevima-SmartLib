import type { PrismaClient } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest
		}
		// interface PageData {}
		// interface Platform {}
	}

	let prisma: PrismaClient;

	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type userAttributes = {
			username: string;
			nama: string;
			np: string;
			na: string;
			level: string;
		}
	}
}

export { };
