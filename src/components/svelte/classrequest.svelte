<script lang="ts">
    import { supabase } from "../../lib/backend";
    import type { Class_Request } from "../../lib/db";

    let classname: string, teachername: string, acceleration: string
    let grades: string[] = []

    $: disabled = !(classname && teachername && acceleration && grades.length)

    async function submit() {
        await supabase.from("Class_Request")
        .insert<Class_Request>({
            name: `${classname} ${acceleration}`,
            teacher: teachername,
            grades: grades.map(parseInt)
        })
    } 

    function handleClick() {
        disabled = true
        submit()
        .then(() => alert("Thank you!"))
        .then(() => window.location.href = "/")
    }
</script>

<h1 class="text-white text-center pt-20 text-5xl">Request A Class</h1>
<div class="flex flex-col mt-10 gap-y-5 items-center">

    <h2 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-10 text-white">Class Name</h2>
    <h3 class="text-center text-lg sm:text-lg 2xl:text-xl text-white">No Acceleration Suffixes/Prefixes: "Algebra II",  not "Algebra II Honors"</h3>
    <input type="text" bind:value={classname} placeholder="Class Name" class="input input-bordered input-primary w-full max-w-lg" />

    <h2 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-10 text-white">Professor/Teacher Name</h2>
    <input type="text" bind:value={teachername} placeholder="Professor/Teacher Name" class="input input-bordered input-primary w-full max-w-lg" />

    <h2 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-10 text-white">Acceleration Level</h2>
    <div class="btn-group mt-5">
        {#each ["On Level", "Honors", "AP", "Dual Credit"] as level}
            <input type="radio" bind:group={acceleration} name="grade" data-title={level} value={level} class="btn btn-lg" />
        {/each}
    </div>

    <h2 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-10 text-white">Grade Levels</h2>
    <div class="grid grid-cols-3 items-start w-96 mt-5">
        {#each [6,7,8,9,10,11,12] as grade}
            <div class="flex">
                <label class="cursor-pointer label">
                    <input bind:group={grades} value={grade} type="checkbox" class="checkbox checkbox-info checkbox-lg" />
                    <span class="label-text ml-2 text-lg text-white">{grade}</span>
                </label>
            </div>
        {/each}
    </div>
    <button on:click={handleClick} class="btn btn-lg btn-primary mt-10" class:btn-disabled={disabled}>Submit</button>
</div>
