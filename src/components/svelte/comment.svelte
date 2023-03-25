<script lang="ts">

import { onMount } from 'svelte';
import { supabase } from '../../lib/backend';

export let pid = 0;
// make the user any
export let user: any = null;

interface Comment {
    text: string;
    user_id: number;
    created_at: string;
    comment_of: number;
}

let comment: Comment = {
    text: '',
    user_id: user.id,
    created_at: new Date().toISOString(),
    comment_of: pid,
};

let comments: Comment[] = [];

$: disabled = !comment.text;

onMount(async () => {
    const { data, error } = await supabase
        .from('Comment')
        .select('*')
        .eq('comment_of', pid)
        .order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    } else {
        comments = data as Comment[];
    }
});

async function addComment() {
    const { data, error } = await supabase.from("Comment").insert(comment);
    if (error) {
        console.log(error);
    } else {
        comments = [...comments];
    }
}

</script>

<main class="flex flex-col justify-center items-center place-items-center">
    <h1 class="text-2xl font-bold text-white">Comments</h1>
    <div class="flex-row gap-6">
        <input class="input input-bordered input-info w-full max-w-xs" bind:value={comment.text} placeholder="Add a comment" type="text
        ">
        <button class="btn btn-success disabled:btn-error"on:click={addComment} {disabled}>Add</button>
    </div>
    {#each comments as comment}
    <div class="chat chat-start">
        <div class="chat-header">
            <time class="text-xs opacity-50 pl-3">{comment.created_at.slice(0, 10)}</time>
          </div>
        <div class="chat-bubble chat-bubble-accent">{comment.text}</div>     
    </div>
    {/each}
</main>