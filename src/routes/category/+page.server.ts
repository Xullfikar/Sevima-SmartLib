import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, '/login');
    }

    try {
        return {
            categories: await prisma.category.findMany()
        };
    } catch (error) {
        console.error(error);
    }
};

export const actions: Actions = {
    tambahCategory: async ({ request }) => {
        const { kategori } = Object.fromEntries(await request.formData()) as Record<string, string>;

        if (!kategori) {
            return fail(400, { kategori, missingKategori: true });
        }

        try {
            await prisma.category.create({
                data: {
                    kategori
                }
            });
        } catch (error) {
            console.error(error);
            return fail(400, { message: 'Gagal menambah category' });
        }

        return { success: true };
    },

    deleteCategory: async ({ url }) => {
        const id = url.searchParams.get('id');

        if (!id) {
            return fail(400, { message: 'gagal menghapus category' });
        }

        try {
            await prisma.category.delete({
                where: {
                    id: Number(id)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
};