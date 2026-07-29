<script>
  let tiltX = 0;
  let tiltY = 0;

  function handlePointer(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX = y * -3;
    tiltY = x * 3;
  }

  function reset() {
    tiltX = 0;
    tiltY = 0;
  }
</script>

<!-- Pointer movement is a decorative enhancement; the portrait itself is not an action. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="portrait-frame" onpointermove={handlePointer} onpointerleave={reset}>
  <img
    class="headshot"
    src="/images/Headshot.jpg"
    alt="Portrait of Yatin Kare"
    width="132"
    height="132"
    style:transform={`perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`}
  />
  <span class="portrait-corner" aria-hidden="true"></span>
</div>
