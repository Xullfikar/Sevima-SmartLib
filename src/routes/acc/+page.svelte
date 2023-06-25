<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		ButtonGroup,
		Search,
		Select,
		Table,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		TableHead,
		TableHeadCell,
		Badge,
		Textarea,
		Alert,
		Label,
		Input
	} from 'flowbite-svelte';

	let Sstatus: any;

	import type { PageData, ActionData } from './$types.js';
	import { onDestroy } from 'svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';
	export let data: PageData;
	export let form: ActionData;

	//@ts-ignore
	$: ({ userDetail } = data);

	// Search Fitur
	// PinjamanWait
	// @ts-ignore
	const searchPinjamanWait = data.pinjamanWait.map((pinjaman: any) => ({
		...pinjaman,
		searchTerms: `${pinjaman.peminjam.nama} ${
			pinjaman.buku.judulBuku
		} ${pinjaman.tanggalPeminjaman.toLocaleDateString(
			'id-ID'
		)} ${pinjaman.tanggalTenggat.toLocaleDateString('id-ID')}`
	}));

	const searchStoreW = createSearchStore(searchPinjamanWait);

	const unsubscribeW = searchStoreW.subscribe((model) => searchHandler(model));

	// PinjamanReady
	// @ts-ignore
	const searchPinjamanReady = data.pinjamanReady.map((pinjaman: any) => ({
		...pinjaman,
		searchTerms: `${pinjaman.peminjam.nama} ${
			pinjaman.buku.judulBuku
		} ${pinjaman.tanggalPeminjaman.toLocaleDateString(
			'id-ID'
		)} ${pinjaman.tanggalTenggat.toLocaleDateString('id-ID')} ${pinjaman.penanggungJawab.nama}`
	}));

	const searchStoreR = createSearchStore(searchPinjamanReady);

	const unsubscribeR = searchStoreR.subscribe((model) => searchHandler(model));

	// PinjamanCancel
	// @ts-ignore
	const searchPinjamanCancel = data.pinjamanCancel.map((pinjaman: any) => ({
		...pinjaman,
		searchTerms: `${pinjaman.peminjam.nama} ${
			pinjaman.buku.judulBuku
		} ${pinjaman.tanggalPeminjaman.toLocaleDateString(
			'id-ID'
		)} ${pinjaman.tanggalTenggat.toLocaleDateString('id-ID')} ${pinjaman.penanggungJawab.nama}`
	}));

	const searchStoreC = createSearchStore(searchPinjamanCancel);

	const unsubscribeC = searchStoreC.subscribe((model) => searchHandler(model));

	// PinjamanBorrowed
	// @ts-ignore
	const searchPinjamanBorrowed = data.pinjamanBorrowed.map((pinjaman: any) => ({
		...pinjaman,
		searchTerms: `${pinjaman.peminjam.nama} ${pinjaman.buku.judulBuku} ${
			pinjaman.kodeBuku
		} ${pinjaman.tanggalPeminjaman.toLocaleDateString(
			'id-ID'
		)} ${pinjaman.tanggalTenggat.toLocaleDateString('id-ID')} ${pinjaman.penanggungJawab.nama}`
	}));

	const searchStoreB = createSearchStore(searchPinjamanBorrowed);

	const unsubscribeB = searchStoreB.subscribe((model) => searchHandler(model));

	// PinjamanReturned
	// @ts-ignore
	const searchPinjamanReturned = data.pinjamanReturned.map((pinjaman: any) => ({
		...pinjaman,
		searchTerms: `${pinjaman.peminjam.nama} ${
			pinjaman.buku.judulBuku
		} ${pinjaman.tanggalPeminjaman.toLocaleDateString(
			'id-ID'
		)} ${pinjaman.tanggalTenggat.toLocaleDateString('id-ID')} ${pinjaman.penanggungJawab.nama}`
	}));

	const searchStoreRe = createSearchStore(searchPinjamanReturned);

	const unsubscribeRe = searchStoreRe.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribeW();
		unsubscribeR();
		unsubscribeC();
		unsubscribeB();
		unsubscribeRe();
	});

	// Fitur Pagination
	import { writable, get } from 'svelte/store';

	let itemsPerPage = 10;

	// Store for Wait
	let currentPageW = 1;
	let itemsW = $searchStoreW.filtered;
	let totalItemsW = writable(itemsW.length);
	let totalPagesW = writable(Math.ceil(get(totalItemsW) / itemsPerPage));
	let visiblePagesW: any[] = [];

	totalItemsW.subscribe((newValue) => {
		totalPagesW.set(Math.ceil(newValue / itemsPerPage));
		updateVisiblePagesW();
	});

	function setPageW(page: any) {
		currentPageW = page;
	}

	function updateVisiblePagesW() {
		let startPage = currentPageW - 2;
		let endPage = currentPageW + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(get(totalPagesW), startPage + 4);
		}

		if (endPage > get(totalPagesW)) {
			endPage = get(totalPagesW);
			startPage = Math.max(1, endPage - 4);
		}

		visiblePagesW = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItemsW.subscribe(() => {
		updateVisiblePagesW();
	});

	// Store for Borrow
	let currentPageB = 1;
	let itemsB = $searchStoreB.filtered;
	let totalItemsB = writable(itemsB.length);
	let totalPagesB = writable(Math.ceil(get(totalItemsB) / itemsPerPage));
	let visiblePagesB: any[] = [];

	totalItemsB.subscribe((newValue) => {
		totalPagesB.set(Math.ceil(newValue / itemsPerPage));
		updateVisiblePagesB();
	});

	function setPageB(page: any) {
		currentPageB = page;
	}

	function updateVisiblePagesB() {
		let startPage = currentPageB - 2;
		let endPage = currentPageB + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(get(totalPagesB), startPage + 4);
		}

		if (endPage > get(totalPagesB)) {
			endPage = get(totalPagesB);
			startPage = Math.max(1, endPage - 4);
		}

		visiblePagesB = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItemsB.subscribe(() => {
		updateVisiblePagesB();
	});

	// Store for Cancel
	let currentPageC = 1;
	let itemsC = $searchStoreB.filtered;
	let totalItemsC = writable(itemsC.length);
	let totalPagesC = writable(Math.ceil(get(totalItemsC) / itemsPerPage));
	let visiblePagesC: any[] = [];

	totalItemsC.subscribe((newValue) => {
		totalPagesC.set(Math.ceil(newValue / itemsPerPage));
		updateVisiblePagesC();
	});

	function setPageC(page: any) {
		currentPageC = page;
	}

	function updateVisiblePagesC() {
		let startPage = currentPageC - 2;
		let endPage = currentPageC + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(get(totalPagesC), startPage + 4);
		}

		if (endPage > get(totalPagesC)) {
			endPage = get(totalPagesC);
			startPage = Math.max(1, endPage - 4);
		}

		visiblePagesC = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItemsC.subscribe(() => {
		updateVisiblePagesC();
	});

	// Store for Ready
	let currentPageR = 1;
	let itemsR = $searchStoreB.filtered;
	let totalItemsR = writable(itemsR.length);
	let totalPagesR = writable(Math.ceil(get(totalItemsR) / itemsPerPage));
	let visiblePagesR: any[] = [];

	totalItemsR.subscribe((newValue) => {
		totalPagesR.set(Math.ceil(newValue / itemsPerPage));
		updateVisiblePagesR();
	});

	function setPageR(page: any) {
		currentPageR = page;
	}

	function updateVisiblePagesR() {
		let startPage = currentPageR - 2;
		let endPage = currentPageR + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(get(totalPagesR), startPage + 4);
		}

		if (endPage > get(totalPagesR)) {
			endPage = get(totalPagesR);
			startPage = Math.max(1, endPage - 4);
		}

		visiblePagesR = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItemsR.subscribe(() => {
		updateVisiblePagesR();
	});

	// Store for Returned
	let currentPageRe = 1;
	let itemsRe = $searchStoreB.filtered;
	let totalItemsRe = writable(itemsRe.length);
	let totalPagesRe = writable(Math.ceil(get(totalItemsRe) / itemsPerPage));
	let visiblePagesRe: any[] = [];

	totalItemsRe.subscribe((newValue) => {
		totalPagesRe.set(Math.ceil(newValue / itemsPerPage));
		updateVisiblePagesRe();
	});

	function setPageRe(page: any) {
		currentPageRe = page;
	}

	function updateVisiblePagesRe() {
		let startPage = currentPageRe - 2;
		let endPage = currentPageRe + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(get(totalPagesRe), startPage + 4);
		}

		if (endPage > get(totalPagesRe)) {
			endPage = get(totalPagesRe);
			startPage = Math.max(1, endPage - 4);
		}

		visiblePagesRe = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	totalItemsRe.subscribe(() => {
		updateVisiblePagesRe();
	});

	// Row Terima
	function openRow(id: any) {
		const myRow = document.getElementById(`peringatan-peminjaman-${id}`);
		myRow.hidden = false;
	}

	function closeRow(id: any) {
		const myRow = document.getElementById(`peringatan-peminjaman-${id}`);
		myRow.hidden = true;
	}

	// Row Cancel
	function openCancel(id: any) {
		const myRow = document.getElementById(`peringatan-penolakan-${id}`);
		myRow.hidden = false;
	}

	function closeCancel(id: any) {
		const myRow = document.getElementById(`peringatan-penolakan-${id}`);
		myRow.hidden = true;
	}

	// Row Ready
	function openReady(id: any) {
		const myRow = document.getElementById(`ready-peminjaman-${id}`);
		myRow.hidden = false;
	}

	function closeReady(id: any) {
		const myRow = document.getElementById(`ready-peminjaman-${id}`);
		myRow.hidden = true;
	}

	// Row Catatan
	function openCatatan(id: any) {
		const myRow = document.getElementById(`catatan-peminjaman-${id}`);
		myRow.hidden = false;
	}

	function closeCatatan(id: any) {
		const myRow = document.getElementById(`catatan-peminjaman-${id}`);
		myRow.hidden = true;
	}

	// Row Kembali
	function openKembali(id: any) {
		const myRow = document.getElementById(`kembalikan-peminjaman-${id}`);
		myRow.hidden = false;
	}

	function closeKembali(id: any) {
		const myRow = document.getElementById(`kembalikan-peminjaman-${id}`);
		myRow.hidden = true;
	}

	// Row Selesai
	function openSelesai(id: any) {
		const myRow = document.getElementById(`selesai-peminjaman-${id}`);
		myRow.hidden = false;
	}

	function closeSelesai(id: any) {
		const myRow = document.getElementById(`selesai-peminjaman-${id}`);
		myRow.hidden = true;
	}

	// ReadyBook
	function readyBook(id: any) {
		const form = document.getElementById(`ready-book-${id}`);
		// @ts-ignore
		form.submit();
	}

	// CancelBook
	function cancelBook(id: any) {
		const form = document.getElementById(`cancel-book-${id}`);
		// @ts-ignore
		form.submit();
	}

	// Pinjamkan Book
	function pinjamkanBook(id: any) {
		const form = document.getElementById(`pinjamkan-book-${id}`);
		// @ts-ignore
		form.submit();
	}

	// Pinjamkan Book
	function kembalikanBook(id: any) {
		const form = document.getElementById(`kembalikan-book-${id}`);
		// @ts-ignore
		form.submit();
	}

	const today = new Date();
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
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
				/>
			</svg>
		</svelte:fragment>
		Acceptence
	</BreadcrumbItem>
