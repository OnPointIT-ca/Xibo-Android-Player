package org.xibo.playerhost.network

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities

class NetworkMonitor(context: Context, private val changed: (Boolean) -> Unit) : AutoCloseable {
    private val manager = context.getSystemService(ConnectivityManager::class.java)
    private val callback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) = publish()
        override fun onLost(network: Network) = publish()
        override fun onCapabilitiesChanged(network: Network, capabilities: NetworkCapabilities) = publish()
    }

    fun start() {
        manager.registerDefaultNetworkCallback(callback)
        publish()
    }

    private fun publish() {
        val capabilities = manager.getNetworkCapabilities(manager.activeNetwork)
        changed(capabilities?.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED) == true)
    }

    override fun close() = runCatching { manager.unregisterNetworkCallback(callback) }.let { Unit }
}
