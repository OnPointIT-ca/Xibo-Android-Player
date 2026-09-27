package org.xibo.playerhost

import android.app.AlertDialog
import android.app.admin.DevicePolicyManager
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.WindowInsets
import android.view.WindowInsetsController
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
import org.json.JSONObject
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
    private var state = PlayerState.UNCONFIGURED
    private var stateDetail: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        preferences = PlayerPreferences(this)
        root = FrameLayout(this).also(::setContentView)
        root.setOnLongClickListener { showDiagnostics(); true }
        controller = PlayerController(::showState, ::recreateRenderer)
        if (preferences.cmsUrl == null || preferences.cmsKey == null) showSetup() else startPlayer()
    }

    private fun showSetup(error: String? = null) {
        controller.stop(); state = PlayerState.UNCONFIGURED; root.removeAllViews()
        val panel = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; gravity = Gravity.CENTER_HORIZONTAL; setPadding(48, 48, 48, 48) }
        panel.addView(TextView(this).apply { text = "Connect this display"; textSize = 28f; setTextColor(Color.WHITE) })
        val url = field("https://cms.example.com").apply { setText(preferences.cmsUrl.orEmpty()) }
        val key = field("CMS key").apply { inputType = android.text.InputType.TYPE_CLASS_TEXT or android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD }
        val name = field("Display name (optional)").apply { setText(preferences.displayName.orEmpty()) }
        val status = TextView(this).apply { text = error.orEmpty(); setTextColor(Color.rgb(255, 150, 150)); setPadding(0, 16, 0, 16) }
        val connect = Button(this).apply { text = "Connect" }
        listOf(url, key, name, status, connect).forEach { panel.addView(it, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)) }
        root.addView(panel, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.CENTER))
        connect.setOnClickListener {
            val normalized = runCatching { PlayerPreferences.normalizeCmsUrl(url.text.toString()) }.getOrElse { status.text = it.message; return@setOnClickListener }
            if (key.text.isNullOrBlank()) { status.text = "CMS key is required"; return@setOnClickListener }
            connect.isEnabled = false; status.text = "Checking Xibo CMS…"
            lifecycleScope.launch {
                val failure = withContext(Dispatchers.IO) { checkEndpoint(normalized) }
                if (failure != null) { status.text = failure; connect.isEnabled = true }
                else { preferences.configure(normalized, key.text.toString(), name.text.toString()); startPlayer() }
            }
        }
    }

    private fun field(label: String) = EditText(this).apply { hint = label; setTextColor(Color.WHITE); setHintTextColor(Color.GRAY); setSingleLine() }

    private fun checkEndpoint(base: String): String? = try {
        val connection = URL("${base.trimEnd('/')}/api/v2/player/health").openConnection() as HttpURLConnection
        connection.connectTimeout = 10_000; connection.readTimeout = 10_000; connection.instanceFollowRedirects = false; connection.requestMethod = "GET"; connection.connect()
        val code = connection.responseCode
        val body = runCatching { connection.inputStream.bufferedReader().use { it.readText().take(4096) } }.getOrDefault("")
        connection.disconnect()
        when {
            code in 300..399 -> "CMS redirected the player health endpoint; enter its canonical HTTPS URL"
            code == 401 || code == 403 -> null // endpoint exists; SDK validates the key during registration
            code !in 200..299 -> "No compatible Xibo Player API found (HTTP $code)"
            body.isNotBlank() && runCatching { JSONObject(body) }.isFailure -> "Player health endpoint returned an invalid response"
            else -> null
        }
    } catch (error: javax.net.ssl.SSLException) { "TLS validation failed: ${error.localizedMessage}" }
      catch (error: java.net.SocketTimeoutException) { "CMS connection timed out" }
      catch (error: Exception) { "Cannot reach a compatible CMS: ${error.localizedMessage ?: "connection failed"}" }

    private fun startPlayer() {
        root.removeAllViews(); controller.start(); network?.close()
        network = NetworkMonitor(this) { connected -> runOnUiThread { online = connected; controller.networkChanged(connected); webView?.networkChanged(connected) } }.also { it.start() }
        createRenderer()
    }

    private fun createRenderer() {
        val cmsUrl = preferences.cmsUrl ?: return showSetup()
        val cmsKey = preferences.cmsKey ?: return showSetup()
        webView = PlayerWebView(this, cmsUrl, JavascriptBridge(controller), ::recreateRenderer).also {
            root.addView(it, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
            it.start(cmsUrl, cmsKey, preferences.displayId, preferences.displayName)
        }
    }

    private fun recreateRenderer() = runOnUiThread {
        webView?.let { root.removeView(it); it.removeJavascriptInterface("AndroidPlayer"); it.destroy() }; webView = null; createRenderer()
    }

    private fun showState(newState: PlayerState, detail: String?) { state = newState; stateDetail = detail; if (newState == PlayerState.ERROR_FATAL) showDiagnostics() }

    private fun showDiagnostics() {
        val message = "State: $state\nNetwork: ${if (online) "online" else "offline"}\nCMS: ${preferences.cmsUrl ?: "not configured"}\nDisplay ID: ${preferences.displayId}\nSDK: xiboplayer PWA 0.7.24-oidc.0\n${stateDetail.orEmpty()}"
        AlertDialog.Builder(this).setTitle("Player diagnostics").setMessage(message)
            .setPositiveButton("Retry") { _, _ -> if (preferences.cmsUrl != null) recreateRenderer() }
            .setNeutralButton("Change CMS") { _, _ -> showSetup() }
            .setNegativeButton("Reset") { _, _ -> confirmReset() }.show()
    }

    private fun confirmReset() {
        AlertDialog.Builder(this).setTitle("Reset registration?").setMessage("This removes the CMS configuration, SDK identity, and cached browser data.")
            .setPositiveButton("Reset") { _, _ -> webView?.clearSdkData { runOnUiThread { preferences.clearRegistration(); preferences.clearConfiguration(); showSetup() } } ?: run { preferences.clearRegistration(); preferences.clearConfiguration(); showSetup() } }
            .setNegativeButton("Cancel", null).show()
    }

    override fun onResume() { super.onResume(); controller.setActive(true); enterImmersive(); webView?.onResume(); webView?.resumePlayer(); enableLockTaskIfManaged() }
    override fun onPause() { controller.setActive(false); webView?.pausePlayer(); webView?.onPause(); super.onPause() }
    override fun onDestroy() { network?.close(); controller.stop(); webView?.removeJavascriptInterface("AndroidPlayer"); webView?.destroy(); super.onDestroy() }

    private fun enableLockTaskIfManaged() {
        val dpm = getSystemService(DevicePolicyManager::class.java)
        if (dpm.isLockTaskPermitted(packageName) && !isInLockTaskMode()) startLockTask()
    }
    private fun isInLockTaskMode() = (getSystemService(android.app.ActivityManager::class.java).lockTaskModeState != android.app.ActivityManager.LOCK_TASK_MODE_NONE)
    @Suppress("DEPRECATION") private fun enterImmersive() {
        if (Build.VERSION.SDK_INT >= 30) window.insetsController?.let { it.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()); it.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE }
        else window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    }
}
