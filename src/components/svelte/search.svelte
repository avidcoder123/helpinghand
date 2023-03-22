<script lang="ts">
  import { onMount } from "svelte";
import { supabase } from "../../lib/backend";

let results = [] as any;
let text = '';

let class = [] as any;
onMount(async () => {
  const { data: lang, error } = await supabase
            .from("Class")
            .select("*")
            .order("id", { ascending: false })
            .limit(10)
            class = lang || [];
}

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

    <input type="text" bind:value={text} on:input={searchReq} placeholder="Search" class=""/>
    <div class="flex flex-col">
        {#each results as res}
          <div>
            <h3 class="text-lg font-bold">{res.title}</h3>
          </div>
        {/each}
      </div>

</div>