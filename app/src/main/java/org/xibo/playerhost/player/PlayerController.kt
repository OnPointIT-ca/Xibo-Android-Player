package org.xibo.playerhost.player

import android.os.Handler
import android.os.Looper
import org.xibo.playerhost.diagnostics.PlayerLogger
import org.xibo.playerhost.webview.JavascriptBridge

class PlayerController(
    private val stateChanged: (PlayerState, String?) -> Unit,
    private val recoverRenderer: () -> Unit
) : JavascriptBridge.Listener {
    private val main = Handler(Looper.getMainLooper())
    private var online = false
    @Volatile private var lastHeartbeat = System.currentTimeMillis()
    private var expectingPlayback = false
    private var recoveries = 0
    private val watchdog = object : Runnable {
        override fun run() {
            if (expectingPlayback && System.currentTimeMillis() - lastHeartbeat > HEARTBEAT_TIMEOUT_MS) {
                recoveries++
                PlayerLogger.warning("heartbeat_stale", "recovery=$recoveries")
                transition(PlayerState.ERROR_RECOVERABLE, "Player heartbeat is stale")
                recoverRenderer()
                lastHeartbeat = System.currentTimeMillis()
            }
            main.postDelayed(this, WATCHDOG_INTERVAL_MS)
        }
    }

    fun start() { transition(PlayerState.CONNECTING); main.post(watchdog) }
    fun stop() { main.removeCallbacks(watchdog); expectingPlayback = false }
    fun networkChanged(connected: Boolean) {
        online = connected
        if (!connected && expectingPlayback) transition(PlayerState.OFFLINE_PLAYING)
    }
    override fun onReady() = main.post { transition(if (online) PlayerState.SYNCING else PlayerState.OFFLINE_PLAYING) }
    override fun onPlaybackStarted(layoutId: String?) = main.post {
        expectingPlayback = true; recoveries = 0; lastHeartbeat = System.currentTimeMillis()
        transition(if (online) PlayerState.PLAYING else PlayerState.OFFLINE_PLAYING, layoutId)
    }
    override fun onHeartbeat() { lastHeartbeat = System.currentTimeMillis() }
    override fun onError(message: String) = main.post { transition(PlayerState.ERROR_RECOVERABLE, message) }
    override fun onLog(level: String, message: String) = PlayerLogger.info("sdk_${level.lowercase()}", message)
    private fun transition(state: PlayerState, detail: String? = null) {
        PlayerLogger.info("state", "$state ${detail.orEmpty()}")
        stateChanged(state, detail)
    }

    companion object { const val WATCHDOG_INTERVAL_MS = 30_000L; const val HEARTBEAT_TIMEOUT_MS = 90_000L }
}
