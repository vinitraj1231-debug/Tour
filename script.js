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

// Tournament filter tabs
const tourneyTabs = document.querySelectorAll('.tourney-tab');
const tourneyCards = document.querySelectorAll('.tourney-card');
if (tourneyTabs.length && tourneyCards.length) {
  tourneyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tourneyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      tourneyCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox modal for gallery screenshots
const galleryImages = document.querySelectorAll('.gallery-track img');
if (galleryImages.length) {
  const modal = document.createElement('div');
  modal.id = 'galleryModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(4,3,11,0.92);backdrop-filter:blur(10px);z-index:999;display:none;align-items:center;justify-content:center;padding:20px;';

  const modalImg = document.createElement('img');
  modalImg.style.cssText = 'max-width:90%;max-height:85vh;border-radius:12px;border:2px solid #8b1ff7;box-shadow:0 0 35px rgba(139,31,247,0.5);object-fit:contain;';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'position:absolute;top:20px;right:25px;background:#6d13d1;color:#fff;border:none;border-radius:50%;width:38px;height:38px;font-size:20px;cursor:pointer;box-shadow:0 0 15px rgba(109,19,209,0.5);';

  modal.appendChild(modalImg);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);

  galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}
