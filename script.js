const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(toggle){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
}

document.querySelectorAll('.faq-item').forEach(btn=>btn.addEventListener('click',()=>{
  const answer=btn.nextElementSibling;
  if(answer){
    answer.classList.toggle('open');
    const span = btn.querySelector('span');
    if(span){
      span.textContent=answer.classList.contains('open')?'⌃':'⌄';
    }
  }
}));

const track=document.querySelector('.gallery-track');
const prev=document.querySelector('.gallery-btn.prev');
const next=document.querySelector('.gallery-btn.next');
if(track&&prev&&next){
  prev.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth/2,behavior:'smooth'}));
  next.addEventListener('click',()=>track.scrollBy({left:track.clientWidth/2,behavior:'smooth'}));
}

const tabs=document.querySelectorAll('.tab');
const body=document.querySelector('#leaderBody');
if(tabs.length&&body){
  const base=[
    ['♛','SkyLegend_FF','245','1250','5620','₹5,000'],
    ['♜','DarkKing_Esports','210','1024','4820','₹3,000'],
    ['♜','Assassin_Vip','198','980','4450','₹2,000'],
    ['4','FireStorm_Clan','175','850','3920','₹1,500'],
    ['5','NightWolf_Booyah','160','780','3560','₹1,000']
  ];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    tab.classList.add('active');
    const multiplier={top:1,weekly:.44,monthly:.72,all:1.12}[tab.dataset.tab]||1;
    body.innerHTML=base.map((r,i)=>{
      const vals=r.slice();
      if(i>0){
        vals[2]=Math.round(+vals[2]*multiplier);
        vals[3]=Math.round(+vals[3]*multiplier);
        vals[4]=Math.round(+vals[4]*multiplier);
      }
      return `<tr><td>${vals[0]}</td><td>${vals[1]}</td><td>${vals[2]}</td><td>${vals[3]}</td><td>${vals[4]}</td><td>${vals[5]}</td></tr>`;
    }).join('');
  }));
}
