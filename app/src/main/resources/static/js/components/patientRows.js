// patientRows.js
export function createPatientRow(patient, appointmentId, doctorId) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="patient-id">${patient.id}</td>
        <td>${patient.name}</td>
        <td>${patient.phone}</td>
        <td>${patient.email}</td>
        <td><img src="../assets/images/addPrescriptionIcon/addPrescription.png" alt="addPrescriptionIcon" class="prescription-btn" data-id="${patient.id}"></img></td>
    `;

    tr.querySelector(".patient-id").addEventListener("click", () => {
        // window.location.href = `/pages/patientRecord.html?id=${patient.id}&doctorId=${doctorId}`;
        window.location.href = `../../pages/patient-contents/patientRecord.html`;
    });
    tr.querySelector(".prescription-btn").addEventListener("click", () => {
        // pages/addPrescription.html?appointmentId=${appointmentId}&patientName=${patient.name}`;
        window.location.href = `../../pages/prescription-contents/addPrescription.html`;
    });
    return tr;
}


//export function createPatientRow(patient, appointmentId, doctorId) {
export function createPatientRowV2(rowData) {
    const tr = document.createElement("tr");
    tr.append(...createCells(rowData));
    /*
    tr.querySelector(".patient-id").addEventListener("click", () => {
        window.location.href = `../../pages/patient-contents/patientRecord.html`;
    });
    */
    tr.querySelector(".patient-id").addEventListener("click", window.doctorGetPatientRecord);
    // window.location.href = `/pages/patientRecord.html?id=${patient.id}&doctorId=${doctorId}`;
    tr.querySelector(".prescription-btn").addEventListener("click", window.doctorAddPrescription);
    // pages/addPrescription.html?appointmentId=${appointmentId}&patientName=${patient.name}`;

    //tr.get id: prescriptionAddNewIcon -> addEvent..
    /*
    tr.querySelector(".prescription-btn").addEventListener("click", () => {
        window.location.href = `../../pages/perscription-contents/addPrescription.html`;
    });
     */
    return tr;
}

function createCells(rowData) {
    const patientIdTd = document.createElement("td");
    const patientNameTd = document.createElement("td");
    const patientPhoneTd = document.createElement("td");
    const patientEmailTd = document.createElement("td");
    const prescriptionAddNewTd = document.createElement("td");
    const prescriptionAddNewIcon = document.createElement("img");

    patientIdTd.classList.add("patient-id");
    patientIdTd.textContent = rowData.patient.id;
    patientNameTd.textContent = rowData.patient.name;
    patientPhoneTd.textContent = rowData.patient.phone;
    patientEmailTd.textContent = rowData.patient.email;
    prescriptionAddNewIcon.src = "../assets/images/addPrescriptionIcon/addPrescription.png";
    prescriptionAddNewIcon.alt = "Add Prescription";
    prescriptionAddNewIcon.classList.add("prescription-btn");
    prescriptionAddNewIcon.dataset.id = rowData.patient.id;
    prescriptionAddNewIcon.id = "prescriptionAddNewIcon"
    prescriptionAddNewTd.appendChild(prescriptionAddNewIcon);

    return [ patientIdTd, patientNameTd, patientPhoneTd, patientEmailTd, prescriptionAddNewTd ];
}

