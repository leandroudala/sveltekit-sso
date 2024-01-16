<script type="ts">
    import LightLogo from "$lib/images/logo-white.png";
    import DarkLogo from "$lib/images/logo_dark.jpeg";
	import { theme } from "$lib/stores";

    $: vars = `--background-image: url('${$theme ? LightLogo : DarkLogo}')`;
</script>
<svelte:head>
    <title>Entrar</title>
    <meta name="description" content="Entrar" />
</svelte:head>

<form>
    <div class="logo" class:light={$theme} class:dark={!$theme} style={vars}></div>
    <div class="fields">
        <div>
            <label for="user">Usuário</label>
            <input type="text" name="user" id="user">
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
    
    .fields {
        width: 50%;
        padding: 1em;
        box-sizing: border-box;
    }
    .logo {
        display: inline-block;
        width: 250px;
        min-height: 250px;
        background-color: #FFFFFF;
        border-radius: 50%;
        background-image: var(--background-image);
        background-position: center;
        background-repeat: no-repeat;
        transition: 0.2s ease-in;
    }

    .light {
        background-size: 110%;
        background-color: #FFFFFF;
    }

    .dark {
        background-size: 100%;
        background-color: var(--dark-blue);
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

    @media (max-width: 600px) {
        .fields {
            width: 100%;
        }
    }
</style>