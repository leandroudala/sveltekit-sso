<script lang="ts">
	import { goto } from "$app/navigation";
    import LightLogo from "$lib/images/logo-white.png";

    export let theme = true;
    export let width = 200;

    $: vars = `--background-image: url('${LightLogo}'); --width: ${width}px`;

    const onClickHandler = function() {
        goto('/');
    }
</script>

<button type="button" on:click={onClickHandler}>
    <div class="logo" class:light={theme} class:dark={!theme} style={vars}></div>
</button>

<style>
    button {
        background-color: transparent;
        border: 0;
    }
    .logo {
        display: inline-block;
        width: var(--width);
        height: var(--width);
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
</style>