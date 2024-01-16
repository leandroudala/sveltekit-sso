<script lang="ts">
    import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
    import { usernameStore } from "$lib/stores"

	import Toast from '../components/Toast.svelte';
	import { onMount } from 'svelte';
	import Logo from '../components/Logo.svelte';

    let form: ActionData;
    let toast: Toast;

    onMount(() => {
        let focusOn = 'user';
        if ($usernameStore) {
            focusOn = 'pass';
        }

        document.getElementById(focusOn)?.focus();
    });

    const submitLogin: SubmitFunction = ({ formData, formElement }) => {
        const user = formData.get('username');
        const password = formData.get('pass');

        if (!user) {
            toast.showMessage('Informe o usuário.');
            formElement.user.focus();
            return;
        }

        if (!password) {
            toast.showMessage('Informe a senha.');
            formElement.pass.focus();
            return;
        }
    
        return async ({result, update}) => {
            switch(result.type) {
                case 'success':
                    toast.showMessage('Olá!');
                    break;
                case 'failure':
                    toast.showMessage('Credenciais inválidas');
                    break;
                default:
                    toast.showMessage('Erro desconhecido!');
                    break;
            }

            await update({reset: false});
        }
    }
</script>

<svelte:head>
    <title>SSO - Entrar</title>
    <meta name="description" content="Entrar" />
</svelte:head>

<section class="container">
    <Toast bind:this={toast} />
    <Logo />

    <div class="user-area">
        <form method="POST" use:enhance={submitLogin} action="?/login">
            <div class="input-group">
                <label for="user">Usuário</label>
                <input type="text" class="input-text" name="username" id="user" value="{$usernameStore ?? form?.username}">
            </div>
            <div class="input-group">
                <label for="pass">Senha</label>
                <input type="password" class="input-text" name="pass" id="pass">
            </div>
            <div class="actions">
                <a href="#forgot-password">Esqueci a senha</a>
                <button type="submit">Conectar</button>
            </div>
        </form>
    </div>
</section>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }

    .user-area {
        width: 100%;
    }
    .actions {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    
    .actions button {
        padding: 10px 20px;
        background-color: var(--dark-blue);
        color: var(--white);
        border: 0;
    }

    .dark .actions button {
        background-color: var(--light-blue);
        color: var(--dark-blue);
    }

    .actions a {
        padding: 10px 0px;
    }


    form label {
        font-weight: bold;
        display: block;
        margin-bottom: .5em;
    }
    

</style>