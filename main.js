/* script.js */
const countdown = document.getElementById("countdown");
const weddingDate = new Date("April 25, 2026 15:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const d = weddingDate - now;

  const days = Math.floor(d / (1000*60*60*24));
  const hours = Math.floor((d % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((d % (1000*60*60))/(1000*60));
  const seconds = Math.floor((d % (1000*60))/1000);

  countdown.innerHTML = `
    <div><span>${days}</span> días</div>
    <div><span>${hours}</span> horas</div>
    <div><span>${minutes}</span> minutos</div>
    <div><span>${seconds}</span> segundos</div>
  `;
},1000);

const steps = document.querySelectorAll(".step");

window.addEventListener("scroll", () => {
  steps.forEach(step => {
    const top = step.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      step.classList.add("show");
    }
  });
});


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// CONFIGURACIÓN
const numberOfParticles = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(255, 220, 220, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// CREAR PARTÍCULAS
function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// ANIMACIÓN
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

// RESPONSIVE
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

