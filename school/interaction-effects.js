/* Progressive enhancement shared by the school and its existing portals. */
(()=>{
  'use strict';
  if(window.multaqaInteractionEffects)return;
  window.multaqaInteractionEffects=true;
  const selector='button,a[href],summary,input[type="button"],input[type="submit"],input[type="reset"],[role="button"],[onclick],select';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible=new Set(), pulses=new WeakMap();
  let context=null,lastSound=0;
  function disabled(el){return el.matches(':disabled,[aria-disabled="true"]')||!!el.closest('[inert],[aria-disabled="true"]');}
  function eligible(el){
    if(!(el instanceof HTMLElement)||!el.matches(selector))return false;
    if(el.matches('html,body,form,dialog')||el.matches('.modal,.overlay,[role="dialog"],[aria-modal="true"]'))return false;
    // Backdrop handlers are not buttons. Do not decorate their whole panels.
    if(!el.matches('button,a,summary,input,select,[role="button"]')&&el.querySelector(selector))return false;
    return true;
  }
  function syncPulse(el){
    const old=pulses.get(el);
    if(reduced.matches||document.hidden||disabled(el)||!el.isConnected||!visible.has(el)){
      if(old){old.cancel();pulses.delete(el);}return;
    }
    if(old||!el.animate)return;
    // Separate Web Animation leaves the element's original CSS animations intact.
    const pulse=el.animate([
      {outlineColor:'rgba(199,144,32,.22)',outlineOffset:'2px'},
      {outlineColor:'rgba(199,144,32,.78)',outlineOffset:'4px'},
      {outlineColor:'rgba(199,144,32,.22)',outlineOffset:'2px'}
    ],{duration:2800,iterations:Infinity,easing:'ease-in-out'});
    pulses.set(el,pulse);
  }
  const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{if(isIntersecting)visible.add(target);else visible.delete(target);syncPulse(target);});
  },{threshold:.05}):null;
  function decorate(root){
    const items=[];
    if(root instanceof HTMLElement&&root.matches(selector))items.push(root);
    if(root.querySelectorAll)items.push(...root.querySelectorAll(selector));
    items.forEach(el=>{
      if(!eligible(el))return;
      if(el.classList.contains('mtq-control')){observer?.observe(el);return;}
      el.classList.add('mtq-control');
      if(!el.matches('button,a,summary,input,select')&&!el.hasAttribute('tabindex')){
        el.tabIndex=0;if(!el.hasAttribute('role'))el.setAttribute('role','button');
        el.dataset.mtqKeyboard='1';
      }
      if(observer)observer.observe(el);
    });
  }
  function sound(){
    const now=performance.now();if(now-lastSound<65)return;lastSound=now;
    try{
      if(localStorage.getItem('multaqa_click_sound')==='off')return;
    }catch(_){}
    try{
      const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;
      if(!context||context.state==='closed')context=new AudioCtx();
      if(context.state==='suspended')context.resume().catch(()=>{});
      const at=context.currentTime,osc=context.createOscillator(),gain=context.createGain();
      osc.type='sine';osc.frequency.setValueAtTime(620,at);osc.frequency.exponentialRampToValueAtTime(190,at+.065);
      gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.095,at+.004);gain.gain.exponentialRampToValueAtTime(.0001,at+.085);
      osc.connect(gain);gain.connect(context.destination);osc.start(at);osc.stop(at+.09);
      osc.onended=()=>{osc.disconnect();gain.disconnect();};
    }catch(_){}
  }
  document.addEventListener('click',event=>{
    if(!event.isTrusted)return;
    const el=event.target instanceof Element?event.target.closest(selector):null;
    if(!el||!eligible(el)||disabled(el))return;
    // One short pop per actual click, with no timers, looping or action interception.
    sound();
    if(!reduced.matches&&el.animate)el.animate([
      {scale:'1'},{scale:'.975'},{scale:'1'}
    ],{duration:180,easing:'ease-out'});
  },{capture:true,passive:true});
  document.addEventListener('keydown',event=>{
    const el=event.target;
    if(!el?.matches?.('[data-mtq-keyboard="1"]')||disabled(el)||event.repeat)return;
    if(event.key==='Enter'||event.key===' '){event.preventDefault();sound();el.click();}
  });
  function resync(){visible.forEach(el=>syncPulse(el));}
  reduced.addEventListener?.('change',resync);
  document.addEventListener('visibilitychange',resync);
  new MutationObserver(records=>{
    records.forEach(record=>{
      if(record.type==='attributes'){decorate(record.target);syncPulse(record.target);}
      record.addedNodes.forEach(node=>{if(node.nodeType===1)decorate(node);});
      record.removedNodes.forEach(node=>{
        if(node.nodeType!==1)return;
        const removed=[node,...node.querySelectorAll('.mtq-control')];
        removed.forEach(el=>{if(!el.isConnected){visible.delete(el);syncPulse(el);observer?.unobserve(el);}});
      });
    });
  }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','aria-disabled','onclick','href']});
  decorate(document);
})();
