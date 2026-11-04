/* ESCAPEROOMS – offentlig spilportal med krypterede lærerguider. Ingen kode gemmes i offentlige filer. */
(()=>{'use strict';
const $=(sel,root=document)=>root.querySelector(sel);
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const app={rooms:[],teacherPass:'',unlocked:new Map(),guideId:null,loading:false};
const say=(sel,text)=>{const x=$(sel);if(x)x.textContent=text;};
function saveStatus(key,total){try{const raw=JSON.parse(localStorage.getItem(key)||'null');if(!raw?.started)return '';const done=Array.isArray(raw.solved)?raw.solved.length:0;return raw.finished?'✓ Færdigspillet':`${done}/${total} gåder løst`;}catch{return '';}}
function renderGames(){
 $('#libraryCount').textContent=`${String(app.rooms.length).padStart(2,'0')} ${app.rooms.length===1?'SPIL':'SPIL'} KLAR`;
 $('#libraryGrid').innerHTML=app.rooms.map((r,i)=>{const status=saveStatus(r.localSaveKey,r.puzzles);return `<article class="game-card"><a class="card-cover" href="${esc(r.url)}" aria-label="Spil ${esc(r.title)}"><img src="${esc(r.cover)}" alt="Illustration til ${esc(r.title)}" loading="lazy"><span class="cover-category">${esc(r.genre)}</span><span class="cover-index">${String(i+1).padStart(2,'0')}</span></a><div class="card-content"><div class="card-kicker">ESCAPE ROOM ${String(i+1).padStart(2,'0')}</div><h3>${esc(r.title)}</h3><p class="card-subtitle">${esc(r.subtitle)}</p><p class="card-description">${esc(r.description)}</p><div class="card-stats"><span><strong>${r.puzzles}</strong> gåder</span><span><strong>${r.areas}</strong> områder</span><span>${esc(r.tags?.slice(0,2).join(' · ')||'Udforskning')}</span></div><div class="card-actions"><a class="button button-gold" href="${esc(r.url)}">${status?'Fortsæt spillet':'Åbn spillet'} <span aria-hidden="true">↗</span></a>${status?`<span class="progress-caption">${esc(status)}</span>`:''}</div></div></article>`;}).join('');
}
function base64ToBytes(s){const bin=atob(s);const b=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);return b;}
async function decrypt(url,secret){
 if(!crypto?.subtle)throw Error('Sikker kryptering kræver HTTPS eller localhost.');
 const res=await fetch(url,{cache:'no-store'});if(!res.ok)throw Error('Guiden kunne ikke hentes ('+res.status+').');
 const payload=await res.json();if(payload.alg!=='AES-256-GCM'||payload.kdf!=='PBKDF2-SHA256'||payload.version!==1)throw Error('Ukendt krypteringsformat.');
 const norm=secret.toUpperCase().replace(/[^A-Z0-9]/g,'');
 const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(norm),'PBKDF2',false,['deriveKey']);
 const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:base64ToBytes(payload.salt),iterations:payload.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
 return await crypto.subtle.decrypt({name:'AES-GCM',iv:base64ToBytes(payload.iv)},key,base64ToBytes(payload.data));
}
async function startUnlock(e){e.preventDefault();if(app.loading)return;const phrase=$('#teacherCode').value.trim();if(!phrase)return;
 app.loading=true;$('#unlockButton').disabled=true;say('#unlockMessage','Kontrollerer adgangskoden ...');
 try{const first=app.rooms.find(r=>r.teacherGuide);if(!first)throw Error('Ingen lærerguider tilgængelige.');const bytes=await decrypt(first.teacherGuide,phrase);const guide=JSON.parse(new TextDecoder().decode(bytes));app.teacherPass=phrase;app.unlocked.set(first.id,guide);app.guideId=first.id;$('#unlockForm').hidden=true;$('.lock-crest').hidden=true;$('#teacherUnlocked').hidden=false;renderTeacher();say('#unlockMessage','');}
 catch(err){console.warn('Unlock failure:',err.message);say('#unlockMessage',err.name==='OperationError'?'Koden er ikke korrekt. Prøv igen.':err.message);}
 finally{app.loading=false;$('#unlockButton').disabled=false;}
}
function lockTeacher(){app.teacherPass='';app.guideId=null;app.unlocked.clear();$('#teacherUnlocked').hidden=true;$('#unlockForm').hidden=false;$('.lock-crest').hidden=false;$('#teacherCode').value='';say('#unlockMessage','');}
async function selectGuide(id){const r=app.rooms.find(r=>r.id===id);if(!r)return;app.guideId=id;if(!app.unlocked.has(id)){
  try{const b=await decrypt(r.teacherGuide,app.teacherPass);app.unlocked.set(id,JSON.parse(new TextDecoder().decode(b)));}catch(e){alert('Guiden kunne ikke åbnes. '+e.message);return;}}
 renderTeacher();}
