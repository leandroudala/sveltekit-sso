<script lang="ts">
	import { browser } from '$app/environment';

	export let theme = true;

	import moon from '$lib/images/moon.svg';
	import sun from '$lib/images/sun.svg';

	function toggleDarkMode() {
		theme = !theme
		if (!browser) {
			return;
		}

		localStorage.setItem('theme', '' + theme);
	}
</script>

<header>
	<div class="corner"></div>

	<div class="corner">
		<button type="button" class="dark-mode" on:click={toggleDarkMode}>
			<img src={theme ? moon : sun} alt="Mudar tema" />
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.dark-mode {
		border: 0;
		border-radius: 50%;
		background-color: transparent;
	}

	.corner {
		width: 3em;
		height: 3em;
	}


	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

</style>
