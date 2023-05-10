const express = require("express");

class ErrorHandler {
    constructor(error) {
        this.error = error;
    }

    handle() {
        if (this.error.message === 'Product not found') {
            this.notFoundError();
        } else if (this.error.message === 'Duplicate code product') {
            this.duplicateCodeError();
        } else if (this.error.message === 'ID is being sent') {
            this.invalidIdError();
        } else if (this.error.message === 'data is missing') {
            this.dataMissingError();
        } else {
            this.unknownError();
        }
    }

    notFoundError() {
        res.status(404).json({ message: 'Product not found' });
    }

    duplicateCodeError() {
        res.status(409).json({ message: 'Error, duplicate code' });
    }

    invalidIdError() {
        res.status(409).json({ message: 'Problems with ID' });
    }

    dataMissingError() {
        res.status(404).json({ message: 'At least one piece of data is missing' });
    }

    unknownError() {
        console.error(this.error);
        res.status(500).json({ message: 'Unknown error' });
    }
}
module.exports = ErrorHandler;