# Project: Android Xibo-Compatible Digital Signage Player

You are a senior Android, TypeScript/JavaScript, WebView, and digital-signage engineer.

Your task is to design and implement a production-ready Android digital signage player that connects to an existing Xibo CMS and uses the open-source Xibo Player SDK wherever possible.

Repository:

https://github.com/xiboplayer/xiboplayer

Do not attempt to reverse-engineer, decompile, reproduce, or copy Xibo's proprietary commercial Android Player.

The objective is to create an independent Android application that uses the open-source Xibo Player SDK and documented Xibo CMS interfaces to provide Xibo-compatible digital signage playback.

---

# 1. PRIMARY OBJECTIVE

Build an Android APK that can:

1. Start on an Android device or Android TV.
2. Allow the user to configure a Xibo CMS URL.
3. Register the display with the CMS.
4. Obtain and maintain its display identity/credentials.
5. Appear in the Xibo CMS as a display awaiting authorization.
6. Detect when the display has been authorized.
7. Retrieve schedules and required files.
8. Download required media.
9. Cache media locally.
10. Render Xibo layouts.
11. Play scheduled content continuously.
12. Continue operating while offline.
13. Reconnect automatically when connectivity returns.
14. Receive XMR/realtime commands where supported.
15. Submit statistics/proof-of-play.
16. Submit logs/status information.
17. Support CMS screenshot requests where possible.
18. Automatically recover from crashes, rendering failures, network failures, and media errors.
19. Run reliably for weeks or months without user interaction.
20. Operate as a dedicated fullscreen/kiosk digital-signage player.

Reliability is more important than UI complexity.

---

# 2. FIRST STEP: ANALYZE THE SDK

Before implementing the Android application, inspect the current Xibo Player SDK repository and its documentation.

Determine:

- Current package structure
- Build system
- Supported Xibo CMS versions
- Supported XMDS versions
- REST functionality
- XMR implementation
- XLF/layout rendering implementation
- Schedule engine
- Required-files handling
- Download/cache implementation
- Statistics/proof-of-play
- Logging
- Screenshots
- Display settings
- Campaign support
- Overlay support
- Transition support
- Widget support
- Video implementation
- Browser requirements
- Persistent-storage requirements
- APIs exposed to host applications
- Initialization sequence
- Required configuration
- Known limitations

Do not invent SDK APIs.

Use the actual current SDK interfaces.

If this specification conflicts with the current SDK API, adapt the implementation to the SDK while preserving the intended behavior.

Document important architectural decisions.

---

# 3. TARGET PLATFORM

Primary:

- Android signage boxes
- Android TV
- Android 10+
- ARM64 preferred
- Landscape displays
- 1920x1080 primary target

The architecture should not unnecessarily prevent:

- 4K output
- portrait orientation
- tablets
- touch displays
- other resolutions

Use adaptive rendering rather than hard-coded 1920x1080 coordinates.

---

# 4. TECHNOLOGY STACK

Use:

## Android

- Kotlin
- Android Studio / Gradle
- AndroidX
- Coroutines
- WorkManager where appropriate
- foreground services only where justified by Android requirements
- WebView
- Room/DataStore when native persistence is required

Prefer modern Android APIs.

Avoid obsolete APIs unless necessary for compatibility.

## Player

Use the Xibo Player SDK for as much Xibo-specific functionality as it supports.

The SDK should remain responsible for functionality such as:

- CMS communication
- XMDS
- REST calls
- XMR
- scheduling
- XLF interpretation
- layout rendering
- media management
- statistics

Do not duplicate SDK functionality unnecessarily.

The Android application should primarily act as the native host/runtime.

---

# 5. ARCHITECTURE

Use a clean layered architecture approximately resembling:

Android Application

    UI / Configuration
            |
    Player Controller
            |
    Android <-> JS Bridge
            |
    WebView Runtime
            |
    Xibo Player SDK
            |
    XMDS / REST / XMR
            |
        Xibo CMS

Native Android components should handle:

- application lifecycle
- WebView lifecycle
- kiosk/fullscreen behavior
- boot launch
- Android networking state
- power management
- screen state
- local Android configuration
- permissions
- storage integration
- crash recovery
- WebView recovery
- watchdog functionality
- device information
- app updates where later implemented

The Xibo SDK should handle Xibo-specific behavior wherever supported.

Maintain strict separation between:

1. Android platform logic
2. player orchestration
3. SDK integration
4. CMS communication
5. rendering

---

# 6. PROJECT STRUCTURE

Create a maintainable project structure.

For example:

app/
  src/main/java/.../

    MainActivity.kt

    player/
      PlayerController.kt
      PlayerState.kt
      PlayerLifecycleManager.kt

    webview/
      PlayerWebView.kt
      PlayerWebViewClient.kt
      PlayerChromeClient.kt
      JavascriptBridge.kt

    cms/
      CmsConfiguration.kt
      DisplayRegistrationManager.kt

    kiosk/
      KioskManager.kt
      BootReceiver.kt

    network/
      NetworkMonitor.kt

    storage/
      PlayerPreferences.kt

    diagnostics/
      PlayerLogger.kt
      CrashRecoveryManager.kt
      WatchdogManager.kt

  src/main/assets/player/

    index.html
    bootstrap.js
    sdk/
    styles/

The final structure should follow actual implementation requirements rather than blindly following this example.

---

# 7. FIRST-RUN EXPERIENCE

On first launch, show a minimal setup screen.

Fields:

- CMS URL

Optional advanced fields:

- display name
- CMS key/secret if required by the current SDK/protocol
- proxy configuration
- debugging mode

Provide:

"Connect"

Validate the CMS URL.

Normalize URLs safely.

Test connectivity.

Do not silently accept invalid CMS endpoints.

After configuration, begin registration.

---

# 8. DISPLAY REGISTRATION

Implement the Xibo registration process using the SDK/documented CMS protocol.

Expected experience:

Player starts.

↓

CMS URL configured.

↓

Player contacts CMS.

↓

Display registration initiated.

↓

Display appears in Xibo CMS.

↓

Screen shows:

"Waiting for display authorization"

Include useful information such as:

- display/device identifier
- CMS hostname
- connection state

↓

Administrator authorizes display in CMS.

↓

Player detects authorization.

↓

Configuration/schedule synchronization begins.

Do not require restarting the application after authorization.

Store display identity securely and persistently.

The player must not register as a new display every time it starts.

---

# 9. PLAYER STATE MACHINE

Implement an explicit state machine.

Example states:

UNCONFIGURED

CONNECTING

REGISTERING

WAITING_FOR_AUTHORIZATION

SYNCING

DOWNLOADING

READY

PLAYING

OFFLINE_PLAYING

ERROR_RECOVERABLE

ERROR_FATAL

Transitions must be deterministic and logged.

The UI should be able to expose the current state for diagnostics.

---

# 10. SCHEDULE SYNCHRONIZATION

Use the SDK's scheduling implementation.

The player must periodically synchronize:

- schedule
- layouts
- campaigns
- overlays
- required media
- display settings

Do not continuously hammer the CMS.

Use the synchronization intervals provided by the CMS/SDK where applicable.

Schedule changes should eventually take effect without restarting the player.

---

# 11. REQUIRED FILES

Implement proper required-file synchronization.

The system must:

1. Request required files.
2. Compare them against the local cache.
3. Download missing files.
4. Detect changed files.
5. Validate completed downloads.
6. Avoid unnecessary downloads.
7. Retry failed downloads.
8. Handle interrupted downloads.
9. Prevent partial files from being treated as valid.
10. remove obsolete cached data according to an appropriate cache policy.

Where supported, validate:

- file size
- checksum/hash
- revision/version

Downloads should occur asynchronously without blocking playback.

---

# 12. LOCAL MEDIA CACHE

Digital signage must not depend on continuous Internet connectivity.

Maintain a persistent local media cache.

A reboot must not erase downloaded media.

The player should be capable of:

Internet available

    Sync CMS
    Download media
    Cache schedule
    Play content

Internet unavailable

    Load cached schedule
    Load cached layouts
    Load cached media
    Continue playback

Internet restored

    Reconnect
    Sync changes
    Download updates
    Continue playback

Do not replace a known-good cached schedule with incomplete or corrupted synchronization data.

---

# 13. LAYOUT RENDERING

Use the SDK's XLF/layout renderer.

Support multiple regions.

Each region should operate independently according to Xibo layout semantics.

Example:

+--------------------------------------------+
|                    Header                  |
+----------------------------+---------------+
|                            |               |
|         Main Video         | Sidebar       |
|                            |               |
|                            |               |
+----------------------------+---------------+
|                    Footer                  |
+--------------------------------------------+

Correctly handle:

- region coordinates
- dimensions
- z-index
- duration
- media sequencing
- transitions
- backgrounds
- aspect ratios

Rendering must scale correctly to the actual display resolution.

---

# 14. MEDIA TYPES

Prioritize compatibility in this order.

Phase 1:

- images
- video
- text
- basic HTML

Phase 2:

