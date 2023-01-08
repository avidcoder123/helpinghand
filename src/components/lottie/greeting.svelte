
<script>
    import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  
    let controlsLayout = [
      'previousFrame',
      'playpause',
      'stop',
      'nextFrame',
      'progress',
      'frame',
      'loop',
      'spacer',
      'background',
      'snapshot',
      'zoom',
      'info',
    ];
  </script>
  <div class="flex justify-center flex-col w-screen items-center">
  <LottiePlayer
    src="export let Title:string"
    autoplay="{true}"
    loop="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{450}"
    width="{450}"
    controlsLayout="{controlsLayout}"
  />
</div>