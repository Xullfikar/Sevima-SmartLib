<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Search,
		Modal,
		Label,
		Input,
		Alert,
		Table,
		TableHead,
		TableBody,
		TableHeadCell,
		TableBodyCell,
		TableBodyRow,
		ButtonGroup
	} from 'flowbite-svelte';

	let formModal = false;

	import type { ActionData, PageData } from './$types.d.ts';
	import { onDestroy } from 'svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';
	export let form: ActionData;
	export let data: PageData;

	// Search Fitur
	// @ts-ignore
	const searchCategories = data.categories.map((category: any) => ({
		...category,
		searchTerms: `${category.kategori}`
	}));

	const searchStore = createSearchStore(searchCategories);

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
	function deleteCategory(category: any) {
		const confirmed = confirm(`Apakah Anda yakin ingin menghapus pengguna ${category.kategori}?`);
		if (confirmed) {
			// proceed with form submission
			const form = document.getElementById(`delete-category-${category.id}`);
			// @ts-ignore
			form.submit();
		}
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
					d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
				/>
			</svg>
		</svelte:fragment>
		Category
	</BreadcrumbItem>
</Breadcrumb>

<div class="flex flex-col gap-3 md:flex-row justify-between items-center mb-4">
	<p class="text-xl md:text-3xl font-semibold dark:text-white">Category Buku</p>
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
				d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
			/>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
		</svg>
		Tambah
	</Button>
	<div class="md:w-3/12">
		<Search size="md" bind:value={$searchStore.search} placeholder="Search..." />
	</div>
</div>

{#if form?.success}
	<Alert color="green" dismissable accent>
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
		<span class="font-medium">Kategori</span> berhasil ditambahkan
	</Alert>
{/if}

{#if form?.missingKategori}
	<Alert color="red" dismissable accent>
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
		<span class="font-medium">Kategori</span> wajib diisi
	</Alert>
{/if}

<Table shadow divClass="relative overflow-x-auto mb-5">
	<TableHead>
		<TableHeadCell>Nama Pengguna</TableHeadCell>
		<TableHeadCell>Aksi</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each $searchStore.filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as category}
			<TableBodyRow>
				<TableBodyCell>{category.kategori}</TableBodyCell>
				<TableBodyCell>
					<div class="inline-flex gap-1">
						<form
							id={`delete-category-${category.id}`}
							action="?/deleteCategory&id={category.id}"
							method="POST"
						>
							<Button size="sm" gradient color="red" on:click={() => deleteCategory(category)}
								>Hapus</Button
							>
						</form>
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

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

<!-- Tambah Category -->
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/tambahCategory" method="POST">
		<div class="flex justify-items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8 text-gray-900 dark:text-white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
			</svg>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white ms-3">Tambah Category Buku</h3>
		</div>
		<Label class="space-y-2">
			<span>Category</span>
			<Input type="text" name="kategori" placeholder="Masukkan kategori buku" />
		</Label>
		<Button type="submit" class="w-full mt-5">Tambah</Button>
	</form>
</Modal>
