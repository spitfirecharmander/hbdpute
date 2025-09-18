const canvas = document.getElementById('confetti');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const header = document.querySelector('.header-banner');
    if (header) {
      canvas.width = header.clientWidth;
      canvas.height = header.clientHeight;
    }
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confetti = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    dx: Math.random() - 0.5,
    dy: Math.random() + 0.5
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = ['#2B308B', '#61BB47', '#FDA3AA', '#A2E86F'][Math.floor(Math.random()*4)];
      ctx.fill();
      c.x += c.dx;
      c.y += c.dy;
      if (c.y > canvas.height) c.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
const wishForm = document.getElementById('wishForm');
const wishInput = document.getElementById('wishInput');
const wishList = document.getElementById('wishList');

if (wishForm) {
  const savedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
  savedWishes.forEach(w => addWish(w));

  wishForm.addEventListener('submit', e => {
    e.preventDefault();
    const wish = wishInput.value.trim();
    if (!wish) return;
    addWish(wish);
    savedWishes.push(wish);
    localStorage.setItem('wishes', JSON.stringify(savedWishes));
    wishInput.value = '';
  });
}

function addWish(wish) {
  const li = document.createElement('li');
  li.textContent = wish;
  wishList.appendChild(li);
}
