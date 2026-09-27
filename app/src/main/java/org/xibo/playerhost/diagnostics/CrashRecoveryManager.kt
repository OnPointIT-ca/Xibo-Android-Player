package org.xibo.playerhost.diagnostics

import android.content.Context
import java.io.File
import java.time.Instant

class CrashRecoveryManager(context: Context) {
    private val marker = File(context.filesDir, "diagnostics/last_crash.txt")
    fun install() {
        if (installed) return
        installed = true
        val previous = Thread.getDefaultUncaughtExceptionHandler()
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            runCatching {
                marker.parentFile?.mkdirs()
                marker.writeText("${Instant.now()} ${thread.name} ${throwable.javaClass.name}: ${throwable.message.orEmpty().take(500)}")
            }
            previous?.uncaughtException(thread, throwable)
        }
    }
    fun consumeLastCrash(): String? = marker.takeIf(File::exists)?.readText()?.also { marker.delete() }

    companion object { @Volatile private var installed = false }
}
