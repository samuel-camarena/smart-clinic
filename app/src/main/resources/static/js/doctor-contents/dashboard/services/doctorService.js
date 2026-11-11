import {API_DOCTOR_BASE_URL, API_DOCTOR_FILTER_URL} from "../../../config/config.js";
import {ErrorDTO} from "../../../DTOs/ErrorDTO.js";
import * as SessionManager from "../../../utils/sessionManager.js";

export async function saveDoctor(doctor) {
    try {
        const token = SessionManager.getValidatedToken();

        const response = await fetch(
            `${API_DOCTOR_BASE_URL}/${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            });
        const bodyRes = await response.json();
        if (response.ok) {
            return { success: response.ok, message: bodyRes.message };
        } else {
            return { success: false, errorDto: new ErrorDTO(bodyRes) }
        }
    } catch (error) {
        return { success: false, error: error.message, };
    }
}

export async function getAllDoctors() {
    try {
        const response = await fetch(`${API_DOCTOR_BASE_URL}`);
        const result = await response.json();
        if(!response.ok) {
            throw new Error(result.error);
        }
        return { success: response.ok, message: result.message, doctors: result.doctors };
    } catch (error) {
        console.error("[getDoctors]:: ", error);
        return { success: false, error: error.message, doctors: [] };
    }
}

export async function filterDoctors(name ,amOrPm ,specialty) {
    try {
        const response = await fetch(
            `${API_DOCTOR_FILTER_URL}?name=${name}&amOrPm=${amOrPm}&specialty=${specialty}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const bodyRes = await response.json();
        if (response.ok) {
            return {success: true, message: bodyRes.message, doctors: bodyRes.doctors};
        } else {
            console.log("inside response NOT ok");
            return {success: false, errorDto: new ErrorDTO(bodyRes)};
        }
    } catch (error) {
        console.log("[inside catch]:: ", error.message);
        return {success: false, errorDto: new ErrorDTO(error)};
    }
}

export async function updateDoctor(doctor) {
    try {
        const token = SessionManager.getValidatedToken();

        const response = await fetch(
            `${API_DOCTOR_BASE_URL}/${token}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            });
        const bodyRes = await response.json();
        if(response.ok) {
            return { success: true, message: bodyRes.message };
        } else {
            return { success: false, errorDto: new ErrorDTO(bodyRes) }
        }
    } catch (error) {
        return { success: false, error: error.message, };
    }
}

export async function deleteDoctor(id) {
    const token = SessionManager.getValidatedToken();

    return fetch(
        `${API_DOCTOR_BASE_URL}/${id}/${token}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }}) // TODO: change json() Promise to async.
        .then(response =>
            response.json()
                .then(bodyRes => {
                    if (response.ok) {
                        return {success: response.ok, message: bodyRes.message};
                    } else {
                        return {success: false, errorDto: new ErrorDTO(bodyRes)};
                    } })
                .catch(reason => {
                    console.log("[response.json]:: " + reason);
                    return {success: false, errorDto: new ErrorDTO(reason)};
                }))
        .catch(reason => {
            console.log("[fetch]:: " + reason);
            return {success: false, errorDto: new ErrorDTO(reason)}; });
}
/*
const response = await fetch(
    `${PATIENT_API}/filter/${condition}/${name}/${token}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
*/
/*
let doctorParametrizedURL;
if(name != null && name !== "") {
    doctorParametrizedURL = `${API_DOCTOR_BASE_URL}/${name}`;
}

if(time != null && time !== "") {
    if(doctorParametrizedURL) {
        doctorParametrizedURL += `&time=${time}`;
    } else {
        doctorParametrizedURL = `${API_DOCTOR_BASE_URL}/${time}`;
    }
}

if(specialty != null && specialty !== "") {
    if(doctorParametrizedURL) {
        doctorParametrizedURL += `&specialty=${specialty}`;
    } else {
        doctorParametrizedURL = `${API_DOCTOR_BASE_URL}/${specialty}`;
    }
}
*/