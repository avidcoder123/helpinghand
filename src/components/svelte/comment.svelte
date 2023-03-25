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

<main>
    <h1 class="text-2xl font-bold text-white">Comments</h1>
    {#if !user}
        <p class="text-white">Please login to comment</p>
    {/if}
    {#if user}
    <div class="">
        <textarea bind:value={comment.text} placeholder="Add a comment"></textarea>
        <button class="btn btn-success disabled:btn-error" {disabled} on:click={addComment}>Add</button>
    </div>
    {/if}
    {#each comments as comment}
        <div class="comment">
            <p>{comment.text}</p>
        </div>
    {/each}
</main>