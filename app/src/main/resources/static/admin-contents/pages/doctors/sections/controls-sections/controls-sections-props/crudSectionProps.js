
export const crudProps = {
  sectionProps: {
    className: 'inline-controls-section',
  },
  inlineContainerProps: {
    className: '',
  },
  buttonsProps: [
    {
      id: 'adminEnrollDoctorBtn',
      textContent: 'Add +',
      className: '',
      eventListener: {
        type: 'click',
        handler: () => document.openRegisterFormulary(),
      },
    },
  ],
}