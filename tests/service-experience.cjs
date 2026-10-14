const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');const html=fs.readFileSync('dist/index.html','utf8');
function el(dataset={}){const classes=new Set();return{dataset,hidden:false,value:'website',textContent:'',innerHTML:'',attrs:{},handlers:{},classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){this.handlers[k]=fn},focus(){document.activeElement=this},showModal(){this.open=true},close(){this.open=false},scrollIntoView(){},getBoundingClientRect(){return{left:10,right:100,top:10,bottom:100}}}}
const ids=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>['#'+m[1],el()]));ids.set('.moment-content',el());
const scenarios=[0,1,2].map(i=>el({scenario:String(i)})),people=['owner','team','client'].map(person=>el({person}));
const dialogNames=[...html.matchAll(/<dialog id="([^"]+)"/g)].map(m=>m[1]);const dialogs=dialogNames.map(name=>{const d=ids.get('#'+name);d.tagName='DIALOG';return d});const closes=dialogs.map(d=>{const b=el();b.closest=()=>d;return b});
const openers=[...html.matchAll(/data-open="([^"]+)"/g)].map(m=>el({open:m[1]}));
const document={activeElement:null,querySelector(s){if(s==='[data-person="owner"]')return people[0];assert.ok(ids.has(s),'Missing '+s);return ids.get(s)},querySelectorAll(s){const groups={'[data-scenario]':scenarios,'[data-person]':people,'[data-open]':openers,'[data-close]':closes,dialog:dialogs};assert.ok(s in groups,'Unknown selector '+s);return groups[s]},getElementById(id){return ids.get('#'+id)}};
const ctx=vm.createContext({document,navigator:{},matchMedia:()=>({matches:true}),setTimeout});vm.runInContext(fs.readFileSync('dist/app.js','utf8'),ctx);
assert.match(html,/<button[^>]*id="close-outcome"[^>]*aria-label="Close project overview"/);
for(let i=0;i<3;i++){
 scenarios[i].handlers.click();ids.get('#connect').handlers.click();assert.equal(ids.get('#outcome').hidden,false);assert.equal(document.activeElement,people[0]);
 for(const p of people){p.handlers.click();assert.ok(ids.get('#perspective-content').innerHTML.includes('<h2>'))}
 ids.get('#view-steps').handlers.click();assert.equal(ids.get('#steps-panel').hidden,false);assert.equal(ids.get('#view-steps').attrs['aria-expanded'],'true');
 ids.get('#close-outcome').handlers.click();assert.equal(ids.get('#outcome').hidden,true);assert.equal(ids.get('.moment-content').hidden,false);assert.equal(ids.get('#steps-panel').hidden,true);assert.equal(ids.get('#view-steps').attrs['aria-expanded'],'false');assert.equal(document.activeElement,ids.get('#connect'));assert.equal(scenarios[i].attrs['aria-pressed'],'true');
 ids.get('#connect').handlers.click();let prevented=false;ids.get('#outcome').handlers.keydown({key:'Escape',preventDefault(){prevented=true}});assert.ok(prevented);assert.equal(ids.get('#outcome').hidden,true);assert.equal(document.activeElement,ids.get('#connect'));
}
for(let i=0;i<dialogs.length;i++){dialogs[i].showModal();closes[i].handlers.click();assert.equal(dialogs[i].open,false)}
for(const opener of openers){opener.handlers.click();assert.equal(ids.get('#'+opener.dataset.open).open,true);ids.get('#'+opener.dataset.open).close()}
ids.get('#business-name').value='Example Company';for(const key of ['website','redesign','digital']){ids.get('#priority').value=key;ids.get('#priority').handlers.change();const outline=vm.runInContext('planText()',ctx);assert.ok(outline.includes('Example Company'));assert.ok(outline.includes('PROJECT OUTLINE'));assert.ok(!/\b(price|pricing|priced|costs?|budget|monthly)\b|plain English|jargon/i.test(outline))}
console.log('Passed: 3 services, 9 detail views, close/reopen, Escape, focus restoration, associated steps, all 4 modal close controls and 3 project outlines.');
