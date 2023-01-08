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
    src="https://assets4.lottiefiles.com/packages/lf20_ef8s1igf.json"
    autoplay="{true}"
    loop="{false}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{350}"
    width="{350}"
    controlsLayout="{controlsLayout}"
  />
</div>