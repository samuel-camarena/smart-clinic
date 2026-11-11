
export const spanProps = {
  props: {
    className: 'inline-info-container',
  },
  children: {
    icon: {
      props: {
        className: 'icon',
        src: '',
        alt: '',
      },
    },
    text: {
      props: {
        className: 'text text-ellipsis',
        textContent: '',
      },
    },
    tooltip: {
      props: {
        className: 'tooltip',
      },
      children: {
        text: {
          props: {
            className: 'text',
          }
        },
        icon: {
          props: {
            className: 'icon',
          }
        }
      }
    }
  },
};

export const spanWithTextAndKebabProps = {
  spanProps: {
    className: 'inline-resource-id-container'
  },
  textProps: {
    className: 'resource-name text-ellipsis',
    textContent: ''
  },
  kebabProps: {
    containerProps: {
      className: 'kebab-menu'
    },
    togglerMenuProps: {
      className: 'toggler-menu',
      eventListener: {
        type: 'click',
        handler: '',
      },
    },
    imgProps: {
      className: 'kebab-icon',
      src: '/assets/images/common/menus/icons/menu-more-actions-vert_icon.svg',
      alt: 'Kebab menu icon'
    },
    dropdownMenuProps: {},
  }
}
