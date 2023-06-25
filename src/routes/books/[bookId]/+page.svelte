<script lang="ts">
	import {
		Hr,
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Card,
		Modal,
		Label,
		Input,
		Alert,
		ButtonGroup,
		InputAddon
	} from 'flowbite-svelte';
	import ReadMore from '$lib/components/ReadMore.svelte';

	import type { PageData, ActionData } from './$types.js';
	export let data: PageData;
	export let form: ActionData;

	// @ts-ignore
	$: ({ book, userDetail, stokUsed } = data);

	import myImage from '$lib/img/notImage.png';
	import { onMount } from 'svelte';

	let tahunTerbit = '';
	onMount(() => {
		const dateString = book.tahunTerbit;
		const date = new Date(dateString);

		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		tahunTerbit = `${day}/${month}/${year}`;
	});

	// konfirmasi delete
	function deleteBook(book: any) {
		const confirmed = confirm(`Apakah Anda yakin ingin menghapus Buku ${book.judulBuku}?`);
		if (confirmed) {
			// proceed with form submission
			const form = document.getElementById(`delete-book-${book.id}`);
			// @ts-ignore
			form.submit();
		}
	}

	// String Check
	function checkDiv(string) {
		if (string.includes('<div>')) {
			return true;
		} else {
			return false;
		}
	}

	// ReadMore
	function splitString(str: string) {
		// Mencari posisi pertama dari <br>
		let firstBr = str.indexOf('<br>');

		// Mengecek apakah <br> ditemukan
		if (firstBr !== -1) {
			// Memecah string menjadi dua bagian
			let part1 = str.substring(0, firstBr);
			let part2 = str.substring(firstBr + 4);

			// Menghapus whitespace di awal dan akhir string
			part1 = part1.trim();
			part2 = part2.trim();

			// Mengembalikan hasil pemecahan
			return {
				shortText: part1,
				longText: part2
			};
		} else {
			// Jika <br> tidak ditemukan, mengembalikan string asli sebagai part1 dan string kosong sebagai part2
			return {
				shortText: str.trim(),
				longText: ''
			};
		}
	}

	// fitur peminjaman
	let pinjamModal = false;
	// @ts-ignore
	if (form?.success || form?.onproses || form?.deadline || form?.required) {
		pinjamModal = true;
	}

	// Persediaan
	function lengthUsed(stok: number, id: any) {
		const stokUseds = stokUsed
			.map((item) => Object.values(item))
			.reduce((acc, val) => acc.concat(val), []);
		const hasil = stokUseds.filter((item) => item === id).length;
		const tersedia = stok - hasil;
		return tersedia;
	}
</script>

<Breadcrumb class="mb-4 mt-4">
	<BreadcrumbItem home href="/">
		<svelte:fragment slot="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4 mr-2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
				/>
			</svg>
		</svelte:fragment>
		Dashboard
	</BreadcrumbItem>
	<BreadcrumbItem>Buku</BreadcrumbItem>
	<BreadcrumbItem>{book.judulBuku}</BreadcrumbItem>
</Breadcrumb>

