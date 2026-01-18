// Reduce Risk — lightweight interactions

(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // Smooth scroll for in-page links
  $$('.nav a[href^="#"], a.btn[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(!id || id.length < 2) return;
      const target = $(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', id);
    });
  });

  // Copy email button
  const copyBtn = $('#copyEmail');
  if(copyBtn){
    copyBtn.addEventListener('click', async ()=>{
      const email = copyBtn.getAttribute('data-email');
      try{
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Email copied';
        setTimeout(()=>copyBtn.textContent = 'Copy email', 1400);
      }catch{
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try{document.execCommand('copy');}catch{}
        ta.remove();
        copyBtn.textContent = 'Email copied';
        setTimeout(()=>copyBtn.textContent = 'Copy email', 1400);
      }
    });
  }

  // Set current year
  const y = $('#year');
  if(y) y.textContent = String(new Date().getFullYear());
})();
