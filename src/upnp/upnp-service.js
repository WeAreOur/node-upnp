const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const URL = require('url');
const soapRequest = require('../soap/request');

class UpnpService {
    constructor(props) {
        Object.assign(this, props);
    }

    async updateDefinition() {
        this.definition = (await fetch(`${this.host}${this.SCPDURL}`)
            .then(r => r.text())
            .then(parser.parse));
    }

    async doAction(actionName, data) {
        const action = soapRequest.createSOAPAction(this, actionName, data);
        const location = URL.parse(this.host);
        const url = `${this.host}${this.controlURL}`;
        const options = {
            method: 'POST',
            headers: {
                host: location.host + (location.port != 80 ? ":" + location.port : ""),
                SOAPACTION: `"${this.serviceType}#${actionName}"`,
                'content-type': 'text/xml',
                'content-length': action.length,
            },
            body: action,
        };
        const response = (await fetch(url, options)
            .then(r => r.text())
            .then(parser.parse));

        return response['s:Envelope']['s:Body'][`u:${actionName}Response`];
    }
}

module.exports.UpnpService = UpnpService;
