<script lang="ts">
    import Class from "../lib/class";
    import User from "../lib/user";

    if(!User.currentUser) {
        location.replace("/")
    }


    let grade: number | undefined = undefined

    const grades = [6,7,8,9,10,11,12]

    let classes: number[] = []

    //Enter data
    function enterData() {
        User.currentUser?.setGrade(grade!)
        .then(() => Promise.all(
            classes.map(
                c => User.currentUser?.enrollClass(c)
            )
        ))
        .then(() => location.replace("/")/*Replace this URL later!*/)
    }
</script>

<div class="flex flex-col items-center">
    <h1 class="text-center text-5xl mt-10 text-white">Tell us a bit more about yourself.</h1>
    <h2 class="text-center text-4xl mt-10 text-white">Grade Level</h2>
    <div class="btn-group mt-5">
        {#each grades as level}
            <input bind:group={grade} type="radio" name="grade" data-title={level} value={level} class="btn btn-lg" />
        {/each}

    </div>

    <h1 class="text-center text-4xl mt-16 text-white">Your Enrolled Classes</h1>
    {#if grade}
        {#await Class.getByGrade(grade) then list}
            <div class="flex flex-col items-start w-96 mt-5">
                {#each list as c}
                    <label class="cursor-pointer label">
                        <input value={c.id} type="checkbox" bind:group={classes} class="checkbox checkbox-info checkbox-lg" />
                        <span class="label-text ml-2 text-lg text-white">{c.name}</span>
                    </label>
                {/each}
            </div>
        {/await}
        <button on:click={enterData} class="btn btn-primary btn-lg mt-20" class:btn-disabled={classes.length == 0}>Continue</button>
    {:else}
        <h2 class="text-3xl text-center mt-5">Please select a grade level first.</h2>
    {/if}
</div>