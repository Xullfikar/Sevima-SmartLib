<script lang="ts">
	// import myImage from './format_user.png';
	import {
		Fileupload,
		Breadcrumb,
		BreadcrumbItem,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		ButtonGroup,
		Button,
		Label,
		Modal,
		Input,
		Search
	} from 'flowbite-svelte';
	import type { PageData } from './$types.js';
	import { onDestroy } from 'svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';

	export let data: PageData;

	// Search Fitur
	// @ts-ignore
	const searchUsers = data.users.map((user: any) => ({
		...user,
		searchTerms: `${user.nama} ${user.level} ${user.username} ${user.nis} ${user.np}`
	}));

	const searchStore = createSearchStore(searchUsers);

	const unsubscribe = searchStore.subscribe((model: any) => searchHandler(model));

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
	function deleteUser(user: any) {
		const confirmed = confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.nama}?`);
		if (confirmed) {
			// proceed with form submission
			const form = document.getElementById(`delete-user-${user.id}`);
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
					d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
				/>nama
			</svg>
		</svelte:fragment>
		Users
	</BreadcrumbItem>
</Breadcrumb>

<div class="flex flex-col gap-3 md:flex-row justify-between items-center mb-4">
	<p class="text-xl md:text-3xl font-semibold dark:text-white">Daftar Pengguna</p>
	<div class="">
		<Button gradient color="green" href="/users/add">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-2 -ml-1 w-5 h-5"
			>
				<path
					d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
				/>
			</svg>
			Tambah
		</Button>
	</div>
	<div class="md:w-3/12">
		<Search size="md" bind:value={$searchStore.search} placeholder="Search..." />
	</div>
</div>

<Table shadow divClass="relative overflow-x-auto mb-5">
	<TableHead>
		<TableHeadCell>Nama Pengguna</TableHeadCell>
		<TableHeadCell>Username</TableHeadCell>
		<TableHeadCell>NA/NP</TableHeadCell>
		<TableHeadCell>Level</TableHeadCell>
		<TableHeadCell>Aksi</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each $searchStore.filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as user}
			<TableBodyRow>
				<TableBodyCell>{user.nama}</TableBodyCell>
				<TableBodyCell>{user.username}</TableBodyCell>
				<TableBodyCell>
					{#if user.level === 'ANGGOTA'}
						{user.na}
					{:else if user.level === 'PETUGAS'}
						{user.np}
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					{#if user.level === 'ANGGOTA'}
						<Badge large border color="green">Anggota</Badge>
					{:else if user.level === 'PETUGAS'}
						<Badge large border color="yellow">Petugas</Badge>
					{:else if user.level === 'ADMIN'}
						<Badge large border color="indigo">Admin</Badge>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<div class="inline-flex gap-1">
						<Button gradient color="blue" href="/users/detail/{user.id}">Detail</Button>
						<Button gradient color="purple" href="/users/edit/{user.id}">Ubah</Button>
						<form id={`delete-user-${user.id}`} action="?/deleteUser&id={user.id}" method="POST">
							<Button gradient color="red" on:click={() => deleteUser(user)}>Hapus</Button>
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
