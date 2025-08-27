const $ = (id) => document.getElementById(id);
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const statObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const num = entry.target;
    const to = parseFloat(num.dataset.countto || "0");
    let start = 0;
    const step = () => {
      start += (to - start) * 0.08 + 0.2;
      if (start >= to) { num.textContent = Math.round(to); }
      else { num.textContent = Math.floor(start); requestAnimationFrame(step); }
    };
    requestAnimationFrame(step);
    statObserver.unobserve(num);
  })
},{threshold:.5});
document.querySelectorAll('.stat-num').forEach(n=>statObserver.observe(n));
const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(btn=>{ btn.addEventListener('click', ()=>{ const id = btn.dataset.modal; const dlg = document.getElementById(id); dlg?.showModal(); }); });
document.querySelectorAll('[data-close]').forEach(btn=>{ btn.addEventListener('click', (e)=>{ const dlg = btn.closest('dialog'); dlg?.close(); })});
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ document.querySelectorAll('dialog[open]').forEach(d=>d.close()); } });
document.querySelectorAll('.card').forEach(card=>{ card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ const btn = card.querySelector('.open-modal'); btn?.click(); } }); });
