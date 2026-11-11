//import * as Config from '../../../../../../common-contents/config/config.js';
import * as Utils from '../../../../../../common-contents/utils/util.js';

// TODO: Switch / Case Buenas prácticas.
export function createEl(errorProps) {
  switch (errorProps.type) {
    case "notFound":
      return createNotFoundMsgEl(errorProps);
    case "notAvailable":
      return createNotAvailableMsgEl(errorProps);
    case "generic":
      return createGenericErrorMsgEl(errorProps);
    default:
      break;
  }
}

export function createNotFoundMsgEl({ dto, entity }) {
  const msg = document.createElement("h3");
  msg.textContent = dto?.userMessage
    ? dto?.userMessage
    : `${Utils.capitalize(entity.type)} not found by the matching criteria. Please try again.`;
  msg.id = "noDataFoundP";
  return msg;
}

export function createNotAvailableMsgEl({ dto, entity }) {
  const msg = document.createElement("h3");
  msg.textContent = dto?.userMessage
    ? dto?.userMessage
    : `${Utils.capitalize(entity.type)} not available. Please try again later.`;
  msg.id = "noDataFoundP";
  return msg;
}


export function createGenericErrorMsgEl({ dto, entity }) {
  const msg = document.createElement("h3");
  msg.textContent = dto?.userMessage
    ? dto?.userMessage
    : `Generic error managing: ${Utils.capitalize(entity.type)}. Please try again.`;
  msg.id = "noDataFoundP";
  return msg;
}


/*
export function composeErrorDtoMsg(errorDto, funcName) {
  try {
    let msg = "", htmlMsg = "";
    if (errorDto.fieldErrors != null) {
      for (let field in errorDto.fieldErrors) {
        msg += `Invalid field: ${field}\n`;
        errorDto.fieldErrors[field]
          .forEach((error) => {
              msg += `- ${error}\n`
            }
          );
        msg += "\n";
      }
      return msg;
    }
    switch (funcName) {
      case "adminDeleteDoctor":
        msg += `${Config.DOCTOR_DELETE_ERR_MSG}\n`;
        //`- Doctor ${Config.DELETE_ERR_INVALID_ID_MSG} ${errorDto.customAdhocParams.get("doctorId")}`;
        break;
      case "filterDoctorsOnChange":
        msg += `Error while filtering Doctors: ${errorDto}`;
        htmlMsg = "Doctors not found by the matching criteria, please try again.";
        break;
      default:
        msg += "❗ Generic Error: Origin function name not found";
        break;
    }
    return {msg, htmlMsg};
  } catch (error) {
    return Config.DOCTOR_UPDATE_ERR_MSG; // TODO: chose which entity an operation belongs the default message.
  }
}
 */