- web pages
- PDFs
- ticker/text widgets
- clock/date widgets
- embedded HTML widgets

Phase 3:

- datasets
- RSS
- weather
- advanced widgets
- dynamic content
- interactive content where feasible

Use SDK implementations when available.

Do not create incompatible alternative widget semantics.

---

# 15. VIDEO

Video playback is critical.

Investigate how the SDK expects video to be rendered.

Determine whether video should use:

- HTML5 video inside WebView

or

- native Android Media3/ExoPlayer integration

If native playback provides substantial reliability/performance benefits, design an Android/JavaScript bridge allowing the SDK renderer to request native video playback.

Requirements:

- local cached video
- streaming where required
- mute/audio
- looping
- duration handling
- aspect ratio
- autoplay
- cleanup after playback
- hardware decoding where available
- graceful recovery from decoder errors

Avoid memory leaks from repeatedly creating video players.

---

# 16. WEBVIEW

Configure WebView specifically for long-running signage.

Requirements may include:

- JavaScript
- DOM storage
- local storage
- IndexedDB
- media autoplay
- local cached assets
- WebSocket support
- appropriate mixed-content policy if required
- debugging in development builds
- debugging disabled in release builds

Do not disable Android security protections unnecessarily.

Prevent arbitrary navigation from escaping the signage environment.

Handle renderer-process crashes.

If the WebView renderer dies:

1. record the failure
2. destroy the broken WebView
3. create a new WebView
4. reload the player runtime
5. resume playback

The entire application should not require manual intervention.

---

# 17. JAVASCRIPT BRIDGE

Implement a narrow, explicit Android/JavaScript interface.

Possible functions:

Android -> JS

- initializePlayer()
- networkChanged()
- pausePlayer()
- resumePlayer()
- reloadPlayer()
- requestScreenshot()

JS -> Android

- playerReady()
- playbackStarted()
- playbackError()
- log()
- reportHealth()
- requestNativeVideo()
- reportCurrentLayout()

Only expose bridge functions actually required.

Do not expose a generic arbitrary native command executor to JavaScript.

Validate bridge parameters.

---

# 18. XMR

Where supported by the SDK, implement XMR realtime communication.

Handle relevant commands such as:

- collect now
- screenshot
- reconfigure
- reload
- status
- commands supported by the SDK/CMS

XMR failure must not stop normal playback.

If XMR disconnects:

- continue playing
- reconnect using bounded exponential backoff
- fall back to normal polling/synchronization

---

# 19. PROOF OF PLAY / STATISTICS

Implement statistics using SDK-supported behavior.

Track appropriate information such as:

- layout
- media
- start time
- end time
- duration
- display

Queue statistics locally.

Upload asynchronously.

If Internet access disappears, statistics must remain queued.

When connectivity returns, upload pending records without creating duplicates.

Avoid unbounded local database growth.

---

# 20. LOGGING

Implement structured logs.

Levels:

DEBUG

INFO

WARNING

ERROR

CRITICAL

Record important events such as:

- startup
- registration
- authorization
- CMS sync
- downloads
- schedule changes
- layout changes
- media failures
- XMR connectivity
- WebView failures
- crashes
- recovery events

Do not log credentials or secrets.

Where supported, send relevant logs to Xibo CMS.

---

# 21. SCREENSHOTS

Support CMS-requested screenshots if feasible with the SDK.

A screenshot should represent the signage output rather than configuration UI.

Handle WebView and native-video surfaces appropriately.

If Android prevents a reliable screenshot for a particular rendering mode, document the limitation rather than pretending it works.

---

# 22. NETWORK MANAGEMENT

Monitor connectivity using Android networking APIs.

Handle:

- Ethernet
- Wi-Fi
- Internet loss
- captive/invalid Internet
- interface changes
- CMS unreachable
- DNS failure
- temporary TLS errors

Playback must not stop simply because the CMS becomes unreachable.

Use bounded exponential backoff for repeated failures.

Example concept:

5 seconds

15 seconds

30 seconds

1 minute

2 minutes

5 minutes

Do not create tight retry loops.

---

# 23. BOOT

Support launching the signage player after device boot where Android/device policy permits it.

Implement:

BOOT_COMPLETED receiver

↓

Initialize application

↓

Load existing configuration

↓

Initialize SDK

↓

Load cached schedule immediately

↓

Begin CMS synchronization

↓

Enter fullscreen playback

The player should prioritize cached playback rather than waiting for Internet synchronization before displaying content.

---

# 24. KIOSK MODE

Provide dedicated-signage behavior.

Hide:

- status bar
- navigation UI where permitted
- action bars
- unnecessary system chrome

Use Android immersive mode.

Also document stronger kiosk options using:

- Device Owner
- Lock Task Mode
- Android Enterprise dedicated-device APIs

Do not assume ordinary consumer Android installations can suppress every system control.

---

# 25. SCREEN / POWER MANAGEMENT

During signage operation:

- keep display awake
- prevent application-induced sleep
- avoid unnecessary CPU wake locks
- respect Android lifecycle requirements

If the application becomes foreground again, playback should resume correctly.

---

# 26. WATCHDOG

Implement application-level health monitoring.

Monitor signals such as:

- WebView alive
- SDK heartbeat
- playback progress
- current layout
- last successful CMS contact
- renderer responsiveness

Do not restart merely because the Internet is unavailable.

Example:

Every 30 seconds:

    check player heartbeat

If playback should be active and heartbeat is stale:

    attempt renderer recovery

If recovery fails repeatedly:

    recreate WebView

If that fails:

    restart player activity/runtime

Use escalating recovery rather than immediately restarting the application.

Avoid restart loops.

---

# 27. CRASH RECOVERY

The application should recover automatically from:

- WebView renderer crash
- JavaScript exception
- corrupted temporary download
- network exception
- media decoder error
- XMR disconnect
- CMS timeout
- invalid layout
- missing media

One broken media item should not permanently stop an entire display.

Record failures and continue where safely possible.

---

# 28. STORAGE MANAGEMENT

Monitor local storage.

Implement cache cleanup.

Never allow stale cache files or logs to consume all available storage.

Protect currently required media from cleanup.

Establish configurable limits for:

- logs
- temporary downloads
- old media
- diagnostics
- statistics queues

---

# 29. SETTINGS

Create a hidden/admin-accessible settings screen.

Include:

CMS URL

Display ID

CMS connection status

Authorization status

Last synchronization

Last successful CMS contact

Current layout

Current schedule

Cache size

Free storage

XMR state

App version

SDK version

Device information

Actions:

- Sync now
- Reload player
- Clear temporary cache
- Restart renderer
- View logs
- Re-register display

Re-registration must require explicit confirmation because it can change display identity.

---

# 30. DIAGNOSTIC OVERLAY

Implement an optional developer overlay.

Example:

Player: PLAYING

CMS: Connected

XMR: Connected

Layout: 37

Media: 108

FPS: 60

Cache: 1.4 GB

Last Sync: 14:32:16

Network: Ethernet

WebView: Healthy

This overlay must be disabled by default in production.

---

# 31. SECURITY

Treat the CMS as a remote trusted service but still follow defensive application design.

Requirements:

- HTTPS support
- proper TLS certificate validation
- no plaintext credential logging
- secure credential storage
- minimal JavaScript bridge
- sanitize/validate bridge parameters
- no unnecessary exported Android components
- least-privilege permissions
- secure WebView configuration

Do not bypass certificate verification to "make it work."

Development builds may have explicitly enabled diagnostic options that are absent from production builds.

---

# 32. CONFIGURATION PERSISTENCE

Persist important state safely.

Examples:

- CMS URL
- display identity
- authorization state
- SDK configuration
- synchronization metadata
- local schedule
- cache index

Application upgrades must preserve registration and cached media where possible.

---

# 33. APPLICATION UPDATES

Design the architecture so application updates can later be added.

Do not implement an unsafe silent APK installer.

For managed signage devices, document potential future mechanisms such as:

- Managed Google Play
- Android Enterprise
- MDM
- Device Owner update flows

Keep update functionality separate from playback.

---

# 34. ORIENTATION AND RESOLUTION

Support:

- landscape
- portrait
- 720p
- 1080p
- 4K where hardware permits

Layouts should scale based on the Xibo canvas/layout dimensions.

Do not stretch content incorrectly merely to fill the physical display.

Respect configured scaling/aspect behavior.

---

# 35. PERFORMANCE

The player may run continuously for months.

Optimize for:

- stable memory consumption
- minimal memory leaks
- efficient media caching
- hardware video decoding
- low idle CPU usage
- minimal unnecessary CMS traffic

Explicitly inspect:

- WebView lifecycle leaks
- Activity references
- coroutine scopes
- video-player disposal
- JavaScript timers
- cache growth
- database growth

---

# 36. OBSERVABILITY

Expose useful runtime metrics internally.

Examples:

uptime

player uptime

WebView uptime

memory usage

cache size

free disk space

last CMS contact

last schedule sync

last media download

current layout

current media

XMR status

queued statistics

recent error count

These metrics