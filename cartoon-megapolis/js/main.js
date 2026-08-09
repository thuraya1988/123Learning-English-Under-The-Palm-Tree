import { Game } from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init().catch(err => {
    console.error('Fatal init error:', err);
    document.getElementById('loader-status').textContent = 'Error: ' + err.message;
  });
});