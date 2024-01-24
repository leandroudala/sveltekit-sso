<script lang="ts">
	import { browser } from '$app/environment';

	export let theme = true;

	$: showOverlay = false;

	import moon from '$lib/images/moon.svg';
	import sun from '$lib/images/sun.svg';

	function toggleDarkMode() {
		theme = !theme
		if (!browser) {
			return;
		}

		localStorage.setItem('theme', '' + theme);
	}
	
	function closeMenu() {
		showOverlay = false;
	}

	function onClickMenu() {
		showOverlay = true;
	}
</script>

<header>
	<nav class:dark={!theme}>
		<div id="overlayContent" class:show={showOverlay}>
			<div class="nav-buttons">
				<button type="button" class="right close-button" on:click={closeMenu}>&times;</button>
				<div class="btn-text">
					Tema:
					<button type="button" class="dark-mode" on:click={toggleDarkMode}>
						<img src={theme ? moon : sun} alt="Mudar tema" />
					</button>
				</div>
			</div>
		</div>

		<button class="icon" on:click={onClickMenu} type="button">&#9776;</button>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		box-sizing: border-box;
	}

	nav {
		align-self: stretch;
		background-color: var(--light-blue);
		color: var(--dark-blue);
		text-align: right;
	}

	nav button {
		border: 0;
		background-color: transparent;
		color: var(--dark-blue);
		font-size: 2.5em;
		font-weight: bold;
	}

	button.dark-mode {
		color: #fff;
	}

	#overlayContent {
		color: #fff;
		height: 100%;
		width: 0;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		background-color: rgb(0, 0, 0);
		background-color: rgb(0, 0, 0, 0.9);
		overflow-x: hidden;
		transition: .5s;
	}
	.nav-buttons {
		margin-top: 1em;
	}

	.btn-text {
		line-height: 1em;
		vertical-align: middle;
	}

	#overlayContent.show {
		width: 100%;
	}

	#overlayContent .right {
		width: 100%;
		text-align: right;
		color: var(--light-blue);
	}

	nav.dark {
		background-color: var(--dark-blue);
		color: var(--light-blue);
	}

	nav.dark > button {
		color: var(--light-blue);
	}

	img {
		width: .7em;
		height: .7em;
		object-fit: contain;
	}

</style>
