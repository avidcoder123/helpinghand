<script lang="ts">
    import { supabase } from "../../lib/backend";
    import type { PostgrestResponse, UserResponse } from "@supabase/supabase-js";
    import type { Class, Class_User } from "../../lib/db";


    let grade: number | undefined = undefined

    const grades = [6,7,8,9,10,11,12]

    let classes: number[] = []

    async function addClasses(user: UserResponse) {
        console.log(user)
        await supabase.from("Class_User")
            .delete()
            .eq("user_id", user.data.user?.id)

        for(const id of classes) {
            await supabase.from("Class_User")
                        .upsert<Class_User>({
                            class_id: id,
                            user_id: user.data.user?.id!
                        }, {ignoreDuplicates: false})
        }
    }

    $: disabled = classes.length == 0

    //Enter data
    function enterData() {
        disabled = true
        supabase.auth.getUser()
        .then(user => addClasses(user))
        .then(() => location.replace("/dashboard"))
    }

    async function getByGrade(grade: number) {
        let list: PostgrestResponse<Class> = await supabase.from("Class")
            .select("*")
            .contains("grades", [grade])
            .order("name", {ascending: true})
        if(!list.data) {
            return []
        } else {
            return list.data
        }
    }
</script>

<div class="flex flex-col items-center">
    <h1 class="text-center text-xl sm:text-4xl 2xl:text-5xl mt-10 text-white">Tell us a bit more about yourself.</h1>
    <h2 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-10 text-white">Grade Level</h2>
    <div class="btn-group mt-5">
        {#each grades as level}
            <input bind:group={grade} type="radio" name="grade" data-title={level} value={level} class="btn btn-lg" />
        {/each}

    </div>

    <h1 class="text-center text-lg sm:text-2xl 2xl:text-4xl mt-16 text-white">Your Enrolled Classes</h1>
    {#if grade}
        {#await getByGrade(grade) then list}
            <div class="flex flex-col items-start w-96 mt-5">
                {#each list as c}
                    <label class="cursor-pointer label">
                        <input value={c.id} type="checkbox" bind:group={classes} class="checkbox checkbox-info checkbox-lg" />
                        <span class="label-text ml-2 text-lg text-white">{c.name}</span>
                    </label>
                {/each}
            </div>
        {/await}
        <button on:click={enterData} class="btn btn-primary btn-lg mt-20" class:btn-disabled={disabled}>Continue</button>
    {:else}
        <h2 class="text-3xl text-center mt-5">Please select a grade level first.</h2>
    {/if}
</div>
