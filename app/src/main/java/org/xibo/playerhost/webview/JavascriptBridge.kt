package org.xibo.playerhost.webview

import android.webkit.JavascriptInterface

class JavascriptBridge(private val listener: Listener) {
    interface Listener {
        fun onReady()
        fun onPlaybackStarted(layoutId: String?)
        fun onHeartbeat()
        fun onError(message: String)
        fun onLog(level: String, message: String)
    }

    @JavascriptInterface fun playerReady() = listener.onReady()
    @JavascriptInterface fun playbackStarted(layoutId: String?) = listener.onPlaybackStarted(clean(layoutId, 128))
    @JavascriptInterface fun reportHealth() = listener.onHeartbeat()
    @JavascriptInterface fun playbackError(message: String?) = listener.onError(clean(message, 1_000).orEmpty())
    @JavascriptInterface fun log(level: String?, message: String?) =
        listener.onLog(clean(level, 16).orEmpty(), clean(message, 1_000).orEmpty())

    private fun clean(value: String?, max: Int) = value?.filter { it >= ' ' }?.take(max)
}
