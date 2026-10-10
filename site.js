const copyIcon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/></svg>';
async function copyLink(url){
 if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(url);return;}catch{}}
 const field=document.createElement('textarea');field.value=url;field.setAttribute('readonly','');field.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(field);field.select();let copied=false;try{copied=document.execCommand('copy');}finally{field.remove();}if(!copied)throw Error('Linket kunne ikke kopieres.');
}
try{
 const logos=window.channelLogos,list=document.getElementById('logo-list'),status=document.getElementById('load-status');
 for(const logo of logos){
  const card=document.createElement('div');card.className='logo-card';
  const a=document.createElement('a');a.href=logo.url;a.target='_blank';a.rel='noopener';a.download=logo.name+'.png';
  const image=document.createElement('img');image.src=logo.url;image.alt=logo.name;image.loading='lazy';if(logo.round)image.className='round-logo';a.append(image);
  const copy=document.createElement('button');copy.type='button';copy.className='copy-link';copy.innerHTML=copyIcon;copy.title='Kopiér link til '+logo.name;copy.setAttribute('aria-label',copy.title);
  copy.onclick=async()=>{try{await copyLink(new URL(logo.url,document.baseURI).href);copy.classList.add('copied');status.textContent='Link til '+logo.name+' er kopieret.';setTimeout(()=>copy.classList.remove('copied'),1600);}catch{status.textContent='Linket kunne ikke kopieres. Prøv igen.';}finally{copy.focus();}};
  card.append(a,copy);list.append(card);
 }
}catch{document.getElementById('load-status').textContent='Logoerne kunne ikke indlæses.';}
