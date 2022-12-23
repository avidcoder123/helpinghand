<script lang="ts">
    import User from "../../lib/user"
    import { onMount } from "svelte"
    async function auth() {
        try {
            await User.login()
            location.replace("/")
        } catch(e) {
            throw e
        }
    }


    //Make sure auth function only runs on client
    let onClient = false

    onMount(() => onClient = true)

    const goToRegister = () => location.replace("/register")

    const retry = () => location.reload()
</script>

<div class="items-center">
    {#if onClient}
        {#await auth()}
            <h1 class="text-center text-5xl mt-10 text-white">Logging in...</h1>
            <h2 class="text-center text-3xl mt-5 text-white">You should have a popup to login with Google.</h2>
        {:catch err}
            <div class="flex flex-col items-center">
                <h3 class="text-center text-3xl mt-10 text-error">Error: {err}</h3>
                <div class="flex flex-row space-x-3">
                    <button class="btn btn-primary mt-5" on:click={retry}>Try again</button>
                    <button class="btn btn-success mt-5" on:click={goToRegister}>Register Instead</button>
                </div>
            </div>
        {/await}
    {/if}
</div>
