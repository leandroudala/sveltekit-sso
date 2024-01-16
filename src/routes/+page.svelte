<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	import Logo from "./components/Logo.svelte";
	import { enhance } from '$app/forms';
	import Toast from './components/Toast.svelte';
	import { usernameStore } from "$lib/stores";
	import { goto } from '$app/navigation';

	let toast: Toast;
	let usernameInput: HTMLInputElement;

	const submitCheckAvailability: SubmitFunction = ({ formData, cancel }) => {
		// prevent default form action
		cancel();

		const username = formData.get("username");

		if (!username) {
			toast.showMessage('Informe um usuário');
			usernameInput.focus();
			return;
		}
	
		usernameStore.set(username.toString());
		goto("/login");
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container">
	<Toast bind:this={toast} />
	<Logo />

	<div class="user-area">
		<form method="POST" use:enhance={submitCheckAvailability}>
			<div class="logon">
				<label for="username">Usuário</label>
				<input type="text" class="input-text" name="username" id="username" bind:this={usernameInput} value={$usernameStore}>
			</div>
			<div class="buttons">
				<a href="?/register" class="register">Criar conta</a>
				<button type="submit" class="button-primary">Login</button>
			</div>
		</form>
	</div>
</section>

<style>
	:root {
		--padding: 1em;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.user-area, .buttons {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
	}

	.user-area label {
		font-weight: bold;
		display: block;
		margin-bottom: .5em;
	}
	.user-area .logon {
		margin-bottom: var(--padding);
	}

	button {
		border: 0;
		padding: 1em;
		min-width: 100px;
	}

	.register {
		padding: 1em 0;
		text-decoration: none;
	}
	.register:hover {
		text-decoration: underline;
	}

</style>