function matches(p,query){return [p.title,p.story,p.prompt,p.clue,p.walkthrough,p.answer,p.id].some(t=>String(t||'').toLocaleLowerCase('da').includes(query));}
function renderPuzzles(){const guide=app.unlocked.get(app.guideId);const search=($('#guideSearch')?.value||'').trim().toLocaleLowerCase('da');const areas=guide.rooms.map((room,i)=>{
 const filtered=room.puzzles.filter(p=>matches(p,search));if(!filtered.length)return '';
 return `<details class="guide-area" ${search||i===0?'open':''}><summary><span>${String(i+1).padStart(2,'0')} / ${esc(room.name)}</span><span>${filtered.length} gåder</span></summary><div class="guide-area-content"><div class="guide-note"><strong>${esc(room.note.title)}</strong> – ${esc(room.note.text)}</div>${filtered.map((p,j)=>`<article class="guide-puzzle"><div class="guide-index">${esc(p.id.toUpperCase())} · ${esc(p.kind)} ${p.gate?'· OMRÅDETS LÅS':''}</div><h4>${esc(p.title)}</h4><p><strong>Opgaven:</strong> ${esc(p.story)}</p><p><strong>Sporet:</strong> ${esc(p.clue)}</p><p><strong>Det skal eleverne gøre:</strong> ${esc(p.prompt)}</p>${p.needs?.length?`<p class="guide-pill">Kræver: ${esc(p.needs.join(', '))}</p>`:''}<div class="guide-answer"><strong>Løsning:</strong> ${esc(p.walkthrough)}${p.reward?`<br><strong>Belønning:</strong> ${esc(p.reward)}`:''}</div><div class="guide-pill">Hints – præcis som i elevspillet</div><ol class="guide-hints">${p.hints.map((h,k)=>`<li><strong>Hint ${k+1}:</strong> ${esc(h)}</li>`).join('')}</ol></article>`).join('')}</div></details>`;
 }).join('');
 $('#guideAreas').innerHTML=areas||'<p class="guide-error">Ingen gåder matcher søgningen.</p>';
}
function renderTeacher(){const guide=app.unlocked.get(app.guideId);const room=app.rooms.find(r=>r.id===app.guideId);
 $('#teacherUnlocked').innerHTML=`<div class="teacher-dashboard"><div class="teacher-topline"><h3>Velkommen til lærerværelset</h3><button class="text-action" id="teacherLock">Lås igen <span aria-hidden="true">⌑</span></button></div><p class="teacher-help">Vælg et spil for at se alle gåder, spor, løsninger og hints. Guiden er kun synlig, mens du er låst op.</p><div class="teacher-game-nav">${app.rooms.map(r=>`<button type="button" class="${r.id===app.guideId?'active':''}" data-guide="${esc(r.id)}">${esc(r.title)}</button>`).join('')}</div><div class="guide-summary"><strong>${esc(guide.title)} · Walkthrough</strong><span>${esc(guide.subtitle)} · ${guide.rooms.reduce((n,r)=>n+r.puzzles.length,0)} gåder · ${guide.rooms.length} områder</span><span>${esc(guide.timeHint)}</span></div><div class="guide-controls"><input type="search" id="guideSearch" placeholder="Søg efter en gåde, et spor eller en kode …" aria-label="Søg i walkthrough"><button class="button button-outline" id="downloadGuide" type="button">↓ Download PDF</button><button class="button button-outline" id="printGuide" type="button">Udskriv guiden</button></div><div id="guideAreas" aria-live="polite"></div><p class="teacher-help">${esc(guide.footer)}</p></div>`;
 $('#teacherLock').addEventListener('click',lockTeacher);
 document.querySelectorAll('[data-guide]').forEach(b=>b.addEventListener('click',()=>selectGuide(b.dataset.guide)));
 $('#guideSearch').addEventListener('input',renderPuzzles);
 $('#downloadGuide').addEventListener('click',downloadGuide);
 $('#printGuide').addEventListener('click',()=>{document.querySelectorAll('.guide-area').forEach(d=>d.open=true);window.print();});
 renderPuzzles();
}
async function downloadGuide(){const r=app.rooms.find(r=>r.id===app.guideId);const btn=$('#downloadGuide');if(!r?.teacherPdf)return;btn.disabled=true;btn.textContent='Åbner PDF ...';try{const pdf=await decrypt(r.teacherPdf,app.teacherPass);const blob=new Blob([pdf],{type:'application/pdf'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${r.id.toUpperCase()}_Laererguide_Walkthrough.pdf`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}catch(err){alert('PDF kunne ikke åbnes: '+err.message);}finally{btn.disabled=false;btn.textContent='↓ Download PDF';}}
async function init(){try{const res=await fetch('rooms.json',{cache:'no-store'});if(!res.ok)throw Error('Spilkatalog ikke fundet.');const data=await res.json();app.rooms=data.rooms||[];renderGames();}catch(err){$('#libraryGrid').innerHTML=`<div class="error-card">Spillene kunne ikke hentes. Åbn hjemmesiden via GitHub Pages (eller en lokal webserver), ikke direkte som en fil. ${esc(err.message)}</div>`;say('#libraryCount','KAN IKKE HENTE SPIL');}
 $('#unlockForm').addEventListener('submit',startUnlock);
 document.querySelectorAll('.primary-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.primary-nav a').forEach(b=>b.classList.remove('active'));a.classList.add('active');}));
}
init();
})();
