<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	import Logo from "./components/Logo.svelte";
	import { enhance } from '$app/forms';
	import Toast from './components/Toast.svelte';
	import { usernameStore } from "$lib/stores";
	import { goto } from '$app/navigation';
	import UserService, {type CheckAvailabilityResponseDTO } from "$lib/services/user.service";

	let toast: Toast;
	let usernameInput: HTMLInputElement;
	const service = new UserService();

	const isUserExists = (data: CheckAvailabilityResponseDTO): boolean => {
		return !data.emailAvailable || !data.usernameAvailable;
	}

	const submitCheckAvailability: SubmitFunction = async ({ formData, cancel }) => {
		// prevent default form action
		cancel();

		const username = formData.get("username");

		if (!username) {
			toast.showMessage('Informe um usuário');
			usernameInput.focus();
			return;
		}

		const data = await service.checkAvailability(username.toString());
		if (isUserExists(data)) {
			usernameStore.set(username.toString());
			goto("/login");
			return;
		}

		toast.showMessage('Usuário não encontrado.');
		usernameInput.focus();
	}
</script>

<svelte:head>
	<title>SSO</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container">
	<Toast bind:this={toast} />
	<Logo />

	<div class="user-area">
		<form method="POST" use:enhance={submitCheckAvailability}>
			<div class="input-group">
				<label for="username">Usuário</label>
				<input type="text" class="input-text" name="username" id="username" bind:this={usernameInput} value={$usernameStore}>
			</div>
			<div class="buttons">
				<a href="/register" class="register">Criar conta</a>
				<button type="submit" class="btn-primary">Entrar</button>
			</div>
		</form>
	</div>
</section>

<style>
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
