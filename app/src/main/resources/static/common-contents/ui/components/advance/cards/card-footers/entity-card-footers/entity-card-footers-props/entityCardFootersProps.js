export const defaultFooterProps = {
  props: {
    className: 'footer',
  },
  children: {
    section: {
      props: {
        className: 'metrics-section',
      },
      children: [
        {
          props: {
            className: 'metric-container',
            type: 'iconicValue',
            componentName: 'metricContainer',
          },
          children: {
            icon: {
              props: {
                className: 'metric-icon',
                src: '/assets/images/common/cards/users-rating-metric-4-out-of-5-as-hearts-icon.svg',
                alt: 'Users Rating iconic value',
              }
            },
            description: {
              props: {
                className: 'description',
                textContent: 'Patients rating',
              },
            },
          },
        },
        {
          props: {
            className: 'metric-container',
            type: 'textualValue',
            componentName: 'metricContainer',
          },
          children: {
            textualValue: {
              props: {
                className: 'textual-value',
                textContent: '11',
              },
            },
            description: {
              props: {
                className: 'description',
                textContent: 'Years active',
              },
            },
          },
        },
        {
          props: {
            className: 'metric-container',
            type: 'textualValue',
            componentName: 'metricContainer',
          },
          children: {
            textualValue: {
              props: {
                className: 'textual-value',
                textContent: '211',
              }
            },
            description: {
              props: {
                className: 'description',
                textContent: 'Patients helped',
              },
            },
          },
        },
      ],
    },
  },
};