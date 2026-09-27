# Deployment and operations

Copy `app/src/main/assets/xiboplayer-pwa/` to the CMS web root exposed as `/player/pwa/`. Preserve `sw-pwa.js`, hashed assets, the PDF worker, and license; serve it on the CMS HTTPS origin. Verify `/player/pwa/` and `/api/v2/player/health`, enroll with the CMS key, authorize the display, and schedule a test layout.

For offline acceptance, finish downloads, disconnect, force-stop, restart, and reboot. The last schedule must play. Reconnect, alter the schedule, and verify synchronization and exactly-once statistics. The upstream service worker and ContentStore own persistence, resume, integrity, and eviction.

Long-press for diagnostics. Reset removes configuration, hardware identity, localStorage, and IndexedDB. For true kiosk use, provision the package as Android Enterprise Device Owner through an MDM and allow-list lock task; the app enters it automatically. Immersive mode and the boot receiver are only best effort on unmanaged/vendor-restricted devices.

CI installs the pinned Gradle 8.11.1 distribution, verifies SDK files, and builds a debug APK. Inject release signing from CI/MDM secrets, increment app versions, execute `COMPATIBILITY.md`, archive all component versions, and distribute via Managed Google Play or MDM. Silent self-install is unsupported.
