import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, '/login');
    }

    try {
        return {
            categories: await prisma.category.findMany(),
            book: await prisma.buku.findUnique({
                where: {
                    id: Number(params.bookId)
                }
            })
        };
    } catch (error) {
        console.error(error);
    }
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        let {
            judulBuku,
            gambar,
            penerbit,
            penulis,
            stok,
            sinopsis,
            tahunTerbit,
            isbn,
            jumlahHalaman,
            lokasi,
            idKategori
        } = Object.fromEntries(await request.formData()) as unknown as {
            judulBuku: string;
            gambar: string;
            penulis: string;
            penerbit: string;
            tahunTerbit: Date;
            isbn: number;
            jumlahHalaman: number;
            stok: number;
            idKategori: number;
            lokasi: string;
            sinopsis: string;
        };

        let masalah = {
            judulBuku,
            penerbit,
            penulis,
            stok,
            sinopsis,
            tahunTerbit,
            isbn,
            jumlahHalaman,
            lokasi,
            idKategori,
            missingJudulBuku: false,
            missingPenerbit: false,
            missingPenulis: false,
            missingStok: false,
            missingTahun: false,
            missingIsbn: false,
            missingjumlahHalaman: false,
            missingSinopsis: false,
            missingLokasi: false,
            missingIdKategori: false
        };

        if (!judulBuku) {
            masalah.missingJudulBuku = true;
        }

        if (!penerbit) {
            masalah.missingPenerbit = true;
        }

        if (!penulis) {
            masalah.missingPenulis = true;
        }

        if (!stok) {
            masalah.missingStok = true;
        }

        if (!tahunTerbit) {
            masalah.missingTahun = true;
        }

        if (!isbn) {
            masalah.missingIsbn = true;
        }

        if (!jumlahHalaman) {
            masalah.missingjumlahHalaman = true;
        }

        if (!lokasi) {
            masalah.missingLokasi = true;
        }

        if (!idKategori) {
            masalah.missingIdKategori = true;
        }

        if (
            !judulBuku ||
            !penerbit ||
            !penulis ||
            !stok ||
            !tahunTerbit ||
            !isbn ||
            !jumlahHalaman ||
            !lokasi ||
            !idKategori
        ) {
            return fail(400, masalah);
        }

        stok = Number(stok);
        jumlahHalaman = Number(jumlahHalaman);
        isbn = Number(isbn);
        idKategori = Number(idKategori);
        tahunTerbit = new Date(tahunTerbit);

        try {
            await prisma.buku.update({
                where: {
                    id: Number(params.bookId)
                },
                data: {
                    judulBuku,
                    gambar,
                    penerbit,
                    penulis,
                    stok,
                    tahunTerbit,
                    sinopsis,
                    isbn,
                    jumlahHalaman,
                    lokasi,
                    idKategori
                }
            });
        } catch (error) {
            console.log(error);
            return fail(500, { message: 'Terjadi kesalahan saat menambah buku' });
        }
        return { success: true };
    }
};