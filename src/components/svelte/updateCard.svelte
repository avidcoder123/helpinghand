<script lang="ts">



let updates = fetch("https://api.github.com/repos/avidcoder123/helpinghand/commits")
    .then(data => data.json())
    .then(data => data.map(
        (obj: any) => obj.commit.message
    ))


</script>

<main class="flex justify-center mt-5 flex-col sm:flex-row ga-12">

<div class=" card bg-info-content sm:w-1/2 w-full h-96 overflow-scroll overflow-x-clip">
    <p class="text-xl pt-[5%] sm:pt-5 text-center text-white">Update Log</p>
    <div class=" text-lg pl-2 card-body">
        - Added a new mobile layout<br>
        - Added class request. Go request your class!<br>
        - Fixed some bugs<br>
        - Added new class<br>
        - Updated Update Log<br>
        - Added GitHub commits with Update log along with Less complex normal log
    </div>
</div>
<div class=" card bg-info-content sm:w-1/2 w-full h-96 overflow-scroll overflow-x-clip">
    <p class="text-xl pt-[5%] sm:pt-5 text-center text-white">Github Commits</p>
    <div class=" text-lg pl-2 card-body">
        {#await updates then list}
            {#each list as up}
              <p class="ml-5">- {up}</p>
            {/each}
        {/await}
    </div>
</div>
</main>