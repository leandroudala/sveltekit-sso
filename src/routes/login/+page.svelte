<script lang="ts">
    import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
    import { usernameStore } from "$lib/stores"

	import Toast from '../components/Toast.svelte';
	import { onMount } from 'svelte';
	import Logo from '../components/Logo.svelte';

    export let theme = true;
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

            await update();
        }
    }
</script>

<svelte:head>
    <title>Entrar</title>
    <meta name="description" content="Entrar" />
</svelte:head>


<Toast bind:this={toast} />

<form method="POST" use:enhance={submitLogin} action="?/login">
    <Logo theme={theme} />
    <div class="container">
        <div>
            <label for="user">Usuário</label>
            <input type="text" name="username" id="user" value="{$usernameStore ?? form?.user}">
        </div>
        <div>
            <label for="pass">Senha</label>
            <input type="password" name="pass" id="pass">
        </div>
        <div class="actions">
            <a href="#forgot-password">Esqueci a senha</a>
            <button type="submit">Conectar</button>
        </div>
    </div>
</form>

<style>
    .actions {
        display: flex;
        justify-content: space-between;
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

    form {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-content: space-around;
    }

    form label {
        font-weight: bold;
        display: block;
    }
    form input {
        margin-bottom: 1em;
        width: 100%;
        padding: 12px 20px;
        box-sizing: border-box;
    }

</style>