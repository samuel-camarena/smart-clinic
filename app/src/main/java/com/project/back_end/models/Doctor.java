package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Range;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import static com.project.back_end.config.EntityConstraintsConfig.*;

@Entity
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @NotBlank(message = NAME_NOT_BLANK_MSG)
    @Size(min = NAME_SIZE_MIN, max = NAME_SIZE_MAX, message = NAME_INVALID_SIZE_MSG)
    private String name;
    
    @NotBlank(message = SPECIALTY_NOT_BLANK_MSG)
    @Size(min = SPECIALTY_SIZE_MIN, max = SPECIALTY_SIZE_MAX, message = SPECIALTY_INVALID_SIZE_MSG)
    private String specialty;
    
    @NotBlank(message = EMAIL_NOT_BLANK_MSG)
    @Column(unique = true, name = "email")
    //@Email(regexp = "${email-validation-regex}", message = EMAIL_INVALID_REGEX_MSG)
    @Email(regexp = "^[a-zA-Z0-9_+&*-]+(?:.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,}$", message = EMAIL_INVALID_REGEX_MSG)
    private String email;
    
    @NotBlank(message = PASSWORD_SIMPLE_NOT_BLANK_MSG)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", message = PASSWORD_SIMPLE_INVALID_PATTERN_MSG)
    // TODO: Jackson’s @JsonIgnore is used to prevent the password field from being serialized into JSON.
    // When updating a Doctor's data, the password is a field requiered by Jakarta with @Validate in DoctorController,
    // so in order to achieve update a Doctor object, been validated by Jakarta, we should to figure out how to
    // not send doctor's password to front-end, at same time we can update the object send via Front-end formulary to update selected doctor.??
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    @NotBlank(message = PHONE_NOT_BLANK_MSG)
    @Pattern(regexp = PHONE_VALIDATION_REGEX, message = PHONE_INVALID_PATTERN_MSG)
    private String phone;
    
    @NotBlank(message = NOT_BLANK_MSG)
    private String photoName;
    
    @NotEmpty(message = AVAILABLE_TIMES_NOT_EMPTY_MSG)
    @ElementCollection
    private List<String> availableTimes;
    
    @NotNull(message = YEARS_OF_EXP_NOT_NULL_MSG) // TODO: Years of experience been blank from Front-end passes Validation Integrity
    @Range(min = YEARS_OF_EXP_RANGE_MIN, max = YEARS_OF_EXP_RANGE_MAX, message = YEARS_OF_EXP_INVALID_RANGE_MSG)
    private int yearsOfExperience;
    
    @NotBlank(message = ADDRESS_NOT_BLANK_MSG)
    @Size(min = ADDRESS_SIZE_MIN, max = ADDRESS_SIZE_MAX, message = ADDRESS_INVALID_SIZE_MSG)
    private String clinicAddress;
    
    @NotNull(message = RATING_NOT_NULL_MSG)
    @Range(min = RATING_RANGE_MIN, max = RATING_RANGE_MAX, message = RATING_INVALID_RANGE_MSG)
    private double rating;

    public Doctor() {}
    
    Doctor(String name, String specialty, String email, String password, String phone, String photoName,
                  List<String> availableTimes, int yearsOfExperience, String clinicAddress, double rating) {
        setName(name);
        setSpecialty(specialty);
        setEmail(email);
        setPhotoName(photoName);
        setPassword(password);
        setPhone(phone);
        setAvailableTimes(availableTimes);
        setYearsOfExperience(yearsOfExperience);
        setClinicAddress(clinicAddress);
        setRating(rating);
    }
    
    public Doctor(Builder builder) {
        setId(builder.id);
        setName(builder.name);
        setSpecialty(builder.specialty);
        setEmail(builder.email);
        setPassword(builder.password);
        setPhone(builder.phone);
        setPhotoName(builder.photoName);
        setAvailableTimes(builder.availableTimes);
        setYearsOfExperience(builder.yearsOfExperience);
        setClinicAddress(builder.clinicAddress);
        setRating(builder.rating);
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpecialty() {
        return specialty;
    }
    
    public void setSpecialty(String specialty) {
        //this.specialty = specialty;
        setSpecialtyCapitalized(specialty);
    }
    
    public void setSpecialtyCapitalized(String specialty) {
        this.specialty = specialty.substring(0,1).toUpperCase() + specialty.substring(1);
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
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getPhotoName() {
        return photoName;
    }
    
    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }
    
    public List<String> getAvailableTimes() {
        return availableTimes;
    }
    
    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }
    
    public int getYearsOfExperience() {
        return yearsOfExperience;
    }
    
    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }
    
    public String getClinicAddress() {
        return clinicAddress;
    }
    
    public void setClinicAddress(String clinicAddress) {
        this.clinicAddress = clinicAddress;
    }
    
    public double getRating() {
        return rating;
    }
    
    public void setRating(double rating) {
        this.rating = rating;
    }
    
    @Override
    @Transient
    public String toString() {
        return "Doctor: { " +
            "ID: " + id +
            ", Name: '" + name +
            ", Specialty: '" + specialty +
            ", Email: '" + email +
            ", Password: '" + password +
            ", Phone: '" + phone +
            ", PhotoName: '" + photoName +
            ", AvailableTimes: " + availableTimes +
            ", YearsOfExperience: " + yearsOfExperience +
            ", ClinicAddress: '" + clinicAddress +
            ", Rating: " + rating +
            " }";
    }
    
    public static class Builder {
        private long id;
        private String name;
        private String specialty;
        private String email;
        private String password;
        private String phone;
        private String photoName;
        private List<String> availableTimes;
        private int yearsOfExperience;
        private String clinicAddress;
        private double rating;
        
        public Builder id(long id) {
            this.id = id;
            return this;
        }
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder specialty(String specialty) {
            this.specialty = specialty;
            return this;
        }
        
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        
        public Builder password(String password) {
            this.password = password;
            return this;
        }
        
        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }
        
        public Builder photoName(String photoName) {
            this.photoName = photoName;
            return this;
        }
        
        public Builder availableTimes(List<String> availableTimes) {
            this.availableTimes = availableTimes;
            return this;
        }
        
        public Builder yearsOfExperience(int yearsOfExperience) {
            this.yearsOfExperience = yearsOfExperience;
            return this;
        }
        
        public Builder clinicAddress(String clinicAddress) {
            this.clinicAddress = clinicAddress;
            return this;
        }
        
        public Builder rating(double rating) {
            this.rating = rating;
            return this;
        }
        
        public Doctor build() {
            return new Doctor(this);
        }
    }
}


