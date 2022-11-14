class NodeError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class WrongParametrsError extends NodeError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class RegistrationError extends NodeError {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class NotAuthorizedError extends NodeError {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}


module.exports = {
    NodeError,
    WrongParametrsError,
    RegistrationError,
    NotAuthorizedError,
}