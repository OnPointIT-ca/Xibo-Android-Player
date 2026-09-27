(function () {
  'use strict';
  const message = document.getElementById('message');
  const identity = document.getElementById('identity');
  let player = null;
  let heartbeat = null;

  function android(method, ...args) {
    if (window.AndroidPlayer && typeof window.AndroidPlayer[method] === 'function') {
      window.AndroidPlayer[method](...args);
    }
  }
  window.addEventListener('error', event => android('playbackError', String(event.message || 'JavaScript error')));
  window.addEventListener('unhandledrejection', event => android('playbackError', String(event.reason || 'Unhandled rejection')));

  window.XiboHost = {
    async initialize(cmsUrl, displayId, displayName) {
      identity.textContent = `${displayName || displayId} · ${new URL(cmsUrl).hostname}`;
      if (!window.XiboPlayerSdk || typeof window.XiboPlayerSdk.createPlayer !== 'function') {
        message.textContent = 'Player SDK bundle is not installed';
        android('playbackError', 'Missing Xibo Player SDK bundle');
        return;
      }
      try {
        player = await window.XiboPlayerSdk.createPlayer({ cmsUrl, displayId, displayName });
        player.on('authorized', () => { message.textContent = 'Synchronizing…'; });
        player.on('playbackStarted', id => { document.getElementById('status').hidden = true; android('playbackStarted', String(id || '')); });
        player.on('error', error => android('playbackError', String(error)));
        await player.start();
        android('playerReady');
        heartbeat = setInterval(() => android('reportHealth'), 30000);
      } catch (error) { android('playbackError', String(error)); }
    },
    networkChanged(online) { if (player && player.networkChanged) player.networkChanged(Boolean(online)); },
    pause() { if (player && player.pause) player.pause(); },
    resume() { if (player && player.resume) player.resume(); },
    syncNow() { if (player && player.syncNow) player.syncNow(); }
  };
  window.addEventListener('pagehide', () => { clearInterval(heartbeat); if (player && player.destroy) player.destroy(); });
}());
