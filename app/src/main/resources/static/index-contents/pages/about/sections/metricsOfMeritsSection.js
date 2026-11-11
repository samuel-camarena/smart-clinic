
//function MetricsOfMeritsSection() {
const sectionProps = {
  className: "metrics-of-merits-section",
  metricsContainersProps: [
    {
      containerProps: {
        className: "metric-container",
      },
      textualValueProps: {
        className: "textual-value",
        textContent: "132",
      },
      descriptionProps: {
        className: "description",
        textContent: "Doctors",
      },
    },
    {
      containerProps: {
        className: "metric-container",
      },
      textualValueProps: {
        className: "textual-value",
        textContent: "1440",
      },
      descriptionProps: {
        className: "description",
        textContent: "Doctors",
      },
    },
    {
      containerProps: {
        className: "metric-container",
      },
      textualValueProps: {
        className: "textual-value",
        textContent: "31",
      },
      descriptionProps: {
        className: "description",
        textContent: "Specialties",
      },
    },
  ]
};

export function create(props) {
  const section = document.createElement("section");
  section.className = sectionProps.className;

  sectionProps
    .metricsContainersProps.forEach(metricProps =>
      section.appendChild(
        createMetricContainerEl(metricProps)
      )
  )
  return section;
}

function createMetricContainerEl({ containerProps, textualValueProps, descriptionProps }) {
  const container = document.createElement("div");
  const textualValue = document.createElement("h4");
  const description = document.createElement("h5");

  container.className = containerProps.className;
  textualValue.className = textualValueProps.className;
  textualValue.textContent = textualValueProps.textContent;
  description.className = descriptionProps.className;
  description.textContent = descriptionProps.textContent;

  container.append(
    textualValue,
    description
  );
  return container;
}

//export default MetricsOfMeritsSection;