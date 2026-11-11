/*
export class SessionManager {
    constructor() {}

    const resetUserSession = function() {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    };

}
 */
export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getRole() {
  return localStorage.getItem("userRole");
}

export function setRole(role) {
  localStorage.setItem("userRole", role);
}

export function initSession(token, role) {
  resetUserSession();
  setToken(token);
  selectRole(role);
}

export function resetUserSession() {
  clearRole();
  clearToken();
}

export function logout() {
  resetUserSession();
  window.location.href = "/";
}

export function validateCurrentSession() {
    const token = getToken();
    const role = getRole();
    if(isInvalidSession(token, role)) {
        alert("🚫 Invalid credentials. Please log in again.");
        window.location.href = "/";
    }
}

export function getValidatedToken() {
    const token = getToken();
    const role = getRole();
    if(isInvalidSession(token, role)) {
        alert("🚫 Invalid credentials. Please log in again.");
        window.location.href = "/";
    }
    return token;
}

export function isCurrentSessionValid() {
  const token = getToken();
  const role = getRole();
  return !isInvalidSession(token, role);
}

export function selectRole(role) {
  setRole(role);
  const token = localStorage.getItem('token');
  switch (role) {
    case "admin":
      if (token) {
        window.location.href = `/adminDashboard/${token}`;
      } else {
        logout();
      }
      break;
    case "doctor":
      if (token) {
        window.location.href = `/doctorDashboard/${token}`;
      } else {
        logout();
      }
      break;
    case "patient":
      //window.location.href = "../../../templates/dashboards/patientDashboard.html";
      //window.location.href = `/doctorDashboard/${token}`;
      window.location.href = `/patientDashboard/${token}`;
      break;
    case "loggedPatient":
      if (token) {
        window.location.href = "loggedPatientDashboard.html";
      } else {
        logout();
      }
      break;
    default:
      logout();
      break;
  }
}

export function renderContent() {
  const role = getRole();
  if (!role) {
    logout();
  }
}

export function clearRole() {
  localStorage.removeItem("userRole");
}

export function clearToken() {
  localStorage.removeItem("token");
}

function isInvalidSession(token, role) {
  return token === undefined || token === null || token === "" || role === undefined || role === null || role === "";
}




