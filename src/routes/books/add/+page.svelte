<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Label,
		Input,
		Helper,
		Fileupload,
		Alert,
		Select,
		Textarea
	} from 'flowbite-svelte';

	let files: any;
	let avatar: any;
	let kategori: any;
	let skategori: any;

	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target?.result ?? '';
		};
	};

	import type { ActionData, PageData } from './$types.d.ts';
	import { onMount } from 'svelte';
	export let form: ActionData;
	export let data: PageData;

	// @ts-ignore
	$: ({ categories } = data);

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
	<BreadcrumbItem>Tambah Buku</BreadcrumbItem>
</Breadcrumb>

<p class="text-xl md:text-3xl font-semibold dark:text-white mb-4">Tambah Buku</p>

<form action="" method="post">
	<div
		class="container mx-auto w-full bg-primary-200 dark:bg-primary-900 p-5 rounded-3xl grid grid-cols-2 gap-4 mb-8"
	>
		<div class="col-span-2">
			{#if form?.success}
				<Alert color="green" dismissable accent>
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
					<span class="font-medium">Buku</span> Berhasil Ditambahkan,
					<a href="/" class="underline">Lihat buku</a>
				</Alert>
			{/if}

			{#if files}
				{#if Number(files[0].size) / 1024 > 300}
					<Alert color="primary" dismissable accent>
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
						Ukuran <span class="font-medium">Foto</span> Melebihi Ketentuan
					</Alert>
				{/if}
			{/if}

			{#if form?.missingJudulBuku}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Judul Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingPenerbit}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Penerbit Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingPenulis}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Penulis Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingStok}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Stok Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingTahun}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Tahun Terbit Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingIsbn}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">ISBN</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingjumlahHalaman}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Jumlah Halaman</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingLokasi}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Lokasi/Rak Buku</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingIdKategori}
				<Alert color="primary" dismissable accent>
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
					<span class="font-medium">Kategori</span> wajib Dipilih
				</Alert>
			{/if}
		</div>

		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="judulBuku" class="block mb-2 text-primary-900 dark:text-primary-50">Judul</Label>
			<Input
				id="judulBuku"
				name="judulBuku"
				value={form?.judulBuku}
				placeholder="Masukkan Judul Buku"
			/>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label class="pb-2 text-primary-900 dark:text-primary-50">Upload Gambar Cover</Label>
			{#if avatar}
				<img src={avatar} alt="" class="mb-2" width="120" />
			{/if}
			<Fileupload
				name="image"
				accept="image/jpeg, image/png"
				bind:files
				on:change={(e) => onFileSelected(e)}
				type="file"
			/>
			<Input type="text" name="gambar" value={avatar} style="display: none" readonly />
			<Helper class="text-sm mt-2 text-primary-900 dark:text-primary-50"
				>Tidak Wajib Diisi, Max 300kb*</Helper
			>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="penulis" class="block mb-2 text-primary-900 dark:text-primary-50">Penulis</Label>
			<Input
				id="penulis"
				type="text"
				name="penulis"
				value={form?.penulis}
				placeholder="Masukkan Penulis Buku"
			/>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="penerbit" class="block mb-2 text-primary-900 dark:text-primary-50">Penerbit</Label
			>
			<Input
				id="penerbit"
				type="text"
				name="penerbit"
				value={form?.penerbit}
				placeholder="Masukkan Penerbit Buku"
			/>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="tahunTerbit" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Tahun Terbit</Label
			>
			<Input type="date" id="tahunTerbit" name="tahunTerbit" value={form?.tahunTerbit} />
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="isbn" class="block mb-2 text-primary-900 dark:text-primary-50">ISBN</Label>
			<Input
				type="number"
				id="isbn"
				name="isbn"
				value={form?.isbn}
				pattern="\d{4}-\d{4}-\d{4}-\d{4}"
			/>
			<Helper class="text-sm mt-2 text-primary-900 dark:text-primary-50"
				>isbn dengan 13 digit angka* contoh : 978-602-8519-93-9.</Helper
			>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label defaultClass="font-medium text-sm text-primary-900 dark:text-primary-50"
				>Pilih Kategori
				<Select
					name="idKategori"
					class="mt-1 text-primary-900 dark:text-primary-50"
					bind:value={skategori}
					placeholder="PIlih Kategori Buku"
				>
					{#if form?.idKategori}
						{#if kategori}
							{#each kategori as { value, name }}
								{#if value === form?.idKategori}
									<option selected {value} hidden>{name}</option>
								{/if}
							{/each}
						{/if}
					{/if}

					{#if kategori}
						{#each kategori as { value, name }}
							<option {value}>{name}</option>
						{/each}
					{/if}
				</Select>
			</Label>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="jumlahHalaman" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Jumlah Halaman</Label
			>
			<Input
				id="jumlahHalaman"
				type="number"
				name="jumlahHalaman"
				value={form?.jumlahHalaman}
				placeholder="Masukkan Jumlah Halaman Buku"
			/>
		</div>
		<div class="mb-3 col-span-2">
			<Label for="sinopsis" class="block mb-2 text-primary-900 dark:text-primary-50">Sinopsis</Label
			>
			<input
				id="sinopsis"
				value={form?.sinopsis ? form.sinopsis : ''}
				type="hidden"
				name="sinopsis"
			/>
			<trix-editor input="sinopsis" class="bg-white rounded-lg dark:bg-gray-700 dark:text-white" />
			<Helper class="text-sm mt-1 text-primary-900 dark:text-primary-50">Tidak Wajib Diisi*</Helper>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="stok" class="block mb-2 text-primary-900 dark:text-primary-50">Stok</Label>
			<Input
				id="stok"
				type="number"
				name="stok"
				value={form?.stok}
				placeholder="Masukkan Stok Buku"
			/>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="lokasi" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Lokasi/Rak Buku</Label
			>
			<Input id="lokasi" name="lokasi" placeholder="Masukkan Judul Buku" value={form?.lokasi} />
		</div>
		<div class="w-full col-span-2">
			<Button outline pill={true} color="primary" style="width: 100%;" type="submit">TAMBAH</Button>
		</div>
	</div>
</form>
