export const API_BASE_URL           = "http://localhost:8080";
export const API_ADMIN_BASE_URL     = API_BASE_URL + "/v1/admin";
export const API_ADMIN_LOGIN_URL    = API_ADMIN_BASE_URL + "/login";
export const API_DOCTOR_BASE_URL    = API_BASE_URL + "/v1/doctor";
export const API_DOCTOR_LOGIN_URL   = API_DOCTOR_BASE_URL + "/login";
export const API_DOCTOR_FILTER_URL  = API_DOCTOR_BASE_URL + "/filter";
export const API_APPOINTMENT_BASE_URL  = API_BASE_URL + "/v1/appointment";
export const API_APPOINTMENT_FILTER_URL  = API_APPOINTMENT_BASE_URL + "/filter";
export const API_AUTH_BASE_URL  = API_BASE_URL + "/v1/auth";
export const API_AUTH_LOGIN_URL  = API_AUTH_BASE_URL + "/login";

export const SPECIALTIES = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
    "Gynecologist",
    "Psychiatrist",
    "Dentist",
    "Ophthalmologist",
    "Otorhinolaryngologist",
    "Urologist",
    "Oncologist",
    "Gastroenterologist",
    "General Physician"
];

export const DAY_PERIODS = ["AM", "PM"];

export const AVAILABLE_TIMES_SELECT_OPTIONS = {
    "9:00 AM - 10:00 AM": "09:00-10:00",
    "10:00 AM - 11:00 AM": "10:00-11:00",
    "11:00 AM - 12:00 PM": "11:00-12:00",
    "12:00 PM - 13:00 PM": "12:00-13:00",
    "13:00 PM - 14:00 PM": "13:00-14:00",
    "14:00 PM - 15:00 PM": "14:00-15:00",
    "15:00 PM - 16:00 PM": "15:00-16:00",
    "16:00 PM - 17:00 AM": "16:00-17:00",
    "17:00 PM - 18:00 PM": "17:00-18:00"
};

export const INSURANCE_COMPANIES = [
  "Apex Mutual",
  "Horizon Shield",
  "Vanguard Assurance",
  "Crestline Indemnity",
  "Sterling Risk Group"
];

export const UPDATE_SUCCESS_MSG = ` successfully updated`;
export const UPDATE_ERR_MSG = "❌ An error occurred while updating a "
export const DOCTOR_UPDATE_SUCCESS_MSG = "✔️ Doctor" + UPDATE_SUCCESS_MSG;
export const DOCTOR_UPDATE_ERR_MSG = UPDATE_ERR_MSG + "Doctor" + ". Please try again";

export const CREATE_NEW_SUCCESS_MSG = ` successfully created`;
export const CREATE_NEW_ERR_MSG = "❌ An error occurred while creating a "
export const DOCTOR_CREATE_NEW_SUCCESS_MSG = "✔️ Doctor" + CREATE_NEW_SUCCESS_MSG;
export const DOCTOR_CREATE_NEW_ERR_MSG = CREATE_NEW_ERR_MSG + "Doctor" + ". Please try again";

export const DELETE_SUCCESS_MSG = ` successfully deleted`;
export const DELETE_ERR_MSG = "❌ An error occurred while deleting a "
export const DOCTOR_DELETE_SUCCESS_MSG = "✔️ Doctor" + DELETE_SUCCESS_MSG;
export const DOCTOR_DELETE_ERR_MSG = DELETE_ERR_MSG + "Doctor" + ". Please try again";
export const DELETE_ERR_INVALID_ID_MSG = "not exists by ID:";

//export const DOCTOR_CREATE_ERROR_NAME_NOT_BLANK_MSG = "Name cannot be empty";
export const USER_FIELD_ERROR_NOT_BLANK_MSG = "cannot be empty";
export const USER_FIELD_ERROR_NAME_NOT_BLANK_MSG = `Name ${USER_FIELD_ERROR_NOT_BLANK_MSG}`;
export const USER_FIELD_ERROR_EMAIL_NOT_BLANK_MSG = `Email ${USER_FIELD_ERROR_NOT_BLANK_MSG}`;

//export const LOGIN_ERR_IDENTIFIER_NOT_BLANK_MSG = "Email cannot be empty";
export const LOGIN_ERR_IDENTIFIER_NOT_BLANK_MSG = USER_FIELD_ERROR_EMAIL_NOT_BLANK_MSG;
export const LOGIN_ERR_PASSWORD_NOT_BLANK_MSG = "Password cannot be empty";
export const LOGIN_ERR_WRONG_IDENTIFIER_MSG = "Email not registered. Register here: ";
export const LOGIN_ERR_WRONG_PASSWORD_MSG = "Wrong password";
export const LOGIN_WARN_PASSWORD_CAPSLOCK_MSG = "Warning capslock active";

export const USER_FIELD_ERROR_NOT_BLANK_MESSAGES = [
    USER_FIELD_ERROR_NAME_NOT_BLANK_MSG,
    USER_FIELD_ERROR_EMAIL_NOT_BLANK_MSG,
];

