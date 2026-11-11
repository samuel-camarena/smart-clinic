
//export function getCardProps({ entity: { Props, entityType, dropdownMenuProps }) {
export const cardProps = {
  entity: {
    type: '',
    value: null, //entityProps: entityProps
  },
  events: [],
};

const event = {
  name: '',
  eventListener: {
    type: '',
    handler: () => {},
  }
};