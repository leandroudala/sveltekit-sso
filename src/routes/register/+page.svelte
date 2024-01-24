<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
    import { enhance } from "$app/forms";

    import Toast from "../components/Toast.svelte";

    let toast: Toast;
    let form: HTMLFormElement;

    const requiredInputs = ['name', 'email', 'username', 'password'];
    const MIN_PASSWORD_LENGTH = 6;

    const isValidPassword = (formData: FormData) => {
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password.length < MIN_PASSWORD_LENGTH) {
            toast.showMessage(`Por favor, digite uma senha com pelo menos ${MIN_PASSWORD_LENGTH} dígitos.`);
            return false;
        }

        if (password === confirmPassword) {
            return true;
        }

        toast.showMessage('Os campos "Senha" e "Confirmar Senha" estão diferentes!');
        return false;
    };

    const submitRegister: SubmitFunction = ({ formData, cancel }) => {
        const pending = requiredInputs.some(input => {
            const value = formData.get(input) as string;
            return !value;
        });
        
        if (pending) {
            toast.showMessage('Por favor, preencha todos os campos.');
            cancel();
            return;
        }

        if (!isValidPassword(formData)) {
            form.confirmPassword.focus();
            cancel();
            return;
        }

        return async ({result, update}) => {

            await update({reset: false});
        };
    };
</script>

<section class="container">
    <Toast bind:this={toast} />
    <h1>Criar Conta</h1>
    <form method="post" action="?/create" use:enhance={submitRegister} bind:this={form}>
        <div class="input-group">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" class="input-text" required>
        </div>
        <div class="input-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="input-text" required>
        </div>
        <div class="input-group">
            <label for="username">Usuário</label>
            <input type="text" name="username" id="username" class="input-text" required>
        </div>
        <div class="input-group">
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" class="input-text" required>
        </div>
        <div class="input-group">
            <label for="confirmPassword">Confirmar Senha</label>
            <input type="password" id="confirmPassword" name="confirmPassword" class="input-text" required>
        </div>
        <div class="buttons">
            <a href="/">Já tenho uma conta!</a>
            <button type="submit" class="btn btn-primary">Criar conta</button>
        </div>
    </form>
</section>

<style>
    form {
        width: 100%;
    }
</style>