<script lang="ts">
	import '../app.postcss';
	import myImage from '../lib/img/notImage.png';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Button
	} from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let breakPoint: number = 1024;
	let width: number;
	let backdrop: boolean = false;
	let activateClickOutside = true;
	let drawerHidden: boolean = false;
	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}
	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});
	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};
	const toggleDrawer = () => {
		drawerHidden = false;
	};

	$: Url = $page.url.pathname;
	$: Urls = Url.split('/');
	$: activeUrl = Urls[1];

	let darkmodebtn =
		'text-gray-500 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-lg px-2 py-2 ml-2 -mt-2';

	import type { LayoutData } from './$types.js';
	export let data: LayoutData;

	// @ts-ignore
	$: ({ userDetail } = data);
</script>

<svelte:window bind:innerWidth={width} />

{#if activeUrl === 'login' || activeUrl === 'register'}
	<slot />
{:else}
	<Navbar
		let:hidden
		let:toggle
		navClass="fixed top-0 left-0 w-full z-10 py-2 shadow-lg dark:shadow-none bg-primary-200 dark:bg-primary-900"
	>
		<NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
		<NavBrand href="/" class="lg:ml-64">
			<span
				class="self-center whitespace-nowrap text-xl font-semibold text-primary-900 dark:text-primary-50 pl-4"
			>
				SmartLib
			</span>
		</NavBrand>
		<Button pill color="light" id="avatar_with_name" class="!p-1 mr-5 md:mr-0">
			{#if !userDetail?.foto}
				<Avatar src={myImage} />
			{:else}
				<Avatar src={userDetail?.foto} />
			{/if}
		</Button>
		<Dropdown inline triggeredBy="#avatar_with_name">
			<div slot="header" class="px-4 py-2">
				<span class="block text-sm text-gray-900 dark:text-white"> {userDetail?.nama} </span>
				{#if userDetail?.level === 'ANGGOTA' && userDetail?.na != null}
					<span class="block truncate text-sm font-medium"> {userDetail.na} </span>
				{:else if !userDetail?.na}
					<span class="block truncate text-sm font-medium"> Belum Diupdate </span>
				{:else if userDetail?.level === 'PETUGAS' && userDetail?.np != null}
					<span class="block truncate text-sm font-medium"> {userDetail.np} </span>
				{:else if !userDetail?.np}
					<span class="block truncate text-sm font-medium"> Belum Diupdate </span>
				{/if}
			</div>
			<DropdownItem href="/">Dashboard</DropdownItem>
			<DropdownItem href="/profile">Profile</DropdownItem>
			<DropdownItem defaultClass="font-medium py-2 px-4 text-sm"
				>Mode<DarkMode btnClass={darkmodebtn} /></DropdownItem
			>
			<DropdownDivider />
			<form action="/logout" method="post">
				<DropdownItem type="submit">Keluar</DropdownItem>
			</form>
		</Dropdown>
	</Navbar>
	<Drawer
		transitionType="fly"
		{backdrop}
		{transitionParams}
		bind:hidden={drawerHidden}
		bind:activateClickOutside
		width="w-64"
		class="overflow-scroll pb-32"
		id="sidebar"
		bg-primary
	>
		<div class="flex items-center">
			<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
		</div>
		<Sidebar asideClass="w-54">
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-grey-800">
				<SidebarGroup>
					<SidebarItem
						label="Dashboard"
						href="/"
						aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						active={activeUrl === `` || activeUrl === 'books'}
					>
						<svelte:fragment slot="icon">
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
									d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					{#if userDetail.level === 'ADMIN'}
						<SidebarItem
							label="Users"
							href="/users"
							aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							on:click={toggleSide}
							active={activeUrl === `users`}
						>
							<svelte:fragment slot="icon">
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
										d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									/>
								</svg>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem
							label="Categories"
							href="/category"
							aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							on:click={toggleSide}
							active={activeUrl === `category`}
						>
							<svelte:fragment slot="icon">
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
										d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
									/>
								</svg>
							</svelte:fragment>
						</SidebarItem>
					{/if}
					{#if userDetail.level === 'ADMIN' || userDetail.level === 'PETUGAS'}
						<SidebarItem
							label="ACC"
							href="/acc"
							aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							on:click={toggleSide}
							active={activeUrl === `acc`}
						>
							<svelte:fragment slot="icon">
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
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
							</svelte:fragment>
						</SidebarItem>
					{/if}
				</SidebarGroup>
				<SidebarGroup border>
					<SidebarItem
						label="Profile"
						href="/profile"
						aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						active={activeUrl === `profile`}
					>
						<svelte:fragment slot="icon">
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
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						label="SmartLib Bot"
						href="/profile"
						aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						active={activeUrl === `smartlib`}
					>
						<svelte:fragment slot="icon">
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
									d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					{#if userDetail.level === 'ADMIN'}
						<SidebarItem
							label="Report"
							href="/report"
							aClass="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-800 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
							on:click={toggleSide}
							active={activeUrl === `report`}
						>
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
					{/if}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>

	<div class="flex px-4 mx-auto w-full">
		<main class="lg:ml-64 w-full mx-auto mt-16">
			<slot />
		</main>
	</div>
{/if}
