// LOADER
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2100);
});

// CURSOR
const cur = document.getElementById('cursor');
const cf  = document.getElementById('cf');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px'; cur.style.top = my+'px';
});
(function loop(){ fx+=(mx-fx)*.12; fy+=(my-fy)*.12; cf.style.left=fx+'px'; cf.style.top=fy+'px'; requestAnimationFrame(loop); })();
document.querySelectorAll('a,button,.f-btn,.cert-btn,.c-dot').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.classList.add('h'); cf.classList.add('h'); });
  el.addEventListener('mouseleave',()=>{ cur.classList.remove('h'); cf.classList.remove('h'); });
});

// NAVBAR
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', onScroll);
function onScroll(){
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);

  // Active link
  let cur2='';
  sections.forEach(s=>{ if(window.scrollY >= s.offsetTop-220) cur2=s.id; });
  navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')==='#'+cur2));

  // Reveal
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-80) el.classList.add('in');
  });

  // Skill bars
  document.querySelectorAll('.bar-fill').forEach(b=>{
    if(b.getBoundingClientRect().top < window.innerHeight-40 && !b.dataset.done){
      b.dataset.done='1'; b.style.width = b.dataset.w+'%';
    }
  });
}
window.dispatchEvent(new Event('scroll'));

// BACK TOP
document.getElementById('back-top').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

// HAMBURGER
const ham = document.getElementById('hamburger');
const nl  = document.getElementById('nav-list');
ham.addEventListener('click',()=>{
  const open = nl.classList.toggle('open');
  const sp = ham.querySelectorAll('span');
  sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  sp[1].style.opacity   = open ? '0' : '';
  sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nl.classList.remove('open');
  ham.querySelectorAll('span').forEach(s=>{ s.style.transform=''; s.style.opacity=''; });
}));

// TYPEWRITER
const roles = ['Web Developer','UI/UX Designer','Python Developer','Creative Coder'];
let ri=0,ci=0,del=false;
const rtEl = document.getElementById('role-typed');
function type(){
  const w=roles[ri];
  del ? (rtEl.textContent=w.slice(0,--ci)) : (rtEl.textContent=w.slice(0,++ci));
  if(!del && ci===w.length){ del=true; setTimeout(type,1800); return; }
  if(del && ci===0){ del=false; ri=(ri+1)%roles.length; }
  setTimeout(type, del?55:105);
}
type();

// PROJECT FILTER
document.querySelectorAll('.f-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.proj-card').forEach(c=>{
      const show = f==='all'||c.dataset.cat===f;
      c.style.opacity='0'; c.style.transform='translateY(20px)';
      setTimeout(()=>{
        c.classList.toggle('hidden',!show);
        if(show){ requestAnimationFrame(()=>{ c.style.opacity='1'; c.style.transform='translateY(0)'; }); }
      },200);
    });
  });
});

// CERT SLIDER
const track = document.getElementById('cert-track');
const slides = track.querySelectorAll('.cert-slide');
const dotsC  = document.getElementById('cert-dots');
const VIS = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3;
let idx=0, maxI=slides.length-VIS;

slides.forEach((_,i)=>{ if(i<=maxI){ const d=document.createElement('div'); d.className='c-dot'+(i===0?' active':''); d.addEventListener('click',()=>goTo(i)); dotsC.appendChild(d); } });

function goTo(i){
  idx=Math.max(0,Math.min(i,maxI));
  const w=slides[0].offsetWidth+20;
  track.style.transform=`translateX(-${idx*w}px)`;
  document.querySelectorAll('.c-dot').forEach((d,di)=>d.classList.toggle('active',di===idx));
}
document.getElementById('cert-next').addEventListener('click',()=>goTo(idx+1));
document.getElementById('cert-prev').addEventListener('click',()=>goTo(idx-1));
setInterval(()=>goTo(idx>=maxI?0:idx+1),4200);
