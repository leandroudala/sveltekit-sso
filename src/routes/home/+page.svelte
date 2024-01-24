<script lang="ts">
    export let data;
    
    const user = data.props.userData;
</script>

<section class="container">
    <h1>Udala SSO</h1>
    <div class="w-100">
        <p>
            Olá, {user.name}!
        </p>
    
        <div class="text-right">
            <a href="/logout">Sair</a>
        </div>

    </div>
</section>
