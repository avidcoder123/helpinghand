<script lang="ts">
  import { onMount } from "svelte";
import { supabase } from "../../lib/backend";

let List = [] as any;
let text = '';

onMount(async () => {
  let { data: Assignment, error } = await supabase
    .from('Assignment')
    .select('*')
  List = Assignment as any;
});

</script>

<div>

    <input type="text" bind:value={text} placeholder="Search" class=""/>

</div>