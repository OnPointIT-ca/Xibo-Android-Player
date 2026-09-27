# Architecture and SDK integration

Android owns setup, lifecycle, connectivity, boot, fullscreen/lock task, native configuration, endpoint validation, diagnostics, and renderer recovery. The pinned upstream Xibo PWA owns registration, XMDS/REST, XMR, schedules, files, ContentStore/service-worker caching, XLF rendering, screenshots, proof-of-play, and CMS logs.

The PWA executes from the CMS origin. The host seeds its documented per-CMS localStorage profile and navigates to `{cmsUrl}/player/pwa/`; it does not reproduce Xibo protocols. A narrow JavaScript interface reports readiness, observed playback, health, bounded console logs, and errors. Top-level navigation is restricted to the configured HTTPS host; mixed content and file/content access are disabled; release WebView debugging is off.

The lifecycle-aware watchdog covers initialization and playback, pauses with the activity, applies bounded exponential timeouts, recreates only the renderer, and escalates after three recoveries. Browser data survives normal recovery and is erased only by explicit reset. See `COMPATIBILITY.md` and `OPERATIONS.md` for qualification and deployment.
