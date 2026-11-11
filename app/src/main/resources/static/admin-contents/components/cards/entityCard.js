import * as Header from '../../../common-contents/ui/components/advance/cards/card-headers/entity-card-headers/entityCardHeadersFactory.js';
import * as Body from '../../../common-contents/ui/components/advance/cards/card-bodies/entity-card-bodies/entityCardBodiesFactory.js';
import * as Footer from '../../../common-contents/ui/components/advance/cards/card-footers/entity-card-footers/entityCardFootersFactory.js';

let numCards;

export function init() {
  numCards = 0;
}

export function createEl(cardProps) {
  const card = createCardEl()
  const headerProps = setupHeaderProps(cardProps);
  const bodyProps = setupBodyProps(cardProps);
  const footerProps = setupFooterProps(cardProps);

  card.appendChild(Header.createEl(headerProps));
  card.appendChild(Body.createEl(bodyProps));
  card.appendChild(Footer.createEl(footerProps));
  return card;
}

function createCardEl() {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card${++numCards}`; // darle id al cardContainer -> id=doctorCard1 id=doctorCard2
  return card;
}

function setupHeaderProps(cardProps) {
  return {
    type: cardProps.type,
    size: cardProps.size,
    entity: cardProps.entity,
    events: cardProps.events,
  };
}

function setupBodyProps(cardProps) {
  return {
    type: cardProps.type,
    size: cardProps.size,
    entity: cardProps.entity,
  };
}

function setupFooterProps(cardProps) {
  return {
    type: cardProps.type,
    size: cardProps.size,
    entity: cardProps.entity,
  };
}
/*
function createPatientButtons() {
  const bookNow = document.createElement('button');
  bookNow.textContent = 'Book Now';
  bookNow.addEventListener('click', () => {
    alert('Patient needs to login first.');
  });
  return [bookNow];
}

function createLoggedPatientButtons() {
  const bookNow = document.createElement('button');
  bookNow.textContent = 'Book Now';
  bookNow.addEventListener('click', async (e) => {
    const token = localStorage.getItem('token');
    const patientData = await getPatientData(token);
    showBookingOverlay(e, doctor, patientData);
  });
  return [bookNow];
}

 */