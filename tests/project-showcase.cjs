const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
function element(dataset={}){return{dataset,attrs:{},handlers:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,f){this.handlers[k]=f},showModal(){this.open=true},close(){this.open=false},focus(){this.focused=true},scrollIntoView(){this.scrolled=true}}}
const ids=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>['#'+m[1],element()]));
const screens=['home','guide','booking'].map(screen=>element({screen}));const chapters=['home','guide','booking'].map(project=>element({project}));
const document={querySelector(s){assert.ok(ids.has(s),'Missing '+s);return ids.get(s)},querySelectorAll(s){if(s==='[data-screen]')return screens;if(s==='[data-project]')return chapters;throw Error(s)}};
vm.runInNewContext(fs.readFileSync('dist/connections.js','utf8'),{document,matchMedia:()=>({matches:true})});
function selected(key){assert.equal(screens.find(s=>s.dataset.depth==='front').dataset.screen,key);assert.equal(chapters.find(s=>s.attrs['aria-pressed']==='true').dataset.project,key);assert.equal(screens.filter(s=>s.attrs['aria-pressed']==='true').length,1)}
selected('home');
for(const key of ['guide','booking','home']){chapters.find(s=>s.dataset.project===key).handlers.click();selected(key);ids.get('#enlarge-project').handlers.click();assert.equal(ids.get('#project-lightbox').open,true);assert.ok(ids.get('#project-large').src.includes('tangora-'+key+'.jpg'));assert.equal(ids.get('#project-live').href,key==='booking'?'https://www.tangora.com.au/book-cleaner':'https://www.tangora.com.au/');}
ids.get('#project-previous').handlers.click();selected('booking');ids.get('#project-next').handlers.click();selected('home');
let prevented=false;ids.get('#project-deck').handlers.keydown({key:'ArrowRight',preventDefault(){prevented=true}});selected('guide');assert.ok(prevented);
screens[2].handlers.click();selected('booking');assert.equal(ids.get('#project-selected-live').href,'https://www.tangora.com.au/book-cleaner');
ids.get('#plan-meeting').handlers.click();assert.equal(ids.get('#blueprint').open,false);assert.equal(ids.get('#begin-scheduling').focused,true);
console.log('Passed: three screen/chapter selections, wraparound arrows, keyboard navigation, correct full-view images and live URLs, preserved meeting handoff.');
