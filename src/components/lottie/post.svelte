
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
    src="https://assets1.lottiefiles.com/private_files/lf30_noq8b0i9.json "
    autoplay="{true}"
    loop="{false}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{150}"
    width="{150}"
    controlsLayout="{controlsLayout}"
  />