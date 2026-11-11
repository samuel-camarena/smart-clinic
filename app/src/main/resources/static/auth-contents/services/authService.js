import * as Config from "../../common-contents/config/config.js";
import { ErrorDTO } from "../../common-contents/DTOs/ErrorDTO.js";

export async function authenticate(loginDTO) {
  const response = await fetch(
    Config.API_AUTH_LOGIN_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginDTO)
    });
  const resBody = await response.json();

  if (response.ok) {
    return {
      success: true,
      resBody: resBody
    };
  } else {
    return {
      success: false,
      errorDTO: new ErrorDTO(resBody)
    };
  }
}
