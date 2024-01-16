<script>
	import './styles.css';
	import Header from './Header.svelte';
	import { browser } from '$app/environment';

	let theme = browser ? !(window.localStorage.getItem('theme') === 'false') : true;
</script>

<div class="app" class:light={theme} class:dark={!theme}>
	<Header bind:theme={theme} />

	<main>
		<slot />
	</main>

	<footer>
		<p>Criado por <a href="mailto:leandroudala@gmail.com">Leandro Udala</a>.</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		align-items: stretch;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
