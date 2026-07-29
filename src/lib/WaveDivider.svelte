<script>
  let active = false;
  let offset = 0;

  function react(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    offset = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    active = true;
  }

  function settle() {
    active = false;
    offset = 0;
  }
</script>

<div class="wave" aria-hidden="true" onpointermove={react} onpointerleave={settle}>
  <svg viewBox="0 0 720 18" preserveAspectRatio="none">
    <path
      class:active
      style:transform={`translateX(${offset}px)`}
      d="M-40 9 Q-25 1  -10 9 T20 9 T50 9 T80 9 T110 9 T140 9 T170 9 T200 9 T230 9 T260 9 T290 9 T320 9 T350 9 T380 9 T410 9 T440 9 T470 9 T500 9 T530 9 T560 9 T590 9 T620 9 T650 9 T680 9 T710 9 T740 9"
    />
  </svg>
</div>
