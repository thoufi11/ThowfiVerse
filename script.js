/* ======= PARTICLES ======= */
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for(let i = 0; i < 80; i++) particles.push({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    r: Math.random()*1.5+0.5, o: Math.random()*0.3+0.05
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = isDark ? `rgba(79,142,247,${p.o})` : `rgba(79,142,247,${p.o*0.5})`;
      ctx.fill();
    });
    particles.forEach((p,i) => {
      for(let j=i+1;j<particles.length;j++){
        const d = Math.hypot(p.x-particles[j].x,p.y-particles[j].y);
        if(d<120){
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle = isDark ? `rgba(79,142,247,${0.06*(1-d/120)})` : `rgba(79,142,247,${0.03*(1-d/120)})`;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ======= SCROLL EFFECTS ======= */
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ======= INTERSECTION OBSERVER ======= */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        b.style.width = b.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* ======= TYPING EFFECT ======= */
const roles = ['Software Developer', 'Machine Learning Enthusiast', 'Problem Solver', 'Mathematics Tutor', 'Lifelong Learner'];
let ri = 0, ci = 0, del = false;
function type(){
  const el = document.getElementById('typing-text');
  if(!el) return;
  const cur = roles[ri];
  if(!del){
    el.textContent = cur.slice(0, ++ci);
    if(ci === cur.length){ del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if(ci === 0){ del = false; ri = (ri+1)%roles.length; setTimeout(type, 400); return; }
  }
  setTimeout(type, del ? 60 : 90);
}
type();

/* ======= THEME TOGGLE ======= */
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

/* ======= MOBILE MENU ======= */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
function closeMobile(){ document.getElementById('mobile-menu').classList.remove('open'); }


/* ======= CONTACT FORM ======= */
function submitForm(e){
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.color = 'var(--blue)';
  msg.textContent = '⏳ Sending...';
  // Replace with EmailJS integration:
  // emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',e.target).then(...)
  setTimeout(()=>{
    msg.style.color = '#4ade80';
    msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
    e.target.reset();
    setTimeout(()=>msg.textContent='',4000);
  },1200);
}
