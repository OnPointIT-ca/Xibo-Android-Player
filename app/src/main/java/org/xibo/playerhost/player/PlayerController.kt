package org.xibo.playerhost.player

import android.os.Handler
import android.os.Looper
import org.xibo.playerhost.diagnostics.PlayerLogger
import org.xibo.playerhost.webview.JavascriptBridge

class PlayerController(
    private val stateChanged: (PlayerState, String?) -> Unit,
    private val recoverRenderer: () -> Unit,
    private val now: () -> Long = System::currentTimeMillis
) : JavascriptBridge.Listener {
    private val main = Handler(Looper.getMainLooper())
    private var online = false
    private var active = true
    @Volatile private var lastProgress = now()
    private var monitoring = false
    private var recoveries = 0
    private val watchdog = object : Runnable {
        override fun run() {
            if (active && monitoring && now() - lastProgress > timeoutFor(recoveries)) {
                if (recoveries >= MAX_RECOVERIES) {
                    monitoring = false
                    transition(PlayerState.ERROR_FATAL, "Player stopped responding after $recoveries recovery attempts")
                } else {
                    recoveries++
                    transition(PlayerState.ERROR_RECOVERABLE, "Player stopped responding; recovery $recoveries/$MAX_RECOVERIES")
                    lastProgress = now()
                    recoverRenderer()
                }
            }
            main.postDelayed(this, WATCHDOG_INTERVAL_MS)
        }
    }

    fun start() { monitoring = true; active = true; lastProgress = now(); transition(PlayerState.CONNECTING); main.removeCallbacks(watchdog); main.post(watchdog) }
    fun stop() { main.removeCallbacks(watchdog); monitoring = false }
    fun setActive(value: Boolean) { active = value; if (value) lastProgress = now() }
    fun networkChanged(connected: Boolean) { online = connected; if (!connected) transition(PlayerState.OFFLINE_PLAYING) }
    override fun onReady() { main.post { progress(); transition(if (online) PlayerState.SYNCING else PlayerState.OFFLINE_PLAYING) } }
    override fun onPlaybackStarted(layoutId: String?) { main.post { progress(); recoveries = 0; transition(if (online) PlayerState.PLAYING else PlayerState.OFFLINE_PLAYING, layoutId) } }
    override fun onHeartbeat() = progress()
    override fun onError(message: String) { main.post { progress(); transition(PlayerState.ERROR_RECOVERABLE, message) } }
    override fun onLog(level: String, message: String) { PlayerLogger.info("sdk_${level.lowercase()}", message) }
    private fun progress() { lastProgress = now() }
    private fun timeoutFor(attempt: Int) = STARTUP_TIMEOUT_MS * (1L shl attempt.coerceAtMost(2))
    private fun transition(state: PlayerState, detail: String? = null) { PlayerLogger.info("state", "$state ${detail.orEmpty()}"); stateChanged(state, detail) }

    companion object { const val WATCHDOG_INTERVAL_MS = 30_000L; const val STARTUP_TIMEOUT_MS = 120_000L; const val MAX_RECOVERIES = 3 }
}
