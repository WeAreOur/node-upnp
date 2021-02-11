const SSDP = require('@homelify/node-ssdp');
const upnpSchemas = require('./upnp/schemas');
const UpnpInternetGatewayDevice = require('./upnp/devices/internet-gateway');
const { UpnpDevice } = require('./upnp/upnp-device.js');

class UPnP {
  constructor() {
    this.internalIP = require('ip').address();
  }

  async search({ serviceType }) {
    const deviceResponse = await SSDP.mSearch({ serviceType });
    return new UpnpDevice(deviceResponse.LOCATION);
  }

  async searchGateway() {
    const gateway = await this.search({ serviceType: upnpSchemas.device.INTERNET_GATEWAY });
    const services = await gateway.getServices();
    this.gatewayService = services[upnpSchemas.service.WAN_PPP] || services[upnpSchemas.service.WAN_IP];
  }

  async getExternalIpAddress() {
    if (!this.gatewayService) await this.searchGateway();

    const { NewExternalIPAddress } = await this.gatewayService.doAction('GetExternalIPAddress');
    return NewExternalIPAddress;
  }

  async addPortMapping({
    externalPort: NewExternalPort = '8080',
    protocol: NewProtocol = 'TCP',
    internalPort: NewInternalPort = '8080',
    description: NewPortMappingDescription = 'upnp.port.mapping.description',
  }) {
    if (!this.gatewayService) await this.searchGateway();

    await this.gatewayService.doAction('AddPortMapping', {
      NewRemoteHost: '',
      NewExternalPort,
      NewProtocol,
      NewInternalPort,
      NewInternalClient: this.internalIP,
      NewEnabled: 1,
      NewPortMappingDescription,
      NewLeaseDuration: 0,
    });
  }

  async deletePortMapping({
    externalPort: NewExternalPort = '8080',
    protocol: NewProtocol = 'TCP',
  }) {
    if (!this.gatewayService) await this.searchGateway();

    await this.gatewayService.doAction('DeletePortMapping', {
      NewRemoteHost: '',
      NewExternalPort,
      NewProtocol,
    });
  }
}

module.exports = new UPnP();
