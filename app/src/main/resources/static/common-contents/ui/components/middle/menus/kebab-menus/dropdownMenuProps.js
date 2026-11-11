
export const dropdownMenuProps = {
  className: 'dropdown-menu',
  name: 'dropdown-menu',
  optionsProps: [
    {
      containerProps: {
        className: 'option-container',
      },
      iconProps: {
        className: 'icon',
        src: '/assets/images/common/menus/icons/edit_grey-500.svg',
        alt: 'Edit option icon',
      },
      linkProps: {
        className: 'link',
        textContent: 'Edit',
        href: '#',
        eventListener: {
          type: 'click',
          handler: null, // document.openEditDoctorFormulary,
        }
      },
    },
    {
      containerProps: {
        className: 'option-container',
      },
      iconProps: {
        className: 'icon',
        src: '/assets/images/common/menus/icons/schedule-icons/schedule-def.svg',
        alt: 'Appointments option icon',
      },
      linkProps: {
        className: 'link',
        textContent: 'Appointments',
        href: '#',
        eventListener: {
          type: 'click',
          handler: null,
        }
      },
    },
    {
      containerProps: {
        className: 'option-container',
      },
      separatorProps: {
        className: 'separator',
      }
    },
    {
      containerProps: {
        className: 'option-container',
      },
      iconProps: {
        className: 'icon',
        src: '/assets/images/common/menus/icons/delete_grey-500.svg',
        alt: 'Delete option icon',
      },
      linkProps: {
        className: 'link',
        textContent: 'Delete',
        id: '',
        href: '#',
        eventListener: {
          type: 'click',
          handler: null, // document.openDeleteDoctorConfirmDialog,
        }
      },
    },
  ],
};


/*
export const dropdownMenuProps = {
  className: 'dropdown-menu',
  name: 'dropdown-menu',
  optionsProps: {
    edit:
      {
        {
          containerProps: {
            className: 'option-container',
          },
        iconProps: {
          className: 'icon',
          src: '/assets/images/common/menus/icons/edit_grey-500.svg',
          alt: 'Edit option icon',
        },
        linkProps: {
          className: 'link',
          textContent: 'Edit',
          href: '#',
          eventListener: {
            type: 'click',
            handler: document.openEditDoctorFormulary,
          }
        },
      },
  }, {
    containerProps: {
      className: 'option-container',
    },
    iconProps: {
    className: 'icon',
      src: '/assets/images/common/menus/icons/medical_information_grey-500.svg',
      alt: 'More info option icon',
    },
    linkProps: {
      className: 'link',
      textContent: 'More info',
      href: '#',
      eventListener: {
        type: 'click',
        handler: null,
      }
    },
  },
}
};

 */