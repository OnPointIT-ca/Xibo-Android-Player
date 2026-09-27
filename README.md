# Xibo Android Player Host

An Android 10+ fullscreen host for the open-source Xibo Player SDK. It provides first-run HTTPS CMS
configuration, persistent device identity, connectivity monitoring, immersive/boot operation, a
narrow JavaScript bridge, explicit player states, and WebView watchdog recovery.

> **SDK required:** the upstream SDK bundle is not vendored. Read [the architecture and integration
> contract](docs/ARCHITECTURE.md) before building a distributable player. Without that bundle the
> application intentionally reports “Player SDK bundle is not installed”; it does not emulate Xibo.

## Build

```bash
gradle test assembleDebug
```

The project targets Android API 35 and requires JDK 17 or newer plus Gradle 8.9. A wrapper JAR is
not committed because Codex Cloud pull requests do not accept binary files. Install the upstream bundle at
`app/src/main/assets/player/sdk/xibo-player.js` after adapting `bootstrap.js` to the SDK's current,
documented API.
