package org.xibo.playerhost.webview

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import org.xibo.playerhost.BuildConfig
import org.xibo.playerhost.diagnostics.PlayerLogger

@SuppressLint("ViewConstructor", "SetJavaScriptEnabled")
class PlayerWebView(
    context: Context,
    cmsUrl: String,
    bridge: JavascriptBridge,
    private val rendererGone: () -> Unit
) : WebView(context) {
    private val cmsHost = Uri.parse(cmsUrl).host

    init {
        setBackgroundColor(android.graphics.Color.BLACK)
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.setSupportMultipleWindows(false)
        WebView.setWebContentsDebuggingEnabled(BuildConfig.WEBVIEW_DEBUG)
        addJavascriptInterface(bridge, "AndroidPlayer")
        webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String?) {
                super.onPageFinished(view, url)
                bootstrap()
            }

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                val allowed = uri.scheme == "https" && uri.host.equals(cmsHost, ignoreCase = true)
                if (!allowed) PlayerLogger.warning("navigation_blocked", uri.toString())
                return !allowed
            }

            override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
                PlayerLogger.error("webview_renderer_gone", "crashed=${detail.didCrash()}")
                rendererGone()
                return true
            }
        }
    }

    fun start(cmsUrl: String, displayId: String, displayName: String?) {
        loadUrl("file:///android_asset/player/index.html")
        tag = Triple(cmsUrl, displayId, displayName)
    }

    private fun bootstrap() {
        @Suppress("UNCHECKED_CAST") val values = tag as? Triple<String, String, String?> ?: return
        val script = "window.XiboHost && window.XiboHost.initialize(${quote(values.first)},${quote(values.second)},${quote(values.third)});"
        evaluateJavascript(script, null)
    }

    fun networkChanged(online: Boolean) = evaluateJavascript("window.XiboHost && window.XiboHost.networkChanged($online);", null)
    fun pausePlayer() = evaluateJavascript("window.XiboHost && window.XiboHost.pause();", null)
    fun resumePlayer() = evaluateJavascript("window.XiboHost && window.XiboHost.resume();", null)

    private fun quote(value: String?): String = if (value == null) "null" else org.json.JSONObject.quote(value)
}
