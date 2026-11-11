import * as Avatar from '../../../../middle/avatar/avatarsFactory.js';
import * as AvatarsProps from '../../../../middle/avatar/avatarsProps.js';
import * as RowFactory from '../../../../basics/spans/spansFactory.js';
import * as RowProps from '../../../../basics/spans/spansProps.js';
import * as MenuProps from '../../../../middle/menus/kebab-menus/dropdownMenuProps.js';
import * as HeaderProps from './entity-card-headers-props/entityCardHeadersProps.js';
//import {spanWithTextAndKebabProps} from "../../../../basics/spans/spansProps.js";

export function createEl(headerProps) {
  const header = document.createElement("header");
  const mappedDropdownMenuProps = mapHeaderPropsToDropdownMenuProps(headerProps, MenuProps.dropdownMenuProps);

  const avatarProps = setupAvatarProps(headerProps.entity.value)
  const infoSectionProps = setupInfoSectionProps(
    HeaderProps.getDefaultInfoSectionProps(headerProps.entity.value),
    headerProps.entity.value,
    mappedDropdownMenuProps,
  );

  header.appendChild(Avatar.createEl(avatarProps, ""));
  header.appendChild(createInfoSectionEl(infoSectionProps));
  return header;
}

function setupAvatarProps(entityValue) {
  return Avatar.mapResourceToAvatarProps(
    AvatarsProps.doctorAvatarProps,
    entityValue.photoName,
  );
}

function setupInfoSectionProps(defaultInfoSectionProps, entityValue, dropdownMenuProps) {
  return {
    className: defaultInfoSectionProps.className,
    nameAndKebabSectionProps: setupNameAndKebabSectionProps(entityValue, dropdownMenuProps),
    iconAndDataRowsProps: setupIconAndDataRowsProps(RowProps.spanProps, defaultInfoSectionProps.entityIconAndDataRowsProps),
  };
}

function setupNameAndKebabSectionProps(entityValue, dropdownMenuProps) {
  return {
    spanProps: {
      className: RowProps.spanWithTextAndKebabProps.spanProps.className,
    },
    textProps: {
      className: RowProps.spanWithTextAndKebabProps.textProps.className,
      textContent: entityValue.name,
    },
    kebabProps: {
      containerProps: {
        className: RowProps.spanWithTextAndKebabProps.kebabProps.containerProps.className,
      },
      togglerMenuProps: {
        className: RowProps.spanWithTextAndKebabProps.kebabProps.togglerMenuProps.className,
        eventListener: {
          type: 'click',
          handler: '',
        },
      },
      imgProps: {
        ...RowProps.spanWithTextAndKebabProps.kebabProps.imgProps,
      },
      dropdownMenuProps: dropdownMenuProps,
      entityValue: entityValue,
    },
  };
}

function setupIconAndDataRowsProps(spanProps, entityIconAndDataRowsProps) {
  const rowsProps = [];
  entityIconAndDataRowsProps.forEach(entityRowProps => {
    rowsProps.push(
      mapEntityDataToIconAndDataRowProps(spanProps, entityRowProps)
    );
  })
  return rowsProps;
}

function createInfoSectionEl({ className, nameAndKebabSectionProps, iconAndDataRowsProps }) {
  const container = document.createElement('div');
  container.className = className;

  container.appendChild(
    createNameAndKebabRowEl(nameAndKebabSectionProps)
  );

  iconAndDataRowsProps.forEach(iconAndDataRowProps => {
    container.append(
      createIconAndEntityAttributeRowEl(iconAndDataRowProps)
    )
  });
  return container;
}

function createNameAndKebabRowEl(spanWithTextAndKebabProps) {
  return RowFactory.createTitleAndKebabMenuRowEl(spanWithTextAndKebabProps);
}

function createIconAndEntityAttributeRowEl(iconAndDataRowProps) {
  return RowFactory.createIconAndTextRowEl(iconAndDataRowProps);
}

function mapHeaderPropsToDropdownMenuProps(headerProps, dropdownMenuProps) {
  return {
    ...dropdownMenuProps,
    optionsProps: [
      {
        ...dropdownMenuProps.optionsProps[0],
        linkProps: {
          ...dropdownMenuProps.optionsProps[0].linkProps,
          eventListener: {
            ...dropdownMenuProps.optionsProps[0].linkProps.eventListener,
            handler: headerProps.events[0].eventListener.handler,
          }
        }
      },
      dropdownMenuProps.optionsProps[1],
      dropdownMenuProps.optionsProps[2],
      {
        ...dropdownMenuProps.optionsProps[3],
        linkProps: {
          ...dropdownMenuProps.optionsProps[3].linkProps,
          eventListener: {
            ...dropdownMenuProps.optionsProps[3].linkProps.eventListener,
            handler: headerProps.events[1].eventListener.handler,
          }
        }
      },
    ]
  };
}

function mapHeaderPropsToDropdownMenuPropsV2(headerProps, dropdownMenuProps) {
  const mappedDropdownMenuProps = { ...dropdownMenuProps };
  mappedDropdownMenuProps.optionsProps[0].linkProps.eventListener.handler = headerProps.events[0].eventListener.handler;
  mappedDropdownMenuProps.optionsProps[3].linkProps.eventListener.handler = headerProps.events[1].eventListener.handler;
  return  dropdownMenuProps;
}

function mapEntityDataToIconAndDataRowProps(spanProps, iconAndDataRowProps) {
  let rowWithoutTooltipProps =  {
    props: {
      className: spanProps.props.className,
    },
    children: {
      icon: {
        props: {
          className: spanProps.children['icon'].props.className,
          src: iconAndDataRowProps.iconProps.src,
          alt: iconAndDataRowProps.iconProps.alt,
        }
      },
      text: {
        props: {
          className: spanProps.children['text'].props.className,
          textContent: iconAndDataRowProps.textProps.textContent,
        },
      }
    }
  };

  if (iconAndDataRowProps.tooltipProps) {
    return mapRowWithTooltipProps(spanProps, rowWithoutTooltipProps, iconAndDataRowProps.tooltipProps);
  } else {
    return rowWithoutTooltipProps;
  }
}

function mapRowWithTooltipProps(spanProps, rowWithoutTooltipProps, tooltipProps) {
  return {
    ...rowWithoutTooltipProps,
    children: {
      ...rowWithoutTooltipProps.children,
      tooltip: {
        props: {
          className: spanProps.children['tooltip'].props.className,
        },
        children: {
          text: {
            props: {
              className: spanProps.children['tooltip'].children['text'].props.className,
              textContent: tooltipProps.textProps.textContent,
            }
          },
          icon: {
            props: {
              className: spanProps.children['tooltip'].children['icon'].props.className,
              src: tooltipProps.iconProps.src,
              alt: tooltipProps.iconProps.alt,
            },
          },
        },
      }
    }
  };
}