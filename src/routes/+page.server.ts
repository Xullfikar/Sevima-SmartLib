import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.auth.validateUser();
    if (!session) {
        throw redirect(302, '/login');
    }

    return {
        books: await prisma.buku.findMany({
            include: {
                category: true
            }
        }),

        categories: await prisma.category.findMany(),

        userDetail: await prisma.authUser.findUnique({
            where: {
                id: user.userId
            }
        }),

        stokUsed: await prisma.peminjaman.findMany({
            where: {
                OR: [{ status: 'wait' }, { status: 'ready' }, { status: 'borrowed' }]
            },
            select: {
                bookId: true
            }
        })
    };
};

export const actions: Actions = {
    tambahExcel: async ({ request }) => {
        const books = Object.fromEntries(await request.formData()) as Record<string, string>;

        const arrayBook = JSON.parse(books.books);

        const arrayBooks = arrayBook.map((book: any) => {
            const tahunTerbitBaru = new Date(book.tahunTerbit);
            return {
                ...book,
                tahunTerbit: tahunTerbitBaru
            };
        });

        try {
            await prisma.buku.createMany({
                data: arrayBooks
            });
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Gagal upload file Excel!' });
        }

        return { success: true };
    },

    deleteBook: async ({ url }) => {
        const id = url.searchParams.get('id');
        if (!id) {
            return fail(400, { message: 'Invalid request' });
        }

        try {
            await prisma.buku.delete({
                where: {
                    id: Number(id)
                }
            });
        } catch (error) {
            console.error(error);
            return fail(400, { message: 'Gagal menghapus buku' });
        }

        return { deleteBook: true };
    }
};