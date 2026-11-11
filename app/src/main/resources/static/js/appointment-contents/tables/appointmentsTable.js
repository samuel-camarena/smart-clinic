
export function createTable() {
  const table = document.createElement("table");
  const tHead = document.createElement("thead");
  const tBody = document.createElement("tbody");
  const trHead = document.createElement("tr");
  const patientIdTh = document.createElement("th");
  const nameTh = document.createElement("th");
  const phoneTh = document.createElement("th");
  const emailTh = document.createElement("th");
  const prescriptionTh = document.createElement("th");

  table.id = "appointmentsTable";
  table.className = "table";
  tHead.className = "table-head";
  tBody.id = "appointmentsTBody";
  patientIdTh.textContent = "Patient ID";
  nameTh.textContent = "Name";
  phoneTh.textContent = "Phone";
  emailTh.textContent = "Email";
  prescriptionTh.textContent = "Prescription";

  table.appendChild(tHead);
  table.appendChild(tBody);
  tHead.appendChild(trHead);
  trHead.append(patientIdTh, nameTh, phoneTh, emailTh, prescriptionTh);

  return table;
}