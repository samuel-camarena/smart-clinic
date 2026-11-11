import * as FooterProps from './entity-card-footers-props/entityCardFootersProps.js';

export function createEl({ entity }) {
  const footer = document.createElement('footer');
  // TODO: Refactorizar este map.
  const footerProps = setupFooterProps(FooterProps.defaultFooterProps, entity.value);

  footer.appendChild(
    createMetricsSectionEl(footerProps.children['section'])
  );
  return footer;
}

function setupFooterProps(defaultFooterProps, entityValue) {
  // TODO: cambiar el icono de 4 / 5 corazones por el correspondiente al rating del doctor.
  const mappedFooterProps = defaultFooterProps; // [1] metric years of experience
  mappedFooterProps
    .children['section']
      .children[1]
        .children['textualValue'].props.textContent = entityValue.yearsOfExperience;

  return mappedFooterProps;
}

function createMetricsSectionEl({ props, children }) {
  const section = document.createElement('section');
  section.className = props.className;

  children.forEach(metricContainer => {
    section.appendChild(
      createMetricContainerEl(metricContainer));
  })

  return section;
}

function createMetricContainerEl({ props, children }) {
  const container = document.createElement('div');
  const description = document.createElement('p');

  container.className = props.className; //container.className = "metric-container";

  if (children['icon']) {
    const iconicValue = document.createElement('img');
    iconicValue.className = children['icon'].props.className; // "metric-iconic-value";
    iconicValue.src = children['icon'].props.src; // "/assets/images/common/cards/users-rating-metric-4-out-of-5-as-hearts-icon.svg";
    iconicValue.alt = children['icon'].props.alt; //"Users Rating icon";
    container.appendChild(iconicValue);

  } else if (children['textualValue']) {
    const textualValue = document.createElement('p');
    textualValue.className = children['textualValue'].props.className;
    textualValue.textContent = children['textualValue'].props.textContent;
    container.appendChild(textualValue);
  }

  description.className = children['description'].props.className; //"metric-description";
  description.textContent = children['description'].props.textContent; //"User rating";

  container.appendChild(description);
  return container;
}