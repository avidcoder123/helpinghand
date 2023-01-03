<script lang="ts">
    import { forEach } from "lodash";


    interface Question {
        question: string
        answer: string
        is_file: boolean
    }

    let assignmentname = ""
    let questions: Question[] = []

    const addFree = () => questions = [...questions, {question: "", answer: "", is_file: false}]
    const addFile = () => questions = [...questions, {question: "", answer: "", is_file: true}]
</script>
<h1 class="text-white text-center text-5xl mt-10">Make a New Assignment</h1>
<div class="flex flex-col gap-y-5 items-center mt-10">
    <input type="text" bind:value={assignmentname} placeholder="Assignment Name" class="input input-bordered input-primary w-full max-w-lg" />
    <h1 class="text-white text-4xl my-5">Questions</h1>
    <div class="flex flex-col gap-y-10">
        {#each questions as question, idx}
            <div class="flex flex-row gap-x-3 w-full items-center justify-center"><h1 class="text-white text-2xl">{idx + 1}.</h1>   
                <div class="flex flex-col gap-y-2 w-[32rem]">
                    <input type="text" bind:value={question.question} placeholder="Question Text" class="input input-bordered input-primary w-full max-w-lg" />
                    <textarea class="textarea textarea-primary max-w-lg h-32" placeholder="Question Answer"></textarea>
                </div>
            </div>
        {/each}
    </div>

    <div class="dropdown">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label tabindex="0"  class="btn btn-primary btn-lg mt-5">+ New Question</label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li><a on:click={addFree}>Multiple Choice/Free Response</a></li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li><a on:click={addFile}>File Upload</a></li>
        </ul>
    </div>
</div>
