import { API_APPOINTMENT_BASE_URL } from "../config/config.js";
//import {AppointmentDTO} from "../DTOs/AppointmentDTO";
//const APPOINTMENT_API = `${API_BASE_URL}/appointments`;


//This is for the doctor to get all the patient Appointments
export async function getAllAppointmentsOfADoctor(token) {
    try {
        const response = await fetch(`${API_APPOINTMENT_BASE_URL}/${token}`);
        const resBody = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to fetch appointments: ${resBody.error}`);
        }

        //return {success: response.ok, message: result.message, appointments: Array.of.of(new AppointmentDTO(appointments))};
        return {success: response.ok, message: resBody.message, appointments: resBody.appointments};
    } catch (error) {
        console.error(`[getAllAppointmentsOfADoctor]:: ${error}`);
        return {success: false, error: error.message, appointments: []};
    }
}

export async function getAllAppointmentsForAdmin(token) {
    try {
        const response = await fetch(`${API_APPOINTMENT_BASE_URL}/all/${token}`);
        const resBody = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to fetch appointments: ${resBody.error}`);
        }

        return {success: response.ok, message: resBody.message, appointments: resBody.appointments};
    } catch (error) {
        console.error(`[getAllAppointmentsForAdmin]:: ${error}`);
        return {
            success: false,
            error: error.message,
            appointments: []
        };
    }
}

//This is for the doctor to get all the patient Appointments
export async function getAllAppointmentsV2(date, patientName, token) {
  /*
    const response = await fetch(`${APPOINTMENT_API}/${date}/${patientName}/${token}`);
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return await response.json();

   */
}

export async function bookAppointment(appointment, token) {
  /*
    try {
    const response = await fetch(`${APPOINTMENT_API}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointment)
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || "Something went wrong"
    };
  } catch (error) {
    console.error("Error while booking appointment:", error);
    return {
      success: false,
      message: "Network error. Please try again later."
    };
  }
  */
}

export async function updateAppointment(appointment, token) {
  /*
    try {
    const response = await fetch(`${APPOINTMENT_API}/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointment)
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || "Something went wrong"
    };
  } catch (error) {
    console.error("Error while booking appointment:", error);
    return {
      success: false,
      message: "Network error. Please try again later."
    };
  }
  */

}
