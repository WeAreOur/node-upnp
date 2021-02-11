const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const URL = require('url');
const { reduceSoapList } = require('../utils/soap-list');
const { UpnpService } = require('./upnp-service');

class UpnpDevice {
    constructor(location) {
        this.location = URL.parse(location);
        this.devices = null;
        this.services = null;
    }

    async updateDefinition() {
        const {
            specVersion,
            device,
        } = (await fetch(this.location)
          .then(r => r.text())
          .then(parser.parse)).root;

        this.specVersion = specVersion;
        this.device = device;
    }

    async getDevices() {
        if (this.devices) return this.devices;
        if (!this.device) await this.updateDefinition();
        this.devices = reduceSoapList(this.device, 'device');
        return this.devices;
    }

    async getServices() {
        if (this.services) return this.services;

        let services = reduceSoapList(await this.getDevices(), 'service');

        this.services = services.reduce((all, service) => {
            all[service.serviceType] = new UpnpService({
                ...service,
                host: `${this.location.protocol}//${this.location.host}`,
            });
            return all;
        }, {});

        return this.services;
    }
};

module.exports.UpnpDevice = UpnpDevice;
