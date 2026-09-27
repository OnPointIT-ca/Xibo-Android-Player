# Xibo Android Player Host

Android 10+ fullscreen host for the open-source Xibo Player SDK, with HTTPS CMS setup, persistent identity, connectivity monitoring, managed kiosk operation, diagnostics, and WebView recovery.

## SDK prerequisite

The app is pinned to the upstream PWA distribution recorded in `app/src/main/assets/xiboplayer-pwa/UPSTREAM.json`. Deploy that distribution to the CMS at `/player/pwa/` before connecting the app. The vendored copy is the deployable artifact and license notice; the WebView loads the CMS-hosted copy because the PWA and CMS APIs require the same HTTPS origin for SOAP/REST, service-worker cache, XMR, screenshots, proof-of-play, and logs.

Setup requires the CMS HTTPS URL, CMS key, and optional display name. Long-press the player for diagnostics, retry, configuration, or reset.

## Build

With JDK 17 and Android SDK 35:

```bash
gradle --no-daemon lint test assembleDebug
```

Keep release signing credentials outside the repository and distribute through Managed Google Play or an MDM. See `docs/OPERATIONS.md` and `docs/COMPATIBILITY.md` before production rollout.
