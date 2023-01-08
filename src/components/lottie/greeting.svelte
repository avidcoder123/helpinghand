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
  <div class="flex justify-center flex-col items-center">
  <LottiePlayer
    src="https://assets9.lottiefiles.com/packages/lf20_c1hkermx.json"
    autoplay="{true}"
    loop="{false}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{450}"
    width="{450}"
    controlsLayout="{controlsLayout}"
  />
</div>