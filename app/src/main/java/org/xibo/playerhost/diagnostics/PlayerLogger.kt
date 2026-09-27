package org.xibo.playerhost.diagnostics

import android.util.Log

object PlayerLogger {
    private const val TAG = "XiboPlayer"
    fun info(event: String, detail: String = "") = Log.i(TAG, "$event ${redact(detail)}".trim())
    fun warning(event: String, detail: String = "") = Log.w(TAG, "$event ${redact(detail)}".trim())
    fun error(event: String, detail: String = "") = Log.e(TAG, "$event ${redact(detail)}".trim())

    private fun redact(value: String): String = value
        .replace(Regex("(?i)(secret|token|password|key)=\\S+"), "$1=<redacted>")
        .take(2_000)
}
