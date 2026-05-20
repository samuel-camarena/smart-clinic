package com.project.back_end.exceptions;

import org.springframework.http.HttpStatus;

import java.security.Security;

public class AuthenticationException extends SecurityException {
    private static final String DEFAULT_MSG = "Invalid credentials";
    private static final HttpStatus STATUS = HttpStatus.UNAUTHORIZED;
    private final String invalidField;
    
    public AuthenticationException(String message) {
        super(message == null || message.isBlank() ? DEFAULT_MSG : message);
        this.invalidField = "";
    }
    
    public AuthenticationException(String message, String invalidField) {
        super(message == null || message.isBlank() ? DEFAULT_MSG : message);
        this.invalidField = invalidField;
    }
    
    public String getInvalidField() {
        return invalidField;
    }
    
    public HttpStatus getStatus() {
        return STATUS;
    }


// TODO: clean
//    public CustomCredentialNotFoundException(Throwable cause) {
//        super(DEFAULT_MSG, STATUS, cause);
//    }
//
//    public CustomCredentialNotFoundException(String message, Throwable cause) {
//        super(message == null || message.isBlank() ? DEFAULT_MSG : message, STATUS, cause);
//    }
}
