(() => {
  const games = window.ZAMN_GAMES || [];
  const seen = new Set();
  document.querySelectorAll('.blog-games-grid .game-card').forEach(card => {
    const game = games.find(item => item.slug === card.dataset.gameSlug);
    if (!game || game.status !== 'متاحة الآن' || seen.has(game.slug)) {
      card.remove();
      return;
    }
    seen.add(game.slug);
    card.href = game.path;
    const image = card.querySelector('img');
    image.src = game.image;
    image.alt = game.name;
    card.querySelector('.game-title').textContent = game.name;
    const tags = card.querySelector('.game-tags');
    tags.replaceChildren();
    [game.questions || game.players, game.badge].filter(Boolean).forEach(text => {
      const tag = document.createElement('span');
      tag.className = 'game-tag';
      tag.textContent = text;
      tags.appendChild(tag);
    });
  });
})();
