package org.xibo.playerhost.storage

import android.content.Context
import java.net.URI
import java.util.UUID

class PlayerPreferences(context: Context) {
    private val values = context.getSharedPreferences("player_configuration", Context.MODE_PRIVATE)

    val cmsUrl: String? get() = values.getString(CMS_URL, null)
    val cmsKey: String? get() = values.getString(CMS_KEY, null)
    val displayName: String? get() = values.getString(DISPLAY_NAME, null)
    val displayId: String get() = values.getString(DISPLAY_ID, null) ?: UUID.randomUUID().toString().also {
        values.edit().putString(DISPLAY_ID, it).apply()
    }

    fun configure(rawUrl: String, key: String, name: String?): String {
        val normalized = normalizeCmsUrl(rawUrl)
        require(key.isNotBlank()) { "CMS key is required" }
        values.edit().putString(CMS_URL, normalized)
            .putString(CMS_KEY, key.trim())
            .putString(DISPLAY_NAME, name?.trim()?.takeIf(String::isNotEmpty)).apply()
        return normalized
    }

    fun clearRegistration() = values.edit().remove(DISPLAY_ID).apply()
    fun clearConfiguration() = values.edit().remove(CMS_URL).remove(CMS_KEY).remove(DISPLAY_NAME).apply()

    companion object {
        private const val CMS_URL = "cms_url"
        private const val CMS_KEY = "cms_key"
        private const val DISPLAY_NAME = "display_name"
        private const val DISPLAY_ID = "display_id"

        fun normalizeCmsUrl(input: String): String {
            val text = input.trim()
            require(text.isNotEmpty()) { "CMS URL is required" }
            val uri = runCatching { URI(text) }.getOrElse { throw IllegalArgumentException("Invalid CMS URL") }
            require(uri.scheme.equals("https", true)) { "CMS URL must use HTTPS" }
            require(!uri.host.isNullOrBlank() && uri.userInfo == null && uri.fragment == null) { "Invalid CMS URL" }
            require(uri.query == null) { "CMS URL cannot contain a query" }
            val path = (uri.path ?: "").trimEnd('/')
            return URI("https", null, uri.host.lowercase(), uri.port, path.ifEmpty { null }, null, null).toASCIIString()
        }
    }
}
