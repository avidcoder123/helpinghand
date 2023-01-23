<script lang="ts">



let updates = fetch("https://api.github.com/repos/avidcoder123/helpinghand/commits")
    .then(data => data.json())
    .then(data => data.map(
        (obj: any) => obj.commit.message
    ))


</script>

<main class="flex justify-center mt-5">

<div class=" card bg-info-content sm:w-7/12 w-96">
    <p class="text-xl pt-[5%] sm:pt-5 text-center text-white">Update Log</p>
    <div class=" text-lg pl-2 card-body">
        {#await updates then list}
            {#each list as up}
              <p class="ml-5">{up}</p>
            {/each}
        {/await}
    </div>
</div>
</main>