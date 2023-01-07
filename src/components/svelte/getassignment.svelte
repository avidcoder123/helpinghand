<script lang="ts">
    import { supabase } from "../../lib/backend";
    import type { Question } from "../../lib/db";

    export let id: number;
    async function getTitle() {
        let obj = (await supabase.from("Assignment").select("name").eq("id", id).limit(1)).data!
        if(obj.length == 0) {
            location.href = "/404"
        }

        let title = obj[0].name
        return title
    }
    async function getQuestions() {
        let questions: Question[] = (await supabase.from("Question").select("*").eq("assignment_id", id).order("number", { ascending: true })).data!
        return questions
    }

</script>

{#await getTitle() then title}
    <h1 class="text-white text-4xl 2xl:text-5xl text-center my-10">{title}</h1>
{/await}
{#await getQuestions() then questions}
    {#each questions as question}
        <div class="flex flex-col items-center">
            <div class="flex flex-col items-center gap-y-2 my-5">
                <h2 class="text-white text-2xl 2xl:text-4xl text-left w-96">{question.number}. {question.text}</h2>
                {#if question.is_file}
                    <img width="50%" alt="Answers" src={"https://tzkfqozchfdkixqkvmoo.supabase.co/storage/v1/object/public/answers/" + question.answer}>
                {:else}
                    <h2 class="text-lg 2xl:text-2xl text-left w-96">{question.answer}</h2>
                {/if}
            </div>
        </div>
    {/each}
{/await}

