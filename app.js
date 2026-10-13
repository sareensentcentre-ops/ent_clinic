(() => {
  const TOTAL_FRAMES = 240;
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loaderBar = document.getElementById('loader-bar');

  const frames = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnActualIndex = -1;

  // Format frame path: frames/frame_000001.jpg -> frames/frame_000240.jpg
  function getFrameUrl(index) {
    const frameNumber = String(index + 1).padStart(6, '0');
    return `frames/frame_${frameNumber}.jpg`;
  }

  // Handle Retina / DPI canvas scaling
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Force redraw on resize
    lastDrawnActualIndex = -1;
    drawFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame))));
  }

  window.addEventListener('resize', resizeCanvas);

  // High-performance cover rendering maintaining aspect ratio
  function drawImageProp(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) * 0.5;
    const cy = (ch - nh) * 0.5;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, cx, cy, nw, nh);
  }

  // Fallback to nearest loaded frame to prevent any blank frames or flicker
  function getBestFrameWithIndex(index) {
    if (frames[index] && frames[index].complete && frames[index].naturalWidth > 0) {
      return { img: frames[index], actualIndex: index };
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
        return { img: frames[prev], actualIndex: prev };
      }
      const next = index + offset;
      if (next < TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
        return { img: frames[next], actualIndex: next };
      }
    }
    return null;
  }

  function drawFrame(index) {
    const result = getBestFrameWithIndex(index);
    if (result && result.img) {
      if (result.actualIndex !== lastDrawnActualIndex) {
        drawImageProp(result.img);
        lastDrawnActualIndex = result.actualIndex;
      }
    }
  }

  // Scroll position mapping to target frame
  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    targetFrame = scrollProgress * (TOTAL_FRAMES - 1);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth LERP (linear interpolation) animation loop
  function loop() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.001) {
      currentFrame += diff * 0.12;
    } else {
      currentFrame = targetFrame;
    }

    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
    drawFrame(frameIndex);

    requestAnimationFrame(loop);
  }

  // Preloading image loader
  function loadSingleFrame(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        frames[index] = img;
        loadedCount++;

        // If this newly loaded frame is closer than what's currently rendered, redraw immediately
        const currentIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
        if (Math.abs(index - currentIndex) < Math.abs(lastDrawnActualIndex - currentIndex)) {
          drawFrame(currentIndex);
        }

        if (loaderBar) {
          loaderBar.style.width = `${Math.min(100, (loadedCount / TOTAL_FRAMES) * 100)}%`;
          if (loadedCount >= TOTAL_FRAMES) {
            setTimeout(() => {
              loaderBar.classList.add('hidden');
            }, 300);
          }
        }
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = getFrameUrl(index);
    });
  }

  // Smart phased preloader
  async function preloadAllFrames() {
    // Phase 1: Load frame 0 immediately and draw it
    const firstFrame = await loadSingleFrame(0);
    if (firstFrame) {
      drawFrame(0);
    }

    // Phase 2: Keyframe skeleton pass across the whole timeline
    const skeletonIndices = [];
    for (let i = 8; i < TOTAL_FRAMES; i += 8) {
      skeletonIndices.push(i);
    }
    await Promise.all(skeletonIndices.map((idx) => loadSingleFrame(idx)));

    // Phase 3: Fill all remaining frames with parallel concurrency
    const remainingIndices = [];
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!frames[i]) {
        remainingIndices.push(i);
      }
    }

    const CONCURRENCY = 12;
    let indexCursor = 0;

    async function worker() {
      while (indexCursor < remainingIndices.length) {
        const nextIdx = remainingIndices[indexCursor++];
        await loadSingleFrame(nextIdx);
      }
    }

    const workers = [];
    for (let c = 0; c < CONCURRENCY; c++) {
      workers.push(worker());
    }
    await Promise.all(workers);
  }

  // Initialize
  resizeCanvas();
  onScroll();
  loop();
  preloadAllFrames();
})();
