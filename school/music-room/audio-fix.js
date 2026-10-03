/* Reliable WebAudio bootstrap for touch devices. Loaded before the music UI. */
(()=>{
  let ac,gain;const voices=new Map();
  function open(){if(!ac){const A=window.AudioContext||window.webkitAudioContext;if(!A)return;ac=new A({latencyHint:'interactive'});gain=ac.createGain();gain.gain.value=.78;gain.connect(ac.destination)}if(ac.state==='suspended')ac.resume()}
  function play(i,id){open();if(!ac)return;const f=261.63*Math.pow(2,(i-12)/12),o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.55,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+2.8);o.connect(g);g.connect(gain);o.start(t);o.stop(t+3);voices.set(id,{o,g})}
  function stop(id){const v=voices.get(id);if(!v)return;const t=ac.currentTime;v.g.gain.cancelScheduledValues(t);v.g.gain.setTargetAtTime(.0001,t,.08);try{v.o.stop(t+.35)}catch(e){}voices.delete(id)}
  document.addEventListener('pointerdown',e=>{const el=e.target.closest('.key');if(el)play(Number(el.dataset.i),'p'+el.dataset.i)},true);
  document.addEventListener('pointerup',e=>{const el=e.target.closest('.key');if(el)stop('p'+el.dataset.i)},true);
  window.addEventListener('keydown',e=>{if(e.repeat)return;const keys=['a','w','s','e','d','f','t','g','y','h','u','j','k','o','l'],i=keys.indexOf(e.key.toLowerCase());if(i>=0)play(i,'k'+i)},true);
  window.addEventListener('keyup',e=>{const keys=['a','w','s','e','d','f','t','g','y','h','u','j','k','o','l'],i=keys.indexOf(e.key.toLowerCase());if(i>=0)stop('k'+i)},true);
})();
