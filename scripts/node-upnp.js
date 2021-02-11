(async () => {
  console.clear(); 
  console.log(`

  \x1b[32m███╗   ██╗ ██████╗ ██████╗ ███████╗\x1b[0m     \x1b[33m ██╗   ██╗██████╗ ███╗   ██╗██████╗ \x1b[0m
  \x1b[32m████╗  ██║██╔═══██╗██╔══██╗██╔════╝\x1b[0m     \x1b[33m ██║   ██║██╔══██╗████╗  ██║██╔══██╗\x1b[0m
  \x1b[32m██╔██╗ ██║██║   ██║██║  ██║█████╗  \x1b[0m████╗\x1b[33m ██║   ██║██████╔╝██╔██╗ ██║██████╔╝\x1b[0m
  \x1b[32m██║╚██╗██║██║   ██║██║  ██║██╔══╝  \x1b[0m╚═══╝\x1b[33m ██║   ██║██╔═══╝ ██║╚██╗██║██╔═══╝ \x1b[0m
  \x1b[32m██║ ╚████║╚██████╔╝██████╔╝███████╗\x1b[0m     \x1b[33m ╚██████╔╝██║     ██║ ╚████║██║     \x1b[0m
  \x1b[32m╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝\x1b[0m     \x1b[33m  ╚═════╝ ╚═╝     ╚═╝  ╚═══╝╚═╝     \x1b[0m

  `);
  const Listr = require('listr');
  const UPnP = require("../src/index");

  const [,,
    command = 'rm',
    externalPort = '8080',
    internalPort = '8080',
    description = 'node-upnp.default.description'
  ] = process.argv;

  let externalIpAddress;
  await new Listr([{
    title: 'Obtaining IP address',
    task: async () => {
      externalIpAddress = await UPnP.getExternalIpAddress();
    },
  }]).run();

  await new Listr([{
    title: `Mapping \x1b[32mhttp://${externalIpAddress}\x1b[33m:${externalPort}\x1b[0m to \x1b[32mhttp://${UPnP.internalIP}\x1b[33m:${internalPort}\x1b[0m`,
    enabled: () => command === 'map',
    task: () => UPnP.addPortMapping({ externalPort, internalPort, description }),
  },{
    title: `Removing mapping for \x1b[32mhttp://${externalIpAddress}\x1b[33m:${externalPort}\x1b[0m`,
    enabled: () => command === 'rm',
    task: () => UPnP.deletePortMapping({ externalPort }),
  }]).run();

  console.log(`
  `);
})();
