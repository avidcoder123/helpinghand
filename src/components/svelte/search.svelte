<script lang="ts">
  import { onMount } from "svelte";
import { supabase } from "../../lib/backend";

let results = [] as any;
let text = '';

    async function searchReq(){
    const { data: searchResults, error: er} = await supabase
        .from('Assignments')
        .select("*")
        // search the title and description for the search term
        .ilike("title", `%${text}%`)
        .order("id", { ascending: false })
        .limit(10)
        console.log(searchResults)
        // leave the results array empty if there is no search term
        if (text.length > 0) {
            results = searchResults || [];
        } else {
            results = [];
        }
    }


</script>

<div>

    <input type="text" bind:value={text} placeholder="Search" class=""/>

</div>