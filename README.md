# NODE-UPNP

An async/await implementation of the **U**niversal **P**lug a**n**d **P**lay protocol for NodeJS.

## Motivation

While other pakages focus on Client/Server implementations of UPnP,
this minimalist package goes to the point: plugging and unplugging your device.

## Usage

The API is prone to be changed soon, allowing further exploration and usage of Devices, Services and its schemas.

Implemented so far:
- [ ] UPnP.search (not fully implemented) should allow you to search for a device schema.
- [x] UPnP.searchGateway (implemented, to be removed) searches for the specific schema of the InternetGateway device

The non-implemented search method should return a Device with Services inside with methods extracted from the device's services schemas... instead, right now, two methods from the InternetGateway's WANIP or WANPPP services are hardcoded directly on UPnP: addPortMapping and deletePortMapping

This was enough for an MVP.

### As node package

```js
const UPnP = require('@homelify/node-upnp');

// Obtains the public IP of your router
const externalIpAddress = await UPnP.getExternalIpAddress();

// Sets a new port forwarding rule
await UPnP.addPortMapping({ externalPort, internalPort, description });

// Removes a port forwarding
await UPnP.deletePortMapping({ externalPort });
```

### As as CLI command

Using npm scripts with
`npm run mkmap EXTERNAL_PORT INTERNAL_PORT DESCRIPTION` to create a mapping
or `npm run rmmap EXTERNAL_PORT` to delete it.

In a similar way, using the binary:
`node-upnp map EXTERNAL_PORT INTERNAL_PORT DESCRIPTION` to create a mapping
or `node-upnp rm EXTERNAL_PORT` to delete it.