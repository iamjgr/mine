/**
 * loader.js — Neon progress bar boot sequence.
 * Calls onComplete() once the animation finishes and fades out.
 */

const MESSAGES = [
  'Loading assets...',
  'Parsing data...',
  'Initializing canvas...',
  'Almost ready...',
  'Portfolio ready.'
];

export function initLoader(onComplete) {
  const bar    = document.getElementById('loader-bar');
  const loader = document.getElementById('page-loader');
  const sub    = document.getElementById('loader-sub');

  if (!loader || !bar) { onComplete?.(); return; }

  let progress = 0;
  let msgIdx   = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';

    // Advance message at quarter-intervals
    const newMsgIdx = Math.min(
      MESSAGES.length - 1,
      Math.floor((progress / 100) * MESSAGES.length)
    );
    if (newMsgIdx !== msgIdx) {
      msgIdx = newMsgIdx;
      sub.textContent = '[ ' + MESSAGES[msgIdx] + ' ]';
    }

    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        loader.style.transition = 'opacity 0.55s ease';
        loader.style.opacity    = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          onComplete?.();
        }, 560);
      }, 300);
    }
  }, 70);
}
