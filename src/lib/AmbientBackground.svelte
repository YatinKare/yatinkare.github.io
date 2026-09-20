<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const context = canvas.getContext('2d', { alpha: true });
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame;
    let running = false;
    let lastTime = 0;
    let scrollTarget = window.scrollY;
    let scrollPosition = scrollTarget;
    const pointer = { x: 0.72, y: 0.22, targetX: 0.72, targetY: 0.22 };

    const particles = Array.from({ length: 26 }, (_, index) => ({
      x: ((index * 47) % 101) / 100,
      y: ((index * 71 + 17) % 103) / 102,
      size: 0.45 + (index % 4) * 0.22,
      depth: 0.25 + (index % 5) * 0.13,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);

      const drift = scrollPosition * 0.055;
      const glowX = pointer.x * width;
      const glowY = pointer.y * height;
      const glowRadius = Math.max(width, height) * 0.48;
      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
      glow.addColorStop(0, 'rgba(216, 255, 88, 0.042)');
      glow.addColorStop(0.42, 'rgba(150, 165, 125, 0.018)');
      glow.addColorStop(1, 'rgba(17, 19, 16, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.lineWidth = 1;
      for (let line = 0; line < 8; line += 1) {
        const baseX = width * (0.08 + line * 0.145);
        const pointerPull = (pointer.x - 0.5) * (18 + line * 2.5);
        const phase = line * 0.73 + drift * 0.005;
        context.beginPath();
        for (let y = -36; y <= height + 36; y += 24) {
          const wave = Math.sin(y * 0.0065 + phase) * (11 + line * 1.2);
          const nearPointer = Math.exp(-Math.pow((y - glowY) / Math.max(170, height * 0.32), 2));
          const x = baseX + wave + pointerPull * nearPointer;
          if (y === -36) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const accentLine = line === 4;
        context.strokeStyle = accentLine
          ? 'rgba(216, 255, 88, 0.055)'
          : `rgba(196, 202, 190, ${0.022 + line * 0.002})`;
        context.stroke();
      }

      for (const particle of particles) {
        const travel = motionQuery.matches ? 0 : time * 0.0025 * particle.depth;
        const x = (particle.x * width + (pointer.x - 0.5) * 24 * particle.depth + travel) % (width + 20);
        const y = ((particle.y * height - drift * particle.depth) % (height + 30) + height + 30) % (height + 30) - 15;
        const distance = Math.hypot(x - glowX, y - glowY);
        const proximity = Math.max(0, 1 - distance / Math.max(260, width * 0.34));
        context.beginPath();
        context.arc(x, y, particle.size + proximity * 0.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(216, 255, 88, ${0.07 + proximity * 0.12})`;
        context.fill();
      }
    }

    function tick(time) {
      if (!running) return;
      const delta = Math.min(32, time - lastTime || 16);
      lastTime = time;
      const easing = 1 - Math.pow(0.88, delta / 16);
      pointer.x += (pointer.targetX - pointer.x) * easing;
      pointer.y += (pointer.targetY - pointer.y) * easing;
      scrollPosition += (scrollTarget - scrollPosition) * easing * 0.55;
      draw(time);
      frame = requestAnimationFrame(tick);
    }

    function start() {
      cancelAnimationFrame(frame);
      running = !motionQuery.matches && !document.hidden;
      if (running) frame = requestAnimationFrame(tick);
      else draw(0);
    }

    function handlePointer(event) {
      if (!finePointerQuery.matches || motionQuery.matches) return;
      pointer.targetX = event.clientX / Math.max(1, width);
      pointer.targetY = event.clientY / Math.max(1, height);
    }

    function handleScroll() {
      scrollTarget = window.scrollY;
      if (motionQuery.matches) {
        scrollPosition = scrollTarget;
        draw(0);
      }
    }

    function handleVisibility() {
      start();
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    motionQuery.addEventListener('change', start);
    resize();
    start();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', start);
    };
  });
</script>

<canvas bind:this={canvas} class="ambient-background" aria-hidden="true"></canvas>