<div class="flex flex-col md:flex-row">
	<div class="md:w-1/3 md:pr-8">
		<!-- Section 1 -->
		<div class="sticky top-24 flex justify-center md:flex-none">
			<Card>
				{#if book.gambar}
					<img src={book.gambar} alt={book.judul} srcset="" width="225" />
				{:else}
					<img src={myImage} alt="" />
				{/if}
			</Card>
		</div>
	</div>
	<div class="md:w-2/3">
		<!-- Section 2 -->
		<div class="md:pl-8">
			<div class="grid grid-cols-3 items-center">
				<div class="col-span-2">
					<span class="text-gray-700 dark:text-gray-400 text-lg font-medium mb-5"
						>{book.penulis}</span
					>
					<h1 class="text-xl font-bold mb-3 dark:text-white">{book.judulBuku}</h1>
					{#if lengthUsed(book.stok, book.id) < 1}
						<Badge large color="red"><h1 class="text-xl">Kosong</h1></Badge>
					{:else}
						<Badge large color="green"
							><h1 class="text-xl">
								Tersedia: <span class="font-semibold"> {lengthUsed(book.stok, book.id)}</span>
							</h1>
						</Badge>
					{/if}
				</div>
				{#if userDetail.level === 'ADMIN'}
					<div class="grid justify-items-end gap-2 grid-cols-1 md:grid-cols-2">
						<Button color="primary" href="/books/edit/{book.id}">Ubah Buku</Button>
						<form id={`delete-book-${book.id}`} action="?/deleteBook&id={book.id}" method="POST">
							<Button color="primary" on:click={() => deleteBook(book)}>Hapus Buku</Button>
						</form>
					</div>
				{:else if userDetail.level === 'ANGGOTA'}
					<Button
						disabled={lengthUsed(book.stok, book.id) < 1 ? true : false}
						color="primary"
						on:click={() => (pinjamModal = true)}>Pinjam Buku</Button
					>
				{/if}
			</div>
			<Hr class="my-4 mx-auto md:my-8" />

			<h1 class="text-xl font-semibold mb-3 dark:text-white">Deskripsi Buku</h1>

			{#if !book.sinopsis}
				<p class="text-gray-700 dark:text-gray-400 leading-relaxed mb-3">
					sinopsis Belum di Update
				</p>
			{:else if !checkDiv(book.sinopsis)}
				<p class="text-gray-700 dark:text-gray-400 leading-relaxed mb-3">{book.sinopsis}</p>
			{:else}
				<ReadMore
					shortText={splitString(book.sinopsis).shortText}
					longText={splitString(book.sinopsis).longText}
				/>
			{/if}

			<Hr class="my-4 mx-auto md:my-8" />

			<h1 class="text-xl font-semibold mb-3 dark:text-white">Detail</h1>

			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">Penerbit:</span>
					<span class="text-gray-700 dark:text-gray-400">{book.penerbit}</span>
				</div>

				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">Tahun Terbit:</span>
					<span class="text-gray-700 dark:text-gray-400">{tahunTerbit}</span>
				</div>

				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">ISBN:</span>
					<span class="text-gray-700 dark:text-gray-400">{book.isbn}</span>
				</div>

				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">Jumlah Halaman:</span>
					<span class="text-gray-700 dark:text-gray-400">{book.jumlahHalaman}</span>
				</div>

				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">Kategori:</span>
					<span class="text-gray-700 dark:text-gray-400"
						>{book.category ? book.category.kategori : ''}</span
					>
				</div>

				<div class=" mb-4">
					<span class="mr-4 font-semibold dark:text-white">Lokasi/Rak:</span>
					<span class="text-gray-700 dark:text-gray-400">{book.lokasi}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Pinjam Buku -->
<Modal bind:open={pinjamModal} size="xs" autoclose={false}>
	{#if form?.success}
		<Alert color="green" accent>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				></span
			>
			<span class="text-lg font-medium">Peminjaman dalam status Waiting</span>
			<div slot="extra">
				<div class="mt-2 mb-4 text-sm">Silahkan menunggu konfirmasi dari pihak perpustakaan.</div>
				<div class="flex gap-2">
					<Button size="xs" color="green" href="/profile"
						><svg
							aria-hidden="true"
							class="-ml-0.5 mr-2 h-4 w-4"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path
								fill-rule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clip-rule="evenodd"
							/></svg
						>Cek Pinjaman</Button
					>
				</div>
			</div>
		</Alert>
	{/if}
	{#if form?.onproses}
		<Alert color="red" accent>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			<span class="font-medium">Buku</span> masih dalam proses
		</Alert>
	{/if}
	{#if form?.required}
		<Alert color="red" accent>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			<span class="font-medium">Waktu Peminjaman</span> wajib diisi
		</Alert>
	{/if}
	{#if form?.deadline}
		<Alert color="red" accent>
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			<span class="font-medium">Kembalikan Buku</span> yang telah mencapai tenggat pengembalian
		</Alert>
	{/if}
	<form action="?/borrowBook&id={book.id}" method="POST">
		<div class="text-center">
			<svg
				aria-hidden="true"
				class="mx-auto mb-4 w-14 h-14 text-red-600 dark:text-red-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<h3 class="mb-5 text-md font-normal text-red-500 dark:text-red-300">
				Dengan menekan tombol 'Pinjam', saya sepakat mematuhi persyaratan dan ketentuan peminjaman
				buku yang berlaku diperpustakaan. Saya akan merawat buku yang saya pinjam dengan baik dan
				mengembalikannya tepat waktu.
			</h3>
		</div>
		<div>
			<Label class="mb-2" for="lamaPinjam">Waktu Peminjaman</Label>
			<ButtonGroup class="w-full" size="md">
				<Input
					id="lamaPinjam"
					type="number"
					placeholder="Masukkan berpa lama anda akan meminjam buku"
					name="lamaPinjam"
				/>
				<InputAddon>Hari</InputAddon>
			</ButtonGroup>
		</div>
		<div class="text-center mt-5">
			<Button
				disabled={lengthUsed(book.stok, book.id) < 1 ? true : false}
				type="submit"
				gradient
				color="purpleToPink"
				class="mr-2">Pinjam</Button
			>
		</div>
	</form>
</Modal>
