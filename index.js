const net = require("net");

const {ValidationError, PropertyRequiredError, ValueError} = require('./class.errors.js');

const isValidEth0Config = (payload) => {
    if (!payload) {
        throw new ValidationError('Payload is empty');
    }
    if (!payload.hasOwnProperty('eth0_ip')) {
        throw new PropertyRequiredError('eth0_ip');
    }
    if (!net.isIPv4(payload.eth0_ip)) {
        throw new ValueError(payload.eth0_ip);
    }
    return true;
}

const test = (payload) => {
    try {
        const config = JSON.parse(payload);
        if (isValidEth0Config(config)) {
            // Do something
            console.log('OK');
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.warn(`Unable to parse ${payload}`);
        } else { // if(e instanceof ValidationError)
            console.warn(`Error: ${e.message}`);
        }
    }
}

test('');								// Unable to parse
test(null);								// Error: Payload is empty
test('{}');								// Error: No property: eth0_ip
test('{"eth0_ip":"exec rm -rf /"}');	// Error: Invalid value: exec rm -rf /
test('{"eth0_ip":"192.168.1.1"}');		// OK