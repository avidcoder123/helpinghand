<script>
    import User from "../lib/user"
    import { onMount } from "svelte"

    async function auth() {
        try {
            await User.register()
            location.replace("/")
        } catch(e) {
            throw e
        }
    }

    //Make sure auth function only runs on client
    let onClient = false

    onMount(() => onClient = true)

    const retry = () => location.reload()

    const goToLogin = () => location.replace("/login")
</script>

<div class="items-center">
    {#if onClient}
        {#await auth()}
            <h1 class="text-center text-5xl pt-10 text-white">Registering Account</h1>
            <h2 class="text-center text-3xl pt-5 text-white">You should have a popup to register with Google.</h2>
        {:catch err}
            <div class="flex flex-col items-center">
                <h3 class="text-center text-3xl pt-10 text-error">Error: {err}</h3>
                <div class="flex flex-row space-x-3">
                    <button class="btn btn-info mt-5" on:click={retry}>Try again</button>
                    <button class="btn btn-success mt-5" on:click={goToLogin}>Login Instead</button>
                </div>
            </div>
        {/await}
    {/if}
</div>
