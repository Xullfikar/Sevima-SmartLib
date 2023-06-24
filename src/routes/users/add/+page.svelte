<script lang="ts">
	import {
		Fileupload,
		BreadcrumbItem,
		Helper,
		Select,
		Button,
		InputAddon,
		ButtonGroup,
		Input,
		Label,
		Alert,
		Breadcrumb,
		Avatar
	} from 'flowbite-svelte';
	import myImage from '$lib/img/notImage.png';
	let slevel: string;
	// let skelas: any;
	// let sjurusan: any;
	let files: any;
	let avatar: any;
	// let selected: any;

	let level = [
		{ value: 'ADMIN', name: 'ADMIN' },
		{ value: 'PETUGAS', name: 'PETUGAS' },
		{ value: 'ANGGOTA', name: 'ANGGOTA' }
	];

	import type { ActionData } from './$types.d.ts';
	export let form: ActionData;

	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		// let imageGenerated = true;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target?.result ?? '';
		};
	};
</script>

<Breadcrumb class="mb-4 mt-4">
	<BreadcrumbItem href="/users" home>
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
				/>
			</svg>
		</svelte:fragment>
		Users
	</BreadcrumbItem>
	<BreadcrumbItem>Tambah Pengguna</BreadcrumbItem>
</Breadcrumb>

<p class="text-xl md:text-3xl font-semibold dark:text-white mb-4">Tambah Pengguna</p>

<form action="" method="post">
	<div
		class="container mx-auto w-full bg-primary-200 dark:bg-primary-900 p-5 rounded-3xl grid grid-cols-2 gap-4 mb-8"
	>
		<div class="col-span-2">
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

			{#if form?.missingNama}
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
					<span class="font-medium">Nama</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.missingUsername}
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
					<span class="font-medium">Username</span> wajib Diisi
				</Alert>
			{/if}

			{#if form?.usernameReady}
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
					<span class="font-medium">Username</span> sudah digunakan
				</Alert>
			{/if}

			{#if form?.incorrect}
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
					<span class="font-medium">Password</span> tidak sesuai
				</Alert>
			{/if}

			{#if form?.missingNp}
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
					<span class="font-medium">Petugas</span> wajib mengisi
					<span class="font-medium">Nomor Pegawai</span>
				</Alert>
			{/if}

			{#if form?.missingNa}
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
					<span class="font-medium">Anggota</span> wajib mengisi
					<span class="font-medium">Nomor Anggota</span>
				</Alert>
			{/if}

			{#if form?.missingLevel}
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
					<span class="font-medium">Role</span> wajib diisi
				</Alert>
			{/if}
		</div>

		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="nama" class="block mb-2 text-primary-900 dark:text-primary-50">Nama</Label>
			<Input id="nama" name="nama" value={form?.nama} placeholder="Masukkan Nama Lengkap" />
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="telepon/wa" class="block mb-2 text-primary-900 dark:text-primary-50"
				>No. Telepon / WA</Label
			>
			<Input
				id="telepon/wa"
				type="number"
				value={form?.wa}
				name="wa"
				placeholder="Masukkan Nomor Whatsapp"
			/>
			<Helper class="text-sm mt-2 text-primary-900 dark:text-primary-50">Tidak Wajib Diisi*</Helper>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label class="pb-2 text-primary-900 dark:text-primary-50">Upload Foto</Label>
			<Avatar size="lg" src={myImage} class="mb-2" />
			<Fileupload
				name="image"
				accept="image/png, image/jpeg"
				bind:files
				on:change={(e) => onFileSelected(e)}
				type="file"
			/>
			<Input type="text" name="foto" style="display: none" readonly />
			<Helper class="text-sm mt-2 text-primary-900 dark:text-primary-50"
				>Tidak Wajib Diisi, Max 300kb*</Helper
			>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label defaultClass="text-w-semibold text-primary-900 dark:text-primary-50"
				>Pilih Role
				<Select
					name="level"
					class="mt-1 text-primary-900 dark:text-primary-50"
					bind:value={slevel}
					placeholder="PIlih Role"
				>
					{#if form?.level}
						<option selected value={form?.level}>{form?.level}</option>
					{/if}

					{#each level as { value, name }}
						<option {value}>{name}</option>
					{/each}
				</Select>
			</Label>
		</div>
		<div class="col-span-2 mb-3">
			<Label for="website-admin" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Username</Label
			>
			<ButtonGroup class="w-full">
				<InputAddon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						class="w-6 h-6 primary-100"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
				</InputAddon>
				<Input
					id="website-admin"
					type="text"
					name="username"
					value={form?.username}
					placeholder="username"
				/>
			</ButtonGroup>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="website-admin" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Password</Label
			>
			<ButtonGroup class="w-full">
				<InputAddon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
						/>
					</svg>
				</InputAddon>
				<Input
					id="website-admin"
					type="password"
					name="password"
					value={form?.password}
					placeholder="password"
				/>
			</ButtonGroup>
		</div>
		<div class="mb-3 col-span-2 md:col-span-1">
			<Label for="website-admin" class="block mb-2 text-primary-900 dark:text-primary-50"
				>Konfirmasi Password</Label
			>
			<ButtonGroup class="w-full">
				<InputAddon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
						/>
					</svg>
				</InputAddon>
				<Input
					id="website-admin"
					type="password"
					name="kpassword"
					value={form?.kpassword}
					placeholder="password"
				/>
			</ButtonGroup>
		</div>
		{#if slevel === 'PETUGAS'}
			<div class="col-span-2 mb-3">
				<Label for="np" class="block mb-2 text-primary-900 dark:text-primary-50"
					>Nomor Pegawai</Label
				>
				<Input id="np" name="np" value={form?.np} placeholder="Masukkan Nomor Pegawai" />
			</div>
		{:else if slevel === 'ANGGOTA'}
			<div class="col-span-2 mb-3">
				<Label for="na" class="block mb-2 text-primary-900 dark:text-primary-50"
					>Nomor Anggota</Label
				>
				<Input id="na" name="na" value={form?.na} placeholder="Masukkan Nomor Anggota" />
			</div>
		{:else}
			<div class="w-full col-span-2">
				<Alert border color="primary">
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
					<span class="font-medium">Pilih Role</span> terlebih dahulu untuk mengisi formulir selanjutnya.
				</Alert>
			</div>
		{/if}
		<div class="w-full col-span-2">
			<Button outline pill={true} color="primary" style="width: 100%;" type="submit">TAMBAH</Button>
		</div>
	</div>
</form>
