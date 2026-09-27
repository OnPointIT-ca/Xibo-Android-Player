# Architecture and SDK integration

## Scope

This repository is the Android host for the open-source Xibo Player SDK. Android owns lifecycle,
connectivity signals, boot launch, fullscreen presentation, durable WebView storage, endpoint
validation, and renderer recovery. The SDK remains the sole owner of registration, XMDS/REST,
XMR, schedules, required files, caching, XLF rendering, statistics, and CMS logs. This boundary is
deliberate: implementing those protocols independently would conflict with the project's mandate
and risks producing an incompatible player.

The build environment used to create this baseline could not access GitHub (the proxy returned
HTTP 403), so no SDK API was guessed or copied. `app/src/main/assets/player/sdk/xibo-player.js` is a
documented distribution hook rather than a mock player. Before producing an APK, build the current
[`xiboplayer/xiboplayer`](https://github.com/xiboplayer/xiboplayer) browser distribution and adapt
its **actual public host API** in `bootstrap.js`. The adapter currently describes the deliberately
narrow contract expected by the host (`createPlayer`, lifecycle/network methods, and events); it
must be revised if the upstream API differs. An absent bundle produces an explicit on-screen and
native-log error and never pretends to register a display.

## Startup and recovery

1. A first-run screen accepts only an HTTPS CMS origin, normalizes it, and performs a bounded
   connectivity request before persisting it.
2. A stable locally generated display identifier and the endpoint are supplied to the WebView
   adapter. Registration credentials themselves belong to SDK-managed durable browser storage.
3. Validated network changes are forwarded without stopping playback. Cached playback is an SDK
   responsibility and WebView data is not deleted on reboot or renderer recreation.
4. A 30-second watchdog checks SDK heartbeats. After 90 seconds without a heartbeat while playback
   is expected, only the renderer is recreated. Internet loss alone does not trigger recovery.
5. A renderer-process death is handled and the WebView is destroyed and rebuilt. Activity teardown
   unregisters callbacks, timers, the JavaScript interface, and the WebView.

## Security

Cleartext traffic and mixed content are disabled. TLS verification uses Android defaults. File and
content access are disabled and top-level remote navigation is restricted to the configured CMS
host. The bridge exposes only typed playback lifecycle methods, bounds incoming strings, and never
offers arbitrary command execution. Release builds disable WebView debugging. No CMS secrets are
stored by native code or included in logs.

## Production checklist

* Pin and record a reviewed SDK release and its supported CMS/XMDS matrix.
* Build its browser bundle locally and add its license/notices; update the adapter against its real
  exports and initialization sequence.
* Run registration, authorization-without-restart, schedule, required-files, offline reboot, XMR,
  proof-of-play, screenshot, campaign/overlay, transitions, and multi-region tests against every
  supported CMS release.
* Validate HTML5 video on each target SoC. A native Media3 bridge should only be introduced if the
  upstream renderer provides a supported native-video hook.
* Provision true kiosk deployments with Android Enterprise Device Owner/lock task. Immersive mode
  alone cannot suppress every consumer-device system control.
* Distribute updates through Managed Google Play, an MDM, or a Device Owner flow; the player does
  not install APKs silently.

Screenshot support is intentionally deferred until the SDK's screenshot callback is known. WebView
capture also cannot reliably include a hardware-overlay video surface, so support must not be
reported to the CMS until end-to-end capture is verified on target hardware.