</Breadcrumb>

<div class="flex flex-col gap-3 md:flex-row justify-between items-center mb-4">
	<div class="w-1/2">
		<p class="text-xl text-center md:text-start md:text-3xl font-semibold dark:text-white">
			Daftar Peminjaman
		</p>
	</div>
	<div class="md:w-1/4">
		<Select
			name="status"
			underline
			size="md"
			class="mt-1 text-primary-900 dark:text-primary-900 "
			placeholder="Pilih Status Pinjaman"
			bind:value={Sstatus}
		>
			<option value="wait" selected>Menunggu</option>
			<option value="ready">Siap</option>
			<option value="cancel">Ditolak</option>
			<option value="borrowed">Dipinjam</option>
			<option value="returned">Dikembalikan</option>
		</Select>
	</div>
	<div class="md:w-1/4">
		{#if Sstatus === 'wait'}
			<Search size="md" placeholder="Search..." bind:value={$searchStoreW.search} />
		{:else if Sstatus === 'ready'}
			<Search size="md" placeholder="Search..." bind:value={$searchStoreR.search} />
		{:else if Sstatus === 'cancel'}
			<Search size="md" placeholder="Search..." bind:value={$searchStoreC.search} />
		{:else if Sstatus === 'borrowed'}
			<Search size="md" placeholder="Search..." bind:value={$searchStoreB.search} />
		{:else if Sstatus === 'returned'}
			<Search size="md" placeholder="Search..." bind:value={$searchStoreRe.search} />
		{/if}
	</div>
</div>

{#if form?.successReady}
	<Alert color="green" accent dismissable class="mb-4">
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
		<span class="font-medium">Pinjaman Berhasil Diterima</span> Harap menunggu beberapa saat sampai siswa
		datang dan mengambil bukunya.
	</Alert>
{/if}

{#if form?.successKode}
	<Alert color="green" accent dismissable class="mb-4">
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
		<span class="font-medium">Buku berhasil dipinjamkan</span>
	</Alert>
{/if}

{#if form?.successCancel}
	<Alert color="green" accent dismissable class="mb-4">
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
		<span class="font-medium">Pinjaman Berhasil Ditolak</span>
	</Alert>
{/if}

{#if form?.successReturned}
	<Alert color="green" accent dismissable class="mb-4">
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
		<span class="font-medium">Pinjaman Berhasil Dikembalikan</span>
	</Alert>
{/if}

{#if form?.missingCatatan}
	<Alert color="primary" accent dismissable class="mb-4">
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
		<span class="font-medium">Catatan Wajib Diisi</span>
	</Alert>
{/if}

{#if form?.missingKode}
	<Alert color="primary" accent dismissable class="mb-4">
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
		<span class="font-medium">Kode Wajib Diisi</span>
	</Alert>
{/if}

<Table shadow divClass="relative overflow-x-auto mb-5 ">
	<TableHead>
		<TableHeadCell>Nama Peminjam</TableHeadCell>
		<TableHeadCell>Judul Buku</TableHeadCell>
		{#if Sstatus === 'borrowed'}
			<TableHeadCell>Kode Buku</TableHeadCell>
		{/if}
		<TableHeadCell>Tanggal Peminjaman</TableHeadCell>
		<TableHeadCell>Tanggal Tenggat</TableHeadCell>
		{#if Sstatus === 'returned'}
			<TableHeadCell>Tanggal Pengembalian</TableHeadCell>
		{/if}
		<TableHeadCell>Status</TableHeadCell>
		{#if userDetail.level === 'ADMIN' && (Sstatus == 'ready' || Sstatus == 'cancel')}
			<TableHeadCell>Penanggung Jawab</TableHeadCell>
		{/if}
		<TableHeadCell>Aksi</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each Sstatus === 'wait' ? $searchStoreW.filtered.slice((currentPageW - 1) * itemsPerPage, currentPageW * itemsPerPage) : Sstatus === 'ready' ? $searchStoreR.filtered : Sstatus === 'cancel' ? $searchStoreC.filtered : Sstatus === 'borrowed' ? $searchStoreB.filtered : Sstatus === 'returned' ? $searchStoreRe.filtered : '' as pinjam}
			<TableBodyRow>
				<TableBodyCell>{pinjam.peminjam.nama}</TableBodyCell>
				<TableBodyCell>{pinjam.buku.judulBuku}</TableBodyCell>
				{#if Sstatus === 'borrowed'}
					<TableBodyCell>{pinjam.kodeBuku}</TableBodyCell>
				{/if}
				<TableBodyCell
					>{pinjam.tanggalPeminjaman
						? pinjam.tanggalPeminjaman.toLocaleDateString('id-ID')
						: ''}</TableBodyCell
				>
				<TableBodyCell
					>{pinjam.tanggalPeminjaman
						? pinjam.tanggalTenggat.toLocaleDateString('id-ID')
						: ''}</TableBodyCell
				>
				{#if Sstatus === 'returned'}
					<TableBodyCell>
						{pinjam.tanggalPengembalian
							? pinjam.tanggalPengembalian.toLocaleDateString('id-ID')
							: ''}
					</TableBodyCell>
				{/if}
				<TableBodyCell>
					{#if pinjam.status === 'wait'}
						<Badge large border color="green">Menunggu</Badge>
					{:else if pinjam.status === 'ready'}
						<Badge large border color="yellow">Siap</Badge>
					{:else if pinjam.status === 'borrowed'}
						<Badge large border color="indigo">Dipinjam</Badge>
					{:else if pinjam.status === 'returned'}
						<Badge large border color="purple">Dikembalikan</Badge>
					{:else if pinjam.status === 'cancel'}
						<Badge large border color="primary">Ditolak</Badge>
					{/if}
				</TableBodyCell>
				{#if userDetail.level === 'ADMIN' && (Sstatus == 'ready' || Sstatus == 'cancel')}
					<TableBodyCell>
						{pinjam.penanggungJawab ? pinjam.penanggungJawab.nama : ''}
					</TableBodyCell>
				{/if}
				<TableBodyCell>
					{#if pinjam.status === 'wait'}
						<Button color="green" pill size="sm" on:click={() => openRow(pinjam.id)}>Terima</Button>
						<Button color="primary" pill outline size="sm" on:click={() => openCancel(pinjam.id)}
							>Tolak</Button
						>
					{:else if pinjam.status === 'ready'}
						<Button color="green" pill size="sm" on:click={() => openReady(pinjam.id)}
							>Pinjamkan</Button
						>
					{:else if pinjam.status === 'cancel'}
						<Button color="blue" pill size="sm" on:click={() => openCatatan(pinjam.id)}
							>Catatan</Button
						>
					{:else if pinjam.status === 'borrowed'}
						<Button color="green" pill size="sm" on:click={() => openKembali(pinjam.id)}
							>Dikembalikan</Button
						>
					{:else if pinjam.status === 'returned'}
						<Button color="blue" pill size="sm" on:click={() => openSelesai(pinjam.id)}
							>Catatan</Button
						>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
			{#if pinjam.status === 'wait'}
				<TableBodyRow hidden id={`peringatan-peminjaman-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="6">
						<Alert color="green" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Peminjaman</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									Apakah Anda yakin ingin menerima pengajuan peminjaman untuk buku tersebut? Harap
									diingat bahwa setelah itu, Anda harus menyiapkan buku tersebut. Buku ini dapat
									ditemukan di <span class="font-bold">{pinjam.buku.lokasi}</span>
								</div>
								<div class="flex gap-2">
									<form
										action="?/siapkanBuku&id={pinjam.id}"
										id={`ready-book-${pinjam.id}`}
										method="post"
									>
										<Button size="xs" color="green" on:click={() => readyBook(pinjam.id)}
											>Siapkan</Button
										>
									</form>
									<Button size="xs" outline color="primary" on:click={() => closeRow(pinjam.id)}
										>Batal</Button
									>
								</div>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow hidden id={`peringatan-penolakan-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="6">
						<Alert color="primary" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Penolakan</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									Apakah Anda yakin ingin menolak pengajuan peminjaman untuk buku tersebut? Harap
									diingat bahwa setelah itu, Anda harus mencatat alasan menolaknya.
								</div>
								<form
									action="?/cancelBuku&id={pinjam.id}"
									id={`cancel-book-${pinjam.id}`}
									method="post"
								>
									<Label for="catatan" class="mb-2">Catatan</Label>
									<Textarea
										id="catatan"
										placeholder="tuliskan catatan..."
										rows="4"
										name="catatan"
									/>
									<div class="mt-2 flex gap-2">
										<Button size="xs" color="green" on:click={() => cancelBook(pinjam.id)}
											>Kirim</Button
										>
										<Button
											size="xs"
											outline
											color="primary"
											class="dark:text-red-700"
											on:click={() => closeCancel(pinjam.id)}>Batal</Button
										>
									</div>
								</form>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if pinjam.status === 'cancel'}
				<TableBodyRow hidden id={`catatan-peminjaman-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="7">
						<Alert color="blue" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Peminjaman</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									<span class="font-bold">Catatan</span>
									<p>{pinjam.catatan}</p>
								</div>
								<Button size="xs" color="green" on:click={() => closeCatatan(pinjam.id)}
									>Close</Button
								>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow hidden id={`peringatan-penolakan-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="6">
						<Alert color="primary" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Penolakan</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									Apakah Anda yakin ingin menolak pengajuan peminjaman untuk buku tersebut? Harap
									diingat bahwa setelah itu, Anda harus mencatat alasan menolaknya.
								</div>
								<form
									action="?/cancelBuku&id={pinjam.id}"
									id={`cancel-book-${pinjam.id}`}
									method="post"
								>
									<Label for="catatan" class="mb-2">Catatan</Label>
									<Textarea
										id="catatan"
										placeholder="tuliskan catatan..."
										rows="4"
										name="catatan"
									/>
									<div class="mt-2 flex gap-2">
										<Button size="xs" color="green" on:click={() => cancelBook(pinjam.id)}
											>Kirim</Button
										>
										<Button
											size="xs"
											outline
											color="primary"
											class="dark:text-red-700"
											on:click={() => closeCancel(pinjam.id)}>Batal</Button
										>
									</div>
								</form>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if pinjam.status === 'returned'}
				<TableBodyRow hidden id={`selesai-peminjaman-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="8">
						<Alert color="blue" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Peminjaman</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									<span class="font-bold">Petugas Yang Menerima Pengembalian Buku:</span>
									<p>{pinjam.penanggungJawab.nama}</p>
									<span class="font-bold">Catatan</span>
									<p>{pinjam.catatan}</p>
								</div>
								<Button size="xs" color="green" on:click={() => closeSelesai(pinjam.id)}
									>Close</Button
								>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow hidden id={`peringatan-penolakan-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="6">
						<Alert color="primary" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Penolakan</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									Apakah Anda yakin ingin menolak pengajuan peminjaman untuk buku tersebut? Harap
									diingat bahwa setelah itu, Anda harus mencatat alasan menolaknya.
								</div>
								<form
									action="?/cancelBuku&id={pinjam.id}"
									id={`cancel-book-${pinjam.id}`}
									method="post"
								>
									<Label for="catatan" class="mb-2">Catatan</Label>
									<Textarea
										id="catatan"
										placeholder="tuliskan catatan..."
										rows="4"
										name="catatan"
									/>
									<div class="mt-2 flex gap-2">
										<Button size="xs" color="green" on:click={() => cancelBook(pinjam.id)}
											>Kirim</Button
										>
										<Button
											size="xs"
											outline
											color="primary"
											class="dark:text-red-700"
											on:click={() => closeCancel(pinjam.id)}>Batal</Button
										>
									</div>
								</form>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if pinjam.status === 'ready'}
				<TableBodyRow hidden id={`ready-peminjaman-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="7">
						<Alert color="green" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Peminjaman</span>
							<div>
								<div class="mt-2 mb-4 text-sm">Harap isi kode buku yang akan dipinjamkan</div>
								<form
									action="?/pinjamkanBuku&id={pinjam.id}"
									id={`pinjamkan-book-${pinjam.id}`}
									method="post"
								>
									<Input
										type="text"
										id="kodeBuku"
										placeholder="tuliskan kode buku..."
										required
										name="kodeBuku"
									/>
									<div class="mt-3 flex gap-2">
										<Button size="xs" color="green" on:click={() => pinjamkanBook(pinjam.id)}
											>Kirim</Button
										>

										<Button
											size="xs"
											outline
											color="primary"
											class="dark:text-red-700"
											on:click={() => closeReady(pinjam.id)}>Batal</Button
										>
									</div>
								</form>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if pinjam.status === 'borrowed'}
				<TableBodyRow hidden id={`kembalikan-peminjaman-${pinjam.id}`}>
					<TableBodyCell tdClass="px-6 py-4 font-medium" colspan="8">
						{#if Math.ceil((pinjam.tanggalTenggat.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 0}
							<Alert color="primary" accent class="w-4/5 mx-auto mb-3">
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
								<span class="font-medium">Buku</span> telah mencapai tenggat pengembalian Sudah
								<span class="font-medium"
									>{Math.ceil(
										(pinjam.tanggalTenggat.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
									)}</span
								> hari sejak tanggal tenggat
							</Alert>
						{/if}
						<Alert color="green" accent class="w-4/5 mx-auto">
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
							<span class="text-lg font-medium">Informasi Peminjaman</span>
							<div>
								<div class="mt-2 mb-4 text-sm">
									Mohon diperhatikan, sebagai admin perpustakaan, pastikan selalu untuk memeriksa
									setiap buku yang dikembalikan oleh siswa dengan seksama. Jika terdapat pelanggaran
									aturan, segera tindak lanjuti dan centanglah checkbox <span class="font-bold">
										Bermasalah
									</span>
									serta catatlah masalahnya. <br /><br />
									<span class="font-bold">Petugas yang meminjamkan buku: </span>
									{pinjam.penanggungJawab ? pinjam.penanggungJawab.nama : ''}
								</div>

								<form
									action="?/kembalikanBuku&id={pinjam.id}"
									id={`kembalikan-book-${pinjam.id}`}
									method="post"
								>
									<input
										type="checkbox"
										id="masalah"
										name="masalah"
										value="masalah"
										checked={Math.ceil(
											(pinjam.tanggalTenggat.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
										) < 0
											? true
											: false}
									/>
									<label for="masalah"> Bermasalah</label>
									<Label for="catatan" class="mb-2">Catatan</Label>
									<Textarea
										id="catatan"
										placeholder="tuliskan catatan..."
										rows="4"
										name="catatan"
									/>
									<div class="mt-2 flex gap-2">
										<Button size="xs" color="green" on:click={() => kembalikanBook(pinjam.id)}
											>Kirim</Button
										>
										<Button
											size="xs"
											outline
											color="primary"
											class="dark:text-red-700"
											on:click={() => closeKembali(pinjam.id)}>Batal</Button
										>
									</div>
								</form>
							</div>
						</Alert>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>

<div class="flex justify-center my-5">
	<ButtonGroup>
		{#if Sstatus === 'wait'}
			<Button on:click={() => setPageW(currentPageW - 1)} disabled={currentPageW === 1}>
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
			{#each visiblePagesW as page}
				{#if currentPageW === page}
					<Button on:click={() => setPageW(page)} color="primary">{page}</Button>
				{:else}
					<Button on:click={() => setPageW(page)}>{page}</Button>
				{/if}
			{/each}
			<Button
				on:click={() => setPageW(currentPageW + 1)}
				disabled={currentPageW === Math.ceil($totalItemsW / itemsPerPage)}
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
		{:else if Sstatus === 'borrowed'}
			<Button on:click={() => setPageB(currentPageB - 1)} disabled={currentPageB === 1}>
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
			{#each visiblePagesB as page}
				{#if currentPageB === page}
					<Button on:click={() => setPageB(page)} color="primary">{page}</Button>
				{:else}
					<Button on:click={() => setPageB(page)}>{page}</Button>
				{/if}
			{/each}
			<Button
				on:click={() => setPageB(currentPageB + 1)}
				disabled={currentPageB === Math.ceil($totalItemsB / itemsPerPage)}
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
		{:else if Sstatus === 'cancel'}
			<Button on:click={() => setPageC(currentPageC - 1)} disabled={currentPageC === 1}>
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
			{#each visiblePagesC as page}
				{#if currentPageC === page}
					<Button on:click={() => setPageC(page)} color="primary">{page}</Button>
				{:else}
					<Button on:click={() => setPageC(page)}>{page}</Button>
				{/if}
			{/each}
			<Button
				on:click={() => setPageC(currentPageC + 1)}
				disabled={currentPageC === Math.ceil($totalItemsC / itemsPerPage)}
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
		{:else if Sstatus === 'ready'}
			<Button on:click={() => setPageR(currentPageR - 1)} disabled={currentPageR === 1}>
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
			{#each visiblePagesR as page}
				{#if currentPageR === page}
					<Button on:click={() => setPageR(page)} color="primary">{page}</Button>
				{:else}
					<Button on:click={() => setPageR(page)}>{page}</Button>
				{/if}
			{/each}
			<Button
				on:click={() => setPageR(currentPageR + 1)}
				disabled={currentPageR === Math.ceil($totalItemsR / itemsPerPage)}
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
		{:else if Sstatus === 'returned'}
			<Button on:click={() => setPageRe(currentPageRe - 1)} disabled={currentPageRe === 1}>
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
			{#each visiblePagesRe as page}
				{#if currentPageRe === page}
					<Button on:click={() => setPageRe(page)} color="primary">{page}</Button>
				{:else}
					<Button on:click={() => setPageRe(page)}>{page}</Button>
				{/if}
			{/each}
			<Button
				on:click={() => setPageRe(currentPageRe + 1)}
				disabled={currentPageRe === Math.ceil($totalItemsRe / itemsPerPage)}
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
		{/if}
	</ButtonGroup>
</div>
