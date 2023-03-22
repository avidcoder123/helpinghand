<script lang="ts">
  import { onMount } from "svelte";
import { supabase } from "../../lib/backend";

let results: any[] = [];
let text = '';

let clas = [] as any;

onMount(async () => {
  const { data: lang, error } = await supabase
            .from("Class")
            .select("*")
            .order("id", { ascending: false })
            .limit(10)
            clas = lang || [];     
})

async function searchReq(){
    const { data: searchResults, error: er} = await supabase
        .from('Assignment')
        .select("*")
        // search the title and description for the search term
        .ilike("name", `%${text}%`)
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

<div class="flex justify-center pt-3">
<div class="items-center">
    <input type="text" bind:value={text} on:input={searchReq} placeholder="Search" class="input input-bordered input-primary flex justify-center w-96"/>
    <div class="flex flex-col overflow-y-auto max-h-72 w-96 card bg-info-content shadow-xl rounded-lg mt-2">
        {#each results as res}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="w-96 p-4 cursor-pointer hover:bg-zinc-900" on:click={() => document.location.href = `/assignment/${res.id}`}>
            <h3 class="text-lg font-bold">{res.name}</h3>
            <p class="text-gray-500">Class: {clas.find((x) => x.id == res.class_id).name}</p>
          </div>
          <!-- divider -->
          <div class="border-t-2 border-gray-200"></div>
        {/each}
      </div>
</div>
</div>

<style>
  /* hide scroll bars */
  ::-webkit-scrollbar {
    display: none;
  }
</style>