(function(){
  document.addEventListener('click', function(e){
    var toggle = e.target.closest('[data-nav-toggle]');
    if(toggle){
      document.querySelector('.nav-links').classList.toggle('open');
    }
  });

  document.querySelectorAll('.screen').forEach(function(screen, si){
    var rows = 3, top = 32;
    for(var i=0;i<rows;i++){
      var r = document.createElement('div');
      r.className = 'mock-row';
      r.style.top = top + 'px';
      r.style.opacity = 0.9 - i*0.15;
      screen.appendChild(r);
      top += 22;
    }
    var block = document.createElement('div');
    block.className = 'mock-block';
    block.style.top = (top + 14) + 'px';
    block.style.bottom = '20px';
    screen.appendChild(block);
  });

  const params = new URLSearchParams(window.location.search);
  const initial = params.get('category') || 'all';

  const flags = document.querySelectorAll('.filter-flag');
  const cards = document.querySelectorAll('#app-grid .app-card');

  function applyFilter(cat){
    cards.forEach(card => {
      const cats = (card.dataset.category || '').trim().split(/\s+/);
      const match = cat === 'all' || cats.includes(cat);
      card.classList.toggle('hidden', !match);
    });
    flags.forEach(f => f.classList.toggle('active', f.dataset.cat === cat));
  }

  flags.forEach(flag => {
    flag.addEventListener('click', () => {
      const cat = flag.dataset.cat;
      const url = new URL(window.location);
      if (cat === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', cat);
      history.replaceState({}, '', url);
      applyFilter(cat);
    });
  });

  applyFilter(initial);
})();
