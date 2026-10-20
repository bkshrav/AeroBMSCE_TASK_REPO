const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Spotlight follows the cursor inside each card
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

// 2. Count-up numbers and timeline reveal when they scroll into view
const seen = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el = entry.target;
  seen.unobserve(el);
  if (!el.dataset.count) return el.classList.add("in");
  const end = +el.dataset.count;
  let n = 0;
  const tick = () => { n += end / 40; el.textContent = Math.min(Math.round(n), end) + "+"; if (n < end) requestAnimationFrame(tick); };
  reduceMotion ? el.textContent = end + "+" : tick();
}), { threshold: 0.3 });
document.querySelectorAll("[data-count], .reveal").forEach(el => seen.observe(el));

// 3. Hero network: drifting nodes joined by lines, linking to the cursor
const canvas = document.getElementById("net");
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  const mouse = { x: -999, y: -999 };
  let nodes = [];
  const resize = () => {
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    nodes = Array.from({ length: Math.round(canvas.width / 18) }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5 }));
  };
  window.addEventListener("resize", resize); resize();
  canvas.parentElement.addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  const link = (a, b, max, alpha) => {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d > max) return;
    ctx.strokeStyle = `rgba(53,224,255,${alpha * (1 - d / max)})`;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  };
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((a, i) => {
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
      if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
      ctx.fillStyle = "rgba(53,224,255,.7)"; ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      for (let j = i + 1; j < nodes.length; j++) link(a, nodes[j], 120, .35);
      link(a, mouse, 180, .8);
    });
    requestAnimationFrame(draw);
  })();
}
