package org.xibo.playerhost

import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.xibo.playerhost.network.NetworkMonitor
import org.xibo.playerhost.player.PlayerController
import org.xibo.playerhost.player.PlayerState
import org.xibo.playerhost.storage.PlayerPreferences
import org.xibo.playerhost.webview.JavascriptBridge
import org.xibo.playerhost.webview.PlayerWebView
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {
    private lateinit var preferences: PlayerPreferences
    private lateinit var root: FrameLayout
    private var webView: PlayerWebView? = null
    private var network: NetworkMonitor? = null
    private lateinit var controller: PlayerController
    private var online = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        preferences = PlayerPreferences(this)
        root = FrameLayout(this).also(::setContentView)
        controller = PlayerController(::showState, ::recreateRenderer)
        if (preferences.cmsUrl == null) showSetup() else startPlayer()
    }

    private fun showSetup(error: String? = null) {
        controller.stop()
        root.removeAllViews()
        val panel = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            setPadding(48, 48, 48, 48)
        }
        panel.addView(TextView(this).apply { text = "Connect this display"; textSize = 28f; setTextColor(Color.WHITE) })
        val url = EditText(this).apply { hint = "https://cms.example.com"; setTextColor(Color.WHITE); setHintTextColor(Color.GRAY); setSingleLine() }
        val name = EditText(this).apply { hint = "Display name (optional)"; setTextColor(Color.WHITE); setHintTextColor(Color.GRAY); setSingleLine() }
        val status = TextView(this).apply { text = error.orEmpty(); setTextColor(Color.rgb(255, 150, 150)); setPadding(0, 16, 0, 16) }
        val connect = Button(this).apply { text = "Connect" }
        listOf(url, name, status, connect).forEach { panel.addView(it, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)) }
        root.addView(panel, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.CENTER))
        connect.setOnClickListener {
            val normalized = runCatching { PlayerPreferences.normalizeCmsUrl(url.text.toString()) }
                .getOrElse { status.text = it.message; return@setOnClickListener }
            connect.isEnabled = false
            status.text = "Checking CMS…"
            lifecycleScope.launch {
                val failure = withContext(Dispatchers.IO) { checkEndpoint(normalized) }
                if (failure != null) { status.text = failure; connect.isEnabled = true }
                else { preferences.configure(normalized, name.text.toString()); startPlayer() }
            }
        }
    }

    private fun checkEndpoint(url: String): String? = try {
        val connection = URL(url).openConnection() as HttpURLConnection
        connection.connectTimeout = 10_000; connection.readTimeout = 10_000
        connection.instanceFollowRedirects = false; connection.requestMethod = "GET"
        connection.connect()
        val code = connection.responseCode
        connection.disconnect()
        if (code in 200..499) null else "CMS returned HTTP $code"
    } catch (error: Exception) { "Cannot reach CMS: ${error.localizedMessage ?: "connection failed"}" }

    private fun startPlayer() {
        root.removeAllViews()
        controller.start()
        network?.close()
        network = NetworkMonitor(this) { connected -> runOnUiThread {
            online = connected; controller.networkChanged(connected); webView?.networkChanged(connected)
        } }.also { it.start() }
        createRenderer()
    }

    private fun createRenderer() {
        val cmsUrl = preferences.cmsUrl ?: return showSetup()
        val bridge = JavascriptBridge(controller)
        webView = PlayerWebView(this, cmsUrl, bridge, ::recreateRenderer).also {
            root.addView(it, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
            it.start(cmsUrl, preferences.displayId, preferences.displayName)
        }
    }

    private fun recreateRenderer() = runOnUiThread {
        webView?.let { root.removeView(it); it.removeJavascriptInterface("AndroidPlayer"); it.destroy() }
        webView = null
        createRenderer()
    }

    private fun showState(state: PlayerState, detail: String?) {
        if (state == PlayerState.ERROR_FATAL) showSetup(detail)
    }

    override fun onResume() { super.onResume(); enterImmersive(); webView?.onResume(); webView?.resumePlayer() }
    override fun onPause() { webView?.pausePlayer(); webView?.onPause(); super.onPause() }
    override fun onDestroy() { network?.close(); controller.stop(); webView?.destroy(); super.onDestroy() }

    private fun enterImmersive() {
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
            View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    }
}
