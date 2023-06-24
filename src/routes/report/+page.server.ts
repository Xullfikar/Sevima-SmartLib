import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const prerender = true;
export const csr = true;
export const ssr = false;

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser();
    if (!session) {
        throw redirect(302, '/login');
    }

    try {
        return {
            peminjamans: await prisma.peminjaman.findMany({
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
                }
            })
        };
    } catch (error) {
        console.error(error);
    }
};