module.exports = {
    device: {
        INTERNET_GATEWAY: 'urn:schemas-upnp-org:device:InternetGatewayDevice:1',
        WAN: 'urn:schemas-upnp-org:device:WANDevice:1',
        WAN_CONNECTION: 'urn:schemas-upnp-org:device:WANConnectionDevice:1',
    },
    service: {
        WAN_IP: "urn:schemas-upnp-org:service:WANIPConnection:1",
        WAN_PPP: "urn:schemas-upnp-org:service:WANPPPConnection:1",
        WAN_COMMON_INTERFACE_CONFIG: 'urn:schemas-upnp-org:service:WANCommonInterfaceConfig:1',
    }
};