<script lang="ts">
	import myImage from '../../lib/img/notImage.png';
	import {
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Avatar,
		MenuButton,
		Dropdown,
		DropdownItem,
		Modal,
		Button,
		Input,
		Label,
		Alert,
		Select,
		Accordion,
		AccordionItem
	} from 'flowbite-svelte';

	import type { PageData, ActionData } from './$types.js';
	export let data: PageData;
	export let form: ActionData;
	let formModal = false;

	//@ts-ignore
	$: ({ userDetail, pinjamanWait, pinjamanReady, pinjamanBorrowed, pinjamanReturned } = data);

	//@ts-ignore
	if (form?.incorrect) {
		formModal = true;
	}

	const today = new Date();

	let Sstatus: any;
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
					d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
				/>
			</svg>
		</svelte:fragment>
		Profile
	</BreadcrumbItem>
	<BreadcrumbItem>{userDetail?.nama}</BreadcrumbItem>
</Breadcrumb>

{#if userDetail?.level === 'ADMIN' || userDetail?.level === 'PETUGAS'}
	<Card class="mx-auto">
		<div class="flex justify-end">
			<MenuButton />
			<Dropdown class="w-36">
				<DropdownItem href="/users/edit/{userDetail?.id}">Ubah Profile</DropdownItem>
				<DropdownItem on:click={() => (formModal = true)}>Ubah Password</DropdownItem>
			</Dropdown>
		</div>
		<div class="flex flex-col items-center pb-4">
			{#if !userDetail.foto}
				<Avatar size="xl" src={myImage} />
			{:else}
				<Avatar size="xl" src={userDetail.foto} />
			{/if}
			<h5 class="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">
				{userDetail.nama}
			</h5>
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
				<!-- {#if userDetail.level === 'ANGGOTA'}
					<p class="text-md font-medium text-gray-900 dark:text-white">NIS</p>
					<p class="text-md text-gray-500 dark:text-gray-400">
						<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
						{userDetail.nis}
					</p>
					<p class="text-md font-medium text-gray-900 dark:text-white">Kelas</p>
					{#if !userDetail.kelas}
						<p class="text-md text-gray-500 dark:text-gray-400">
							<span class="text-md font-medium text-gray-900 dark:text-white">:</span> Belum di Update
						</p>
					{:else}
						<p class="text-md text-gray-500 dark:text-gray-400">
							<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
							{userDetail.kelas}
						</p>
					{/if}
					<p class="text-md font-medium text-gray-900 dark:text-white">Jurusan</p>
					{#if !userDetail.jurusan}
						<p class="text-md text-gray-500 dark:text-gray-400">
							<span class="text-md font-medium text-gray-900 dark:text-white">:</span> Belum di Update
						</p>
					{:else}
						<p class="text-md text-gray-500 dark:text-gray-400">
							<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
							{userDetail?.jurusan}
						</p>
					{/if}
				{:else if userDetail.level === 'PETUGAS'}
					<p class="text-md font-medium text-gray-900 dark:text-white">NP</p>
					<p class="text-md text-gray-500 dark:text-gray-400">
						<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
						{userDetail.np ? userDetail.np : 'Belum update'}
					</p>
				{/if} -->
			</div>
		</div>
	</Card>
{:else}
	<div class="flex flex-col md:flex-row">
		<div class="md:w-1/3 md:pr-8">
			<!-- Section 1 -->
			<div class="sticky top-24 flex justify-center md:flex-none">
				<Card class="mx-auto">
					<div class="flex justify-end">
						<MenuButton />
						<Dropdown class="w-36">
							<DropdownItem href="/users/edit/{userDetail?.id}">Ubah Profile</DropdownItem>
							<DropdownItem on:click={() => (formModal = true)}>Ubah Password</DropdownItem>
						</Dropdown>
					</div>
					<div class="flex flex-col items-center pb-4">
						{#if !userDetail?.foto}
							<Avatar size="xl" src={myImage} />
						{:else}
							<Avatar size="xl" src={userDetail?.foto} />
						{/if}
						<h5 class="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">
							{userDetail?.nama}
						</h5>
						<span class="text-lg text-gray-500 dark:text-gray-400">{userDetail?.username}</span>
						<div class="mt-2 grid grid-cols-2 gap-2">
							<p class="text-md font-medium text-gray-900 dark:text-white">Nomor Telepon/WA</p>
							{#if !userDetail?.wa}
								<p class="text-md text-gray-500 dark:text-gray-400">
									<span class="text-md font-medium text-gray-900 dark:text-white">:</span> Belum Update
								</p>
							{:else}
								<p class="text-md text-gray-500 dark:text-gray-400">
									<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
									{userDetail?.wa}
								</p>
							{/if}
							<p class="text-md font-medium text-gray-900 dark:text-white">Level</p>
							<p class="text-md text-gray-500 dark:text-gray-400">
								<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
								{userDetail?.level}
							</p>
							{#if userDetail?.level === 'ANGGOTA'}
								<p class="text-md font-medium text-gray-900 dark:text-white">Nomor Anggota</p>
								<p class="text-md text-gray-500 dark:text-gray-400">
									<span class="text-md font-medium text-gray-900 dark:text-white">:</span>
									{userDetail.na ? userDetail.na : 'Belum update'}
								</p>
							{/if}
						</div>
					</div>
				</Card>
			</div>
		</div>
		<div class="md:w-2/3">
			<!-- Section 2 -->
			<div class="md:pl-8 mb-5">
				<div class="flex justify-between items-center mb-5 mt-5 md:mt-0">
					<h1 class="text-2xl font-bold dark:text-white">List Buku Pinjaman</h1>
					<div class="w-1/3">
						<Select
							name="status"
							underline
							size="md"
							class="mt-1 text-primary-800 dark:text-primary-800 "
							placeholder="Pilih Status Pinjaman"
							bind:value={Sstatus}
						>
							<option value="wait" selected>Menunggu</option>
							<option value="ready">Siap</option>
							<option value="borrowed">Dipinjam</option>
							<option value="returned">Dikembalikan</option>
						</Select>
					</div>
				</div>
				<Accordion
					activeClasses="bg-primary-100 dark:bg-gray-800 text-primary-600 dark:text-white focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
					inactiveClasses="text-gray-500 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-gray-800"
				>
					{#if Sstatus}
						{#each Sstatus === 'wait' ? pinjamanWait : Sstatus === 'ready' ? pinjamanReady : Sstatus === 'borrowed' ? pinjamanBorrowed : Sstatus === 'returned' ? pinjamanReturned : '' as pinjam}
							<AccordionItem>
								<span slot="header">{pinjam.buku.judulBuku}</span>
								<p class="mb-2 text-gray-500 dark:text-gray-100">
									<span class="font-medium"
										>Tanggal Peminjaman:
									</span>{pinjam.tanggalPeminjaman.toLocaleDateString('id-ID')}
								</p>
								<p class="mb-2 text-gray-500 dark:text-gray-100">
									<span class="font-medium"
										>Tanggal Tenggat Pengembalian:
									</span>{pinjam.tanggalTenggat.toLocaleDateString('id-ID')}
								</p>
								<p class="mb-2 text-gray-500 dark:text-gray-100">
									{#if pinjam.status === 'wait'}
										<span class="font-medium">Status Peminjaman: </span>Menunggu Konfirmasi dari
										Perpustakaan
									{:else if pinjam.status === 'ready'}
										<span class="font-medium">Status Peminjaman: </span>{pinjam.status}
									{:else if pinjam.status === 'borrowed'}
										<span class="font-medium">Status Peminjaman: </span>{pinjam.status}
									{:else if pinjam.status === 'returned'}
										<span class="font-medium">Status Peminjaman: </span>{pinjam.status}
									{/if}
								</p>
								<p class="mb-2 text-gray-500 dark:text-gray-100">
									<span class="font-medium">Detail Buku: </span><a
										href="/books/{pinjam.buku.id}"
										class="text-blue-600 dark:text-blue-500 hover:underline">Lihat</a
									>
								</p>
								{#if Math.ceil((pinjam.tanggalTenggat.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 0}
									<Alert color="primary" accent>
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
										<span class="font-medium">Buku</span> telah mencapai tenggat pengembalian
									</Alert>
								{/if}
							</AccordionItem>
						{/each}
					{/if}
				</Accordion>
			</div>
		</div>
	</div>
{/if}

<!-- Modal Ubah Password -->
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/updatePassword" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Ubah Password</h3>
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
		<Input type="text" value={userDetail?.username} name="username" style="display: none" />
		<Label class="space-y-2">
			<span>Password Baru</span>
			<Input type="password" name="password" placeholder="•••••" requiprimary />
		</Label>
		<Label class="space-y-2">
			<span>konfirmasi password</span>
			<Input type="password" name="Kpassword" placeholder="•••••" requiprimary />
		</Label>
		<Button type="submit" class="w-full1" color="primary">Perbarui</Button>
	</form>
</Modal>
