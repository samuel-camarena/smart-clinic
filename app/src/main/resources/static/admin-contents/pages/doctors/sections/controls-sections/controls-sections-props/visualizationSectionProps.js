
export const visualizationProps = {
  sectionProps: {
    className: 'inline-controls-section',
  },
  inlineContainerProps: {
    className: ''
  },
  labelProps: {
    className: 'showing-results-found',
    textContent: 'Showing X doctors',
    id: 'showingResultsFoundLabel'
  },
  buttonsProps: [
    {
      eventListener: {
        type: 'click',
        handler: () => document.toggleCardsSize(),
      },
      id: 'toggleCardsVisualization',
      textContent: '[-|-]',
      className: 'alternative-btn',
    }
  ]
}