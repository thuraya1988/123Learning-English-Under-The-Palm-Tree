(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  const layers=[...document.querySelectorAll('.hero,.band')];
  let queued=false;
  const paint=()=>{
    layers.forEach(el=>{
      const box=el.getBoundingClientRect();
      const center=box.top+box.height/2-innerHeight/2;
      const speed=el.classList.contains('hero')?.12:.09;
      el.style.setProperty('--trial-parallax',(-center*speed)+'px');
    });
    queued=false;
  };
  addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(paint);queued=true}},{passive:true});
  addEventListener('resize',paint,{passive:true});
  paint();
})();
