'use strict';

class ValidationError extends Error {
    constructor(message, options) {
        super(message);
        this.name = 'ValidationError ';
        if (options && options.cause) {
            this.cause = options.cause;
        }
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property, options) {
        super(`No property: ${property}`, options);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

class ValueError extends ValidationError {
    constructor(value, options) {
        super(`Invalid value: ${value}`, options);
        this.name = "ValueError";
        this.value = value;
    }
}

module.exports = {
    ValidationError,
    PropertyRequiredError,
    ValueError,
}