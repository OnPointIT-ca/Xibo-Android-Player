package org.xibo.playerhost.kiosk

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import org.xibo.playerhost.MainActivity
import org.xibo.playerhost.storage.PlayerPreferences

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED && PlayerPreferences(context).cmsUrl != null) {
            context.startActivity(Intent(context, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        }
    }
}
