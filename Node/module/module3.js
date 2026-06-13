//Built-in modules

//1. os

const os = require('os');
console.log(os.userInfo());
console.log(`The system uptime is ${os.uptime()/3600} hours`);
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);