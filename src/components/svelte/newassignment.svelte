<script lang="ts">
    import { supabase } from "../../lib/backend";
    import type { Assignment } from "../../lib/db";
    


    interface Question {
        question: string
        answer: string
        is_file: boolean
        files?: FileList
    }

    let assignmentname = ""
    let questions: Question[] = []

    $: disabled = !(assignmentname != ""
        && questions.length > 0 
        && questions.every(x => x.question != "" && x.answer != ""))

    const addFree = () => questions = [...questions, {question: "", answer: "", is_file: false}]
    const addFile = () => questions = [...questions, {question: "", answer: "", is_file: true}]

    async function uploadFiles() {
        for(let question of questions) {
            if(question.is_file) {
                const file = question.files!.item(0)!
                let { error } = await supabase.storage.from("answers").upload(question.answer, file)
                if(error) throw error
            }
        } 
    }

    async function addQuestions(assignmentId: number) {
        await Promise.all(questions.map((question, idx) => {
            return supabase.from("Question").insert({
                number: idx + 1,
                text: question.question,
                answer: question.answer,
                is_file: question.is_file,
                assignment_id: assignmentId
            })
        }))
    }

    function submit() {
        let classId = (new URL(window.location.href)).searchParams
        if (!classId.has("class")) {
            return alert("Error occured: Assignment must be bound to a class")
        }
        let id: number = -1
        uploadFiles()
        .then(() => {
            return supabase.from("Assignment").insert<Assignment>({
                name: assignmentname,
                class_id: parseInt(classId.get("class")!)
            }).select()
        })
        .then(({data, error}) => {
            if (error) throw error
            id = data![0].id
            return addQuestions(id)
        })
        .then(() => document.location.href = `/assignment/${id}`)
        .catch(e => e.message)
    }
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
                    {#if question.is_file}
                        <input bind:files={question.files} on:change={() => question.answer = Date.now().toString()} accept="image/png, image/jpeg" type="file" class="file-input file-input-bordered file-input-primary w-full max-w-lg" />
                    {:else}
                        <textarea bind:value={question.answer} class="textarea textarea-primary max-w-lg h-32" placeholder="Question Answer"></textarea>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <div class="dropdown dropdown-hover">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label tabindex="0"  class="btn btn-primary mt-5">+ New Question</label>
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
    <button on:click={submit} class="btn btn-success" class:btn-disabled={disabled}>Create Assignment</button>
</div>
