# SDK compatibility and acceptance matrix

| Component | Pin |
|---|---|
| Repository | `https://github.com/xiboplayer/xiboplayer` |
| Commit | `98eeb1b31ee776250f72d1e9cdcaab8385d7976d` |
| PWA | `0.7.24-oidc.0` |
| License | AGPL-3.0-or-later (included) |
| Build | Node 22+, pnpm 10.27.0, `pnpm --filter @xiboplayer/pwa build` |

Upstream advertises XMDS SOAP v3-v7 and REST Player API v2. Do not claim a CMS release compatible until it passes: registration and authorization without restart; schedules, campaigns, overlays, regions, transitions, widgets and media; interrupted/checksummed downloads; proof-of-play, logs, status, inventory, XMR commands and screenshots; offline process death/reboot and reconnection without duplicate stats; TLS, DNS, timeout, authentication, redirect, low-storage, renderer-crash and corrupt-cache cases.

Qualify representative ARM64 Android TV/signage SoCs on Android 10 through the target API at 1080p/4K and both orientations. Run a seven-day mixed-media soak and record memory, storage, temperature, decoder failures, WebView/firmware versions, recoveries, and statistics reconciliation.
