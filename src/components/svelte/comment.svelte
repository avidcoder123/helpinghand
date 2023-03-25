<script lang="ts">

import { onMount } from 'svelte';
import { supabase } from '../../lib/backend';

export let pid = 0;

interface Comment {
    id: number;
    text: string;
    user_id: number;
    created_at: string;
    comment_of: number;
}

let comment: Comment = {
    id: 0,
    text: '',
    user_id: 0,
    created_at: new Date().toISOString(),
    comment_of: pid,
};

let comments: Comment[] = [];

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
    <h1>Comments</h1>
    <div class="comments">
        {#each comments as comment}
            <div class="comment">
                <p>{comment.text}</p>
            </div>
        {/each}
    </div>
    <div class="add-comment">
        <textarea bind:value={comment.text} placeholder="Add a comment"></textarea>
        <button on:click={addComment}>Add</button>
    </div>
    {#each comments as comment}
        <div class="comment">
            <p>{comment.text}</p>
        </div>
    {/each}
</main>