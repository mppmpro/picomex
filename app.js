const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#service').value=a.dataset.service}));document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#name').value.trim();if(!name)return;const service=document.querySelector('#service').value;const detail=document.querySelector('#message').value.trim();const text=`Olá, equipe Padrão Internacional! Meu nome é ${name}.\n\nTenho interesse em: ${service}.\n${detail?'\nSobre minha operação: '+detail:''}`;window.open('https://wa.me/5512991636066?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')});

// Animations remain optional: all content is visible without JavaScript.
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const candidates=document.querySelectorAll('.hero-inner, .section-head, .service, .extra-services > div, .people-section > figure, .people-section > div, .reach > div:first-child, .essence-heading, .purpose-card, .essence-value, .timeline article, .faq-section > div, .contact > div, .contact form');
 let observer;
 if('IntersectionObserver' in window&&!reduced.matches){
  observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('pi-visible');observer.unobserve(entry.target)}})},{threshold:.08});
  candidates.forEach((el,i)=>{el.classList.add('pi-reveal','pi-pending');el.style.setProperty('--pi-delay',el.classList.contains('service')?((i%3)*90)+'ms':'0ms');observer.observe(el)});
 }
 const map=document.querySelector('#pi-map'),pause=document.querySelector('#map-pause');let paused=false;
 function sync(){if(!map||!pause)return;map.classList.toggle('pi-motion-paused',paused||reduced.matches);pause.disabled=reduced.matches;pause.setAttribute('aria-pressed',String(paused||reduced.matches));pause.textContent=reduced.matches?'Movimento reduzido ativado':paused?'Retomar animação do mapa':'Pausar animação do mapa'}
 if(pause)pause.addEventListener('click',()=>{paused=!paused;sync()});
 const onPreference=()=>{if(reduced.matches){if(observer)observer.disconnect();candidates.forEach(el=>el.classList.add('pi-visible'))}sync()};
 if(reduced.addEventListener)reduced.addEventListener('change',onPreference);sync();
})();
