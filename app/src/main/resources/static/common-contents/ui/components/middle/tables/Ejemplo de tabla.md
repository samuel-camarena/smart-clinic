/*
export function createDoctorCard(doctor, role) {
const cardEl = document.createElement("div");
const cardInfoContainerEl = document.createElement("div");
const cardActionsContainerEl = document.createElement("div");
const cardTitleEl = document.createElement("h3");
const cardInfoFieldRelevant1El = document.createElement("div");
const cardInfoField1El = document.createElement("div");
//const cardInfoHiddenIdField = document.createElement("div");
const cardInfoTableEl = document.createElement("table");
const cardInfoTableCapEl = document.createElement("caption");
const cardInfoTableBodyEl = document.createElement("tbody");
const cardInfoTableRow1El = document.createElement("tr");
const cardInfoTableRow2El = document.createElement("tr");
const cardInfoTableCell1El = document.createElement("td");
const cardInfoTableCell2El = document.createElement("td");
const cardInfoTableCell3El = document.createElement("td");
const cardInfoTableCell4El = document.createElement("td");

cardInfoTableEl.appendChild(cardInfoTableCapEl);
cardInfoTableEl.appendChild(cardInfoTableBodyEl);
cardInfoTableBodyEl.appendChild(cardInfoTableRow1El);
cardInfoTableBodyEl.appendChild(cardInfoTableRow2El);
cardInfoTableRow1El.appendChild(cardInfoTableCell1El);
cardInfoTableRow1El.appendChild(cardInfoTableCell3El);
cardInfoTableRow2El.appendChild(cardInfoTableCell2El);
cardInfoTableRow2El.appendChild(cardInfoTableCell4El);

cardInfoContainerEl.appendChild(cardTitleEl);
cardInfoContainerEl.appendChild(cardInfoFieldRelevant1El);
cardInfoContainerEl.appendChild(cardInfoField1El);
//cardInfoContainer.appendChild(cardInfoHiddenIdField);
cardInfoContainerEl.appendChild(cardInfoTableEl);
cardEl.appendChild(cardInfoContainerEl);
cardEl.appendChild(cardActionsContainerEl);

cardTitleEl.textContent = doctor.name; // `${doctor.name}`
cardInfoFieldRelevant1El.textContent = doctor.specialty;
//cardInfoHiddenIdField.textContent = doctor.id;
cardInfoField1El.textContent = doctor.email;
cardInfoTableCapEl.textContent = "Availability";
cardInfoTableCell1El.textContent = doctor.availableTimes[0];
cardInfoTableCell2El.textContent = doctor.availableTimes[1];
cardInfoTableCell3El.textContent = doctor.availableTimes[2];
cardInfoTableCell4El.textContent = doctor.availableTimes[3];

cardEl.setAttribute("id", `card${++numCards}`);

cardEl.classList.add("doctor-card"); // darle id al cardContainer -> id=doctorCard1 id=doctorCard2
cardInfoContainerEl.classList.add("doctor-info");
cardActionsContainerEl.classList.add("card-actions");
cardInfoFieldRelevant1El.classList.add("info-relevant");

switch (role.toLowerCase()) {
case "admin":
cardActionsContainerEl.append(...createAdminButtons(doctor, cardEl.id));
break;
case "patient":
cardActionsContainerEl.append(...createPatientButtons());
break;
case "loggedPatient":
//cardActionsContainer.append(...createLoggedPatientButtons());
break;
default:
}
return cardEl;
}
*/