package org.xibo.playerhost.webview

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.webkit.ConsoleMessage
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import org.json.JSONObject
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
    private var bootstrapped = false

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
        webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                bridge.log(message.messageLevel().name, message.message())
                return true
            }
        }
        webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView, url: String?, favicon: android.graphics.Bitmap?) {
                bootstrapped = false
                super.onPageStarted(view, url, favicon)
            }
            override fun onPageFinished(view: WebView, url: String?) {
                super.onPageFinished(view, url)
                injectHostMonitor()
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

    fun start(cmsUrl: String, cmsKey: String, displayId: String, displayName: String?) {
        val base = cmsUrl.trimEnd('/')
        val playerUrl = "$base/player/pwa/"
        val cmsId = Uri.parse(cmsUrl).host.orEmpty() + "-android"
        val global = JSONObject().put("hardwareKey", displayId)
        val cms = JSONObject().put("cmsUrl", cmsUrl).put("cmsKey", cmsKey)
            .put("displayName", displayName ?: "Android display")
            .put("controls", JSONObject().put("keyboard", JSONObject().put("setupKey", false)))
        val seed = """<!doctype html><meta charset=utf-8><script>
          localStorage.setItem('xibo_global',${JSONObject.quote(global.toString())});
          localStorage.setItem('xibo_active_cms',${JSONObject.quote(cmsId)});
          localStorage.setItem('xibo_cms:'+${JSONObject.quote(cmsId)},${JSONObject.quote(cms.toString())});
          location.replace(${JSONObject.quote(playerUrl)});
        </script>"""
        loadDataWithBaseURL(playerUrl, seed, "text/html", "UTF-8", null)
    }

    private fun injectHostMonitor() {
        if (bootstrapped) return
        bootstrapped = true
        evaluateJavascript("""
          (() => {
            if (window.__androidHostInstalled) return;
            window.__androidHostInstalled = true;
            AndroidPlayer.playerReady();
            setInterval(() => AndroidPlayer.reportHealth(), 30000);
            const container = document.getElementById('player-container');
            let announced = false;
            const inspect = () => {
              if (!announced && container && container.children.length) {
                announced = true;
                const layout = container.querySelector('[data-layout-id], .xibo-layout');
                AndroidPlayer.playbackStarted(layout?.dataset?.layoutId || 'active');
              }
            };
            if (container) new MutationObserver(inspect).observe(container, {childList:true, subtree:true});
            inspect();
            addEventListener('error', e => AndroidPlayer.playbackError(String(e.message || 'JavaScript error')));
            addEventListener('unhandledrejection', e => AndroidPlayer.playbackError(String(e.reason || 'Unhandled rejection')));
          })();
        """.trimIndent(), null)
    }

    fun networkChanged(online: Boolean) = evaluateJavascript("window.dispatchEvent(new Event('${if (online) "online" else "offline"}'));", null)
    fun pausePlayer() = evaluateJavascript("document.querySelectorAll('video,audio').forEach(e=>e.pause());", null)
    fun resumePlayer() = evaluateJavascript("window.dispatchEvent(new Event('online'));", null)
    fun clearSdkData(after: () -> Unit) = evaluateJavascript("localStorage.clear(); indexedDB.databases && indexedDB.databases().then(ds=>ds.forEach(d=>indexedDB.deleteDatabase(d.name)));", { after() })
}
