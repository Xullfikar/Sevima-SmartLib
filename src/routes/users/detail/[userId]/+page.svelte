<script lang="ts">
	import myImage from '$lib/img/notImage.png';
	import {
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Avatar,
		MenuButton,
		Dropdown,
		DropdownItem,
		Modal,
		Label,
		Input,
		Button
	} from 'flowbite-svelte';

	import type { PageData } from './$types.js';
	export let data: PageData;

	//@ts-ignore
	$: ({ userDetail } = data);

	let form: HTMLFormElement;
	let formModal = false;

	// konfirmasi delete
	function deleteUser(nama: string) {
		const confirmed = confirm(`Apakah Anda yakin ingin menghapus pengguna ${nama}?`);
		if (confirmed) {
			// @ts-ignore
			form.submit();
		}
	}
</script>

<Breadcrumb class="mb-4 mt-4">
	<BreadcrumbItem home href="/users">
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
	<BreadcrumbItem>Detail Pengguna</BreadcrumbItem>
	<BreadcrumbItem>{userDetail.nama}</BreadcrumbItem>
</Breadcrumb>

<p class="text-xl text-center md:text-start md:text-3xl font-semibold dark:text-white">
	Detail Pengguna
</p>

<Card class="mx-auto my-5">
	<div class="flex justify-end">
		<MenuButton />
		<Dropdown class="w-36">
			<DropdownItem href="/users/edit/{userDetail.id}">Ubah Profile</DropdownItem>
			<DropdownItem on:click={() => (formModal = true)}>Ubah Password</DropdownItem>
			<form bind:this={form} action="?/deleteUser&id={userDetail.id}" method="POST">
				<DropdownItem on:click={() => deleteUser(userDetail.nama)}>Hapus</DropdownItem>
			</form>
		</Dropdown>
	</div>
	<div class="flex flex-col items-center pb-4">
		{#if !userDetail.foto}
			<Avatar size="xl" src={myImage} />
		{:else}
			<Avatar size="xl" src={userDetail.foto} />
		{/if}
		<h5 class="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">{userDetail.nama}</h5>
		<span class="text-lg text-gray-500 dark:text-gray-400">{userDetail.username}</span>
		<div class="mt-2 grid grid-cols-2 gap-2">
			<p class="text-md font-medium text-gray-900 dark:text-white">Nomor Telepon/WA</p>
			{#if !userDetail.wa}
				<p class="text-md text-gray-500 dark:text-gray-400">
					<span class="text-md font-medium text-gray-900 dark:text-white">:</span> Belum di Update
				</p>
			{:else}
				<p class="text-md text-gray-500 dark:text-gray-400">
					<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
					{userDetail.wa}
				</p>
			{/if}
			<p class="text-md font-medium text-gray-900 dark:text-white">Level</p>
			<p class="text-md text-gray-500 dark:text-gray-400">
				<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
				{userDetail.level}
			</p>
			{#if userDetail.level === 'ANGGOTA'}
				<p class="text-md font-medium text-gray-900 dark:text-white">Nomor Anggota</p>
				<p class="text-md text-gray-500 dark:text-gray-400">
					<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
					{userDetail.na}
				</p>
			{:else if userDetail.level === 'PETUGAS'}
				<p class="text-md font-medium text-gray-900 dark:text-white">NP</p>
			{/if}
		</div>
	</div>
</Card>

<!-- Modal Ubah Password -->
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/updatePassword" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Ubah Password</h3>
		<Input
			type="text"
			value={userDetail.username}
			name="username"
			placeholder="•••••"
			style="display: none"
		/>
		<Label class="space-y-2">
			<span>Password Baru</span>
			<Input type="password" name="password" placeholder="•••••" required />
		</Label>
		<Label class="space-y-2">
			<span>konfirmasi password</span>
			<Input type="password" name="Kpassword" placeholder="•••••" required />
		</Label>
		<Button type="submit" class="w-full1" color="primary">Perbarui</Button>
	</form>
</Modal>
