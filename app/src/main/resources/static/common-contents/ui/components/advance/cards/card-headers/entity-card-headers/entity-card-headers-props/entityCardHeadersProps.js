/*
tooltipProps: {
  textContent: entityValue.phone, // span -> p y (img icon)
}

inline-info-container {
  ...
  position: relative;
}
span del tooltip {
	position: absolute;
	background: black;
}

p del tooltip {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: white;
}
icono del tooltip {
  dsadsad
}
 */
export function getDefaultInfoSectionProps(entityValue) {
  return {
    className: 'info-container',
    entityIconAndDataRowsProps: [
      {
        iconProps: {
          src: '/assets/images/common/cards/apartment.svg',
          alt: 'Apartment icon',
        },
        textProps: {
          textContent: entityValue.specialty,
        },
      },
      {
        iconProps: {
          src: '/assets/images/common/cards/mail.svg',
          alt: 'Email icon',
        },
        textProps: {
          textContent: entityValue.email,
        },
        tooltipProps: {
          textProps: {
            textContent: entityValue.email,
          },
          iconProps: {
            src: '/assets/images/common/menus/icons/content_copy.svg',
            alt: 'Copy content icon',
          }
        }
      },
      {
        iconProps: {
          src: '/assets/images/common/cards/phone_enabled.svg',
          alt: 'Phone icon',
        },
        textProps: {
          textContent: entityValue.phone,
        },
      },
    ]
  };
}