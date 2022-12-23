<!-- -->
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
  <LottiePlayer
    src="https://assets7.lottiefiles.com/packages/lf20_7ciiygtc.json "
    autoplay="{true}"
    loop="{false}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{150}"
    width="{150}"
    controlsLayout="{controlsLayout}"
  />