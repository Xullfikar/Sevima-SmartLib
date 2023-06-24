<script>
	// @ts-nocheck
	export let shortText;
	export let longText;
	let showFullText = false;
</script>

<p class="text-gray-700 dark:text-gray-400 leading-relaxed mb-3">{@html shortText}</p>
{#if showFullText}
	<p class="text-gray-700 dark:text-gray-400 leading-relaxed mb-3">{@html longText}</p>
{/if}
{#if showFullText}
	<button on:click={() => (showFullText = false)} class="read-more">Tampilkan Sedikit</button>
{:else}
	<button on:click={() => (showFullText = true)} class="read-more">Baca Selengkapnya</button>
{/if}

<style>
	.read-more {
		@apply text-blue-500 hover:text-blue-700;
	}
</style>
