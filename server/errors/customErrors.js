class HttpError extends Error {
    status;
}

class BadRequest extends HttpError {
    constructor(message = 'Bad request') {
        super(message);

        this.status = 400;
    }
}

class Unauthorized extends HttpError {
    constructor(message = 'Unauthorized') {
        super(message);

        this.status = 401;
    }
}

class Forbidden extends HttpError {
    constructor(message = 'Forbidden') {
        super(message);

        this.status = 403;
    }
}

class NotFound extends HttpError {
    constructor(message = 'Not found') {
        super(message);

        this.status = 404;
    }
}

module.exports = { BadRequest, NotFound, Unauthorized, Forbidden };
