package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.back_end.utils.AppHelper;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.Value;

import static com.project.back_end.config.EntityConstraintsConfig.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @NotBlank(message = EMAIL_NOT_BLANK_MSG)
    @Column(unique = true, name = "email")
    //@Email(regexp = "${email-validation-regex}", message = EMAIL_INVALID_REGEX_MSG)
    @Email(regexp = "^[a-zA-Z0-9_+&*-]+(?:.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,}$", message = EMAIL_INVALID_REGEX_MSG)
    private String email;
    
    @NotNull(message = PASSWORD_SIMPLE_NOT_BLANK_MSG)
    //@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", message = PASSWORD_SIMPLE_INVALID_PATTERN_MSG)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", message = PASSWORD_SIMPLE_INVALID_PATTERN_MSG)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    public Admin() {
    }
    
    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
