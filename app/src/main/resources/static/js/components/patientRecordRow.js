// patientRecordRow.js
export function createPatientRecordRow(patient) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td class="patient-id">${patient.appointmentDate}</td>
      <td>${patient.id}</td>
      <td>${patient.patientId}</td>
      <td><img src="../assets/images/addPrescriptionIcon/addPrescription.png" alt="addPrescriptionIcon" class="prescription-btn" data-id="${patient.id}"></img></td>
    `;

  // Attach event listeners
  tr.querySelector(".prescription-btn").addEventListener("click", () => {
    window.location.href = `../../pages/prescription-contents/addPrescription.html`;
  });

  return tr;
}
