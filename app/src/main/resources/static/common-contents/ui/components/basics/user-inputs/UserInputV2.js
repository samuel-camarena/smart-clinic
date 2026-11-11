
class UserInputEl extends HTMLElement {
  labelEl = document.createElement("label");
  inputEl = document.createElement("input");
  complementaryTextEl = document.createElement("p");

  constructor({labelProps, inputProps, textProps}) {
    super();
    this.setup();
    this.setupLabelEl(labelProps);
    this.setupInputEl(inputProps);
    this.setupComplementaryTextEl(textProps);
    // this.setupTooltipEl(tooltipProps);

    this.append(
      this.labelEl,
      this.inputEl,
      this.complementaryTextEl
    )
  }

  setup() {
    // determinar el tipo de Elemento HTML -> div contendor.
  }

  setupLabelEl(labelProps) {
    this.labelEl.textContent = "Your email";
    this.labelEl.setAttribute("for", "identifier");
  }

  setupInputEl(inputProps) {
    this.inputEl.setAttribute("type","email");
    this.inputEl.setAttribute("required", "true");
    this.inputEl.setAttribute("id", "identifier");
    this.inputEl.setAttribute("name", "idByEmail");
    this.inputEl.setAttribute("placeholder","name@smartclinic.com");
  }

  setupComplementaryTextEl(textProps) {
    this.complementaryTextEl.setAttribute("id", "identifierErrorSpan");
    this.complementaryTextEl.classList.add("error", "hide");
  }

  // get label
  // get input
  // get errLabel

  render() {

  }

  getValue() {
    // return input.value
  }

  isValueMissing() {
    //idInputEl.validity.valueMissing
  }

  showError() {
    // field-error-show
  }

  clearError() {
    // field-error-hide (or toggle removing error-show)
  }
}

export default UserInputEl;