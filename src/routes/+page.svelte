<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Search,
		Modal,
		Fileupload,
		Label,
		Input,
		Card,
		MenuButton,
		Dropdown,
		DropdownItem,
		ButtonGroup,
		Badge,
		Select,
		Alert,
		CloseButton
	} from 'flowbite-svelte';

	import productImage from '$lib/img/notImage.png';

	// File XLX Fitur
	import { read, utils, SSF } from 'xlsx';
	import myImage from '$lib/img/format_buku.png';
	let formModal = false;
	let files: any;
	let books: any;
	let kategori: any;
	const onFileSelected = (e: any) => {
		let selectedFile = e.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (e) => {
			let data = e.target?.result;
			let workbook = read(data, { type: 'binary' });
			workbook.SheetNames.forEach((sheet) => {
				let book = utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
				book.forEach((row: any) => {
					row.tahunTerbit = SSF.format('yyyy-mm-dd', row.tahunTerbit);
				});
				books = JSON.stringify(book);
			});
		};
	};

	import type { PageData, ActionData } from './$types.js';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';
	import { onDestroy, onMount } from 'svelte';
	export let data: PageData;
	export let form: ActionData;
	// @ts-ignore
	$: ({ categories, userDetail, stokUsed } = data);

	// Search Fitur
	// @ts-ignore
	const searchBook = data.books.map((book: any) => ({
		...book,
		searchTerms: `${book.judulBuku} ${book.category ? book.category.kategori : ''} ${book.penulis}`
	}));

	const searchStore = createSearchStore(searchBook);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
		items = $searchStore.filtered;
		totalItems.set(items.length);
	});

	// Pagiantion
	import { writable, get } from 'svelte/store';
	let currentPage = 1;
	let itemsPerPage = 10;
	let items = $searchStore.filtered;
	let totalItems = writable(items.length);
	let totalPages = Math.ceil(get(totalItems) / itemsPerPage);
	let visiblePages: any[] = [];

	function setPage(page: any) {
		currentPage = page;
	}

	totalItems.subscribe((newValue) => {
		totalPages = Math.ceil(newValue / itemsPerPage);
		updateVisiblePages();
	});

	function updatePagination() {
		totalPages = Math.ceil(get(totalItems) / itemsPerPage);
		updateVisiblePages();
	}

	function updateVisiblePages() {
		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(totalPages, startPage + 4);
		}

		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, endPage - 4);
		}

		visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItems.subscribe(() => {
		updatePagination();
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

	async function loadKategori() {
		if (categories) {
			kategori = await categories.map((item: any) => {
				return {
					value: String(item.id),
					name: item.kategori
				};
			});
		}
	}

	onMount(() => {
		loadKategori();
	});

	let muncul = false;
	const dipilih = () => {
		$searchStore.search = '';
		muncul = false;
	};

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
	<BreadcrumbItem home>
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
</Breadcrumb>

<div class="flex flex-col gap-3 md:flex-row justify-between items-center mb-4">
	<p class="text-xl md:text-3xl font-semibold dark:text-white">Daftar Buku</p>
	{#if userDetail.level == 'ADMIN'}
		<div class="grid grid-cols-2 gap-5">
			<Button gradient color="green" on:click={() => (formModal = true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-2 -ml-1 w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
					/>
				</svg>
				Tambah Excel
			</Button>
			<Button gradient color="green" href="/books/add">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-2 -ml-1 w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
					/>
				</svg>

				Tambah
			</Button>
		</div>
	{/if}
	<div class="grid grid-cols-2 gap-5">
		<div class="flex">
			<Select
				underline
				size="md"
				placeholder="Filter Kategori"
				bind:value={$searchStore.search}
				on:change={() => (muncul = true)}
			>
				{#if kategori}
					{#each kategori as { value, name }}
						<option value={name}>{name}</option>
					{/each}
				{/if}
			</Select>
			{#if muncul}
				<CloseButton on:click={() => dipilih()} />
			{/if}
		</div>
		<Search size="md" bind:value={$searchStore.search} placeholder="Search..." />
	</div>
</div>

{#if form?.deleteBook}
	<Alert color="green" dismissable accent class="mb-5">
		<span slot="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</span>
		<span class="font-medium">Buku</span> Berhasil Dihapus.
	</Alert>
{/if}

<div class="grid justify-items-center grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5 mb-6">
	{#each $searchStore.filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as book}
		<Card padding="none">
			{#if userDetail.level === 'ADMIN'}
				<div class="flex justify-end -mb-3">
					<MenuButton />
					<Dropdown class="w-36">
						<DropdownItem href="/books/edit/{book.id}">Ubah</DropdownItem>
						<form id={`delete-book-${book.id}`} action="?/deleteBook&id={book.id}" method="POST">
							<DropdownItem on:click={() => deleteBook(book)}>Hapus</DropdownItem>
						</form>
					</Dropdown>
				</div>
			{/if}
			<a href="/books/{book.id}" class="self-center">
				{#if book.gambar}
					<img class="px-4 pb-4 pt-4 rounded-t-lg" src={book.gambar} alt={book.judul} width="200" />
				{:else}
					<img class="px-4 pb-4 pt-4 rounded-t-lg" src={productImage} alt={'Not Image'} />
				{/if}
			</a>
			<div class="px-5 pb-5">
				<a href="/books/{book.id}">
					<h5 class="font-normal text-sm text-gray-700 dark:text-gray-400 leading-tight mb-2">
						{book.penulis}
					</h5>
					<h5 class="text-base font-medium tracking-tight text-gray-900 dark:text-white mb-1">
						{book.judulBuku}
					</h5>
					{#if lengthUsed(book.stok, book.id) < 1}
						<Badge large color="red"><h2>Kosong</h2></Badge>
					{:else}
						<Badge large color="green"
							><h2 class="">
								Tersedia: <span class="font-semibold"> {lengthUsed(book.stok, book.id)}</span>
							</h2>
						</Badge>
					{/if}
					<h6 class="mt-2 font-light italic text-sm text-gray-700 dark:text-gray-400 leading-tight">
						{#if book.category}
							{book.category.kategori}
						{/if}
					</h6>
				</a>
			</div>
		</Card>
	{/each}
</div>

<!-- Pagination -->
<div class="flex justify-center my-5">
	<ButtonGroup>
		<Button on:click={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 text-red-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
				/>
			</svg>
		</Button>
		{#each visiblePages as page}
			{#if currentPage === page}
				<Button on:click={() => setPage(page)} color="red">{page}</Button>
			{:else}
				<Button on:click={() => setPage(page)}>{page}</Button>
			{/if}
		{/each}
		<Button
			on:click={() => setPage(currentPage + 1)}
			disabled={currentPage === Math.ceil($totalItems / itemsPerPage)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 text-red-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
				/>
			</svg>
		</Button>
	</ButtonGroup>
</div>

<!-- Upload File Excel -->
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-2" action="?/tambahExcel" method="POST">
		<div class="flex justify-items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
				class="w-8 h-8 text-gray-900 dark:text-white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
				/>
			</svg>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white ms-3">Tambah Beberapa Buku</h3>
		</div>
		<Label>
			<span>Format File Excel</span>
		</Label>
		<p class="font-medium text-sm">Column A: judulBuku</p>
		<p class="font-medium text-sm">Column B: penerbit</p>
		<p class="font-medium text-sm">Column C: penulis</p>
		<p class="font-medium text-sm">Column D: stok</p>
		<p class="font-medium text-sm">Column E: tahunTerbit</p>
		<p class="font-medium text-sm">Column F: isbn</p>
		<p class="font-medium text-sm">Column G: jumlahHalaman</p>
		<p class="font-medium text-sm">Column H: lokasi</p>
		<img src={myImage} alt="format excel user" />
		<Label class="space-y-2">
			<span>Upload File Excel</span>
			<Fileupload
				name="books"
				accept=".xls,.xlsx"
				type="file"
				bind:files
				on:change={(e) => onFileSelected(e)}
			/>
		</Label>
		<Input type="text" name="books" value={books} style="display: none" readonly />
		<Button type="submit" class="w-full">Upload Excel</Button>
	</form>
</Modal>
