<script lang="ts">
	import {
		Button,
		InputAddon,
		ButtonGroup,
		Input,
		Label,
		Helper,
		DarkMode,
		Toast
	} from 'flowbite-svelte';

	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 absolute right-5 top-5';

	import type { ActionData } from './$types.d.ts';
	export let form: ActionData;
</script>

<DarkMode btnClass={darkmodebtn} />

<form action="" method="post">
	<div class="flex items-center h-screen px-5">
		<div class="mx-auto w-full sm:w-96 bg-primary-200 dark:bg-primary-300 p-5 rounded-3xl">
			<div class="mb-6">
				<p class="text-3xl font-bold text-primary-800 dark:text-primary-800 text-center">
					SmartLib
				</p>
			</div>
			<div class="-mt-4 mb-2">
				{#if form?.missingNama}
					<Toast
						color="red"
						divClass="w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3"
					>
						<svelte:fragment slot="icon">
							<svg
								aria-hidden="true"
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
							<span class="sr-only">Error icon</span>
						</svelte:fragment>
						<span class="font-medium">Nama</span> wajib Diisi
					</Toast>
				{/if}
				{#if form?.missingUsername}
					<Toast
						color="red"
						divClass="w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3"
					>
						<svelte:fragment slot="icon">
							<svg
								aria-hidden="true"
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
							<span class="sr-only">Error icon</span>
						</svelte:fragment>
						<span class="font-medium">Username</span> wajib Diisi
					</Toast>
				{/if}
				{#if form?.usernameReady}
					<Toast
						color="red"
						divClass="w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3"
					>
						<svelte:fragment slot="icon">
							<svg
								aria-hidden="true"
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
							<span class="sr-only">Error icon</span>
						</svelte:fragment>
						<span class="font-medium">Username</span> telah digunakan
					</Toast>
				{/if}
				{#if form?.incorrect}
					<Toast
						color="red"
						divClass="w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3"
					>
						<svelte:fragment slot="icon">
							<svg
								aria-hidden="true"
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
							<span class="sr-only">Error icon</span>
						</svelte:fragment>
						<span class="font-medium">Password</span> tidak sesuai
					</Toast>
				{/if}
			</div>
			<div class="mb-3">
				<Label for="nama" class="block mb-2 text-primary-800 dark:text-primary-800">Nama</Label>
				<Input id="nama" name="nama" placeholder="Masukkan Nama Lengkap" />
			</div>
			<div class="mb-3">
				<Label for="website-admin" class="block mb-2 text-primary-800 dark:text-primary-800"
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
					<Input id="website-admin" type="text" name="username" placeholder="username" />
				</ButtonGroup>
			</div>
			<div class="mb-3">
				<Label for="website-admin" class="block mb-2 text-primary-800 dark:text-primary-800"
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
					<Input id="website-admin" type="password" name="password" placeholder="password" />
				</ButtonGroup>
			</div>
			<div class="mb-6">
				<Label for="website-admin" class="block mb-2 text-primary-800 dark:text-primary-800"
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
					<Input id="website-admin" type="password" name="kpassword" placeholder="password" />
				</ButtonGroup>
				<Helper class="text-sm mt-2 text-primary-800 dark:text-primary-800"
					>Sudah punya akun ? <a
						href="/login"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Masuk</a
					></Helper
				>
			</div>
			<div class="w-full">
				<Button outline pill={true} color="primary" style="width: 100%;" type="submit"
					>DAFTAR</Button
				>
			</div>
		</div>
	</div>
</form>
