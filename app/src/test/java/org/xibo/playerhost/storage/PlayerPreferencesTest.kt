package org.xibo.playerhost.storage

import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Test

class PlayerPreferencesTest {
    @Test fun normalizesHttpsCmsUrls() {
        assertEquals("https://example.com/xibo", PlayerPreferences.normalizeCmsUrl(" HTTPS://Example.COM/xibo/ "))
    }

    @Test fun rejectsInsecureAndAmbiguousUrls() {
        assertThrows(IllegalArgumentException::class.java) { PlayerPreferences.normalizeCmsUrl("http://example.com") }
        assertThrows(IllegalArgumentException::class.java) { PlayerPreferences.normalizeCmsUrl("https://user@example.com") }
        assertThrows(IllegalArgumentException::class.java) { PlayerPreferences.normalizeCmsUrl("https://example.com/?token=secret") }
    }
}
