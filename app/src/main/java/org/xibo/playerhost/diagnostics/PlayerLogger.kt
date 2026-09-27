package org.xibo.playerhost.diagnostics

import android.content.Context
import android.util.Log
import java.io.File
import java.time.Instant

object PlayerLogger {
    private const val TAG = "XiboPlayer"
    private const val MAX_LOG_BYTES = 1_000_000L
    private var logFile: File? = null

    @Synchronized fun initialize(context: Context) {
        logFile = File(context.filesDir, "diagnostics/player.log")
        logFile?.parentFile?.mkdirs()
    }
    fun info(event: String, detail: String = "") = write("INFO", event, detail) { Log.i(TAG, it) }
    fun warning(event: String, detail: String = "") = write("WARNING", event, detail) { Log.w(TAG, it) }
    fun error(event: String, detail: String = "") = write("ERROR", event, detail) { Log.e(TAG, it) }

    fun recent(maxChars: Int = 20_000): String = runCatching {
        logFile?.takeIf(File::exists)?.readText()?.takeLast(maxChars).orEmpty()
    }.getOrDefault("")

    @Synchronized private fun write(level: String, event: String, detail: String, androidLog: (String) -> Unit) {
        val safe = "$event ${redact(detail)}".trim()
        androidLog(safe)
        runCatching {
            val file = logFile ?: return
            if (file.exists() && file.length() > MAX_LOG_BYTES) {
                File(file.parentFile, "player.previous.log").also { previous -> file.copyTo(previous, overwrite = true) }
                file.writeText("")
            }
            file.appendText("${Instant.now()} $level $safe\n")
        }
    }

    private fun redact(value: String): String = value
        .replace(Regex("(?i)(secret|token|password|key)=\\S+"), "$1=<redacted>")
        .take(2_000)
}
