export class ErrorDTO {
    constructor(errorData) {
        this.metadata = errorData.metadata || null;
        this.data = errorData.data || null;
        this.fieldErrors = errorData.fieldErrors || null;
        this.httpStatus = errorData.status || null;
        this.userErrorMsg = errorData.message || null;
        this.internalErrorMsg = errorData.error || null;
        this.customAdhocParams = new Map();
    }
}