import * as CardFactory from '../../../../../components/cards/entityCard.js';
import * as CardProps from '../../../../../components/cards/entityCardProps.js';
import {catalogProps} from "./entitiesCatalogSectionProps.js";

const ENTITIES_CATALOG_SECTION_ID = 'entitiesCatalogSection';
const cardType = {
  type: 'entity',
  size: 'complete',
}

export function createEl(catalogProps) {
  const section = createSectionEl();
  // TODO: mapear catalogProps a entitiesCatalogProps

  if (!catalogProps?.entity?.values) {
    console.warn(`No entities provided by Contents Manager to the Catalog Section`);
    return section;
  }
  const cardsProps = mapCatalogPropsToEntityCardsProps(catalogProps, cardType);

  let cards;
  switch (catalogProps.entity.type) {
    case 'doctors':
    case 'patients':
      //cards = createEntityCardEls(CatalogProps.entity.values, CatalogProps.entity.type, dropdownMenuProps);
      cards = createEntityCardEls(cardsProps);
      break;
    case 'appointments':
      // tabla.
      break;
    default:
      break;
  }

  if (!cards || cards.length === 0) {
    //section.appendChild(createNotFoundMsgEl()); // call to ErrorSection to return a errorSectionEl properly configured.
    section.appendChild(document.createTextNode("No entities found"));
  } else {
    section.append(...cards);
  }
  return section;
}

export function getUpdatedCatalogEl(catalogProps) {
  // TODO: Revisar la creación y eliminación de Sección, casi mejor utilizar siempre Create tanto en inicio
  //  como actualización dado que comprueba que haya entities y cards.
  /*
  let section;
  switch (entityType) {
    case 'doctors':
    case 'patients':
      if (getCatalogContainerEl()) {
        clearCatalogSection();
        getCatalogContainerEl().append(
          ...createEntityCardEls(entities, entityType, dropdownMenuProps)
        );
      } else {
        section = createEl(entities, entityType);
      }
      break;
    case 'appointments':
      break;
    default:
      break;
  }
  */
  clearCatalogSection();
  return createEl(catalogProps);
}

export function removeContent(contentProps) {
  switch (contentProps.type) {
    case 'card':
      document.getElementById(contentProps.cardId).remove();
      break;
    default:
      break;
  }
}

export function mapCatalogPropsToEntityCardsProps(catalogProps, cardType) {
  const entityCardsProps = [];
  // TODO: revisar el tipo de Tarjeta: const cardType = 'complete'; // admin-doctor complete

  catalogProps.entity.values.forEach(entityValue => {
    /*
    const cardProps = CardProps.cardProps;
    cardProps.type = cardType.type;
    cardProps.size = cardType.size;
    cardProps.entity.type = catalogProps.entity.type;
    cardProps.entity.value = entityValue;

    catalogProps.events.forEach(event => {
      const eventProps = {
        name: event.name,
        eventListener: {
          type: '',
          handler: event.handler,
        },
      }
      cardProps.events.push(eventProps);
    });

    entityCardsProps.push(cardProps);
    */
    entityCardsProps.push(
      createCardProps(
        cardType,
        entityValue,
        catalogProps.entity.type,
        catalogProps.events
      ));
  });

  return entityCardsProps;
}

function createSectionEl() {
  const section = document.createElement('section');
  section.id = ENTITIES_CATALOG_SECTION_ID;
  section.className = 'entities-catalog-section';
  return section;
}

function createEntityCardEls(cardsProps) {
  let cards = [];
  CardFactory.init();

  cardsProps.forEach(cardProps => {
    cards.push(
      CardFactory.createEl(cardProps)
    );
  });

  return cards;
}

function createCardProps(cardType, entityValue, entityType, events) {
  const cardProps = {
    type: cardType.type,
    size: cardType.size,
    entity: {
      type: entityType,
      value: entityValue,
    },
    events: [],
  };

  events.forEach(event => {
    const eventProps = {
      name: event.name,
      eventListener: {
        type: '',
        handler: event.handler,
      },
    }
    cardProps.events.push(eventProps);
  });

  return cardProps;
}

/*
export function toggleCardsSize() {
  if (document.documentElement.style.getPropertyValue('--card-body-toggle-display') === 'none') {
    document.documentElement.style.setProperty('--card-body-toggle-display', 'flex');
  } else {
    document.documentElement.style.setProperty('--card-body-toggle-display', 'none');
  }
}

 */

function clearCatalogSection() {
  getCatalogContainerEl()?.replaceChildren();
}

function getCatalogContainerEl() {
  return document.getElementById(ENTITIES_CATALOG_SECTION_ID);
}

/*
function mapEntityDataToProps(entities, entityType, dropdownMenuProps) {
  const entitiesProps = [];

  entities.forEach(entity => {
    entitiesProps.push({
      entityProps: {
        ...entity,
      },
      entityType: entityType,
      dropdownMenuProps: dropdownMenuProps,
    });
  })
  return entitiesProps;
}
 */

/*
export function hide() {
  getCatalogContainerEl().style.display = "none";
}
*/