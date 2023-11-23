const currentDate = new Date();

// ADD ERROR KEY
const inputElements = {
  inputDay: {
    name: "inputDay",
    getElement: document.getElementById("inputDay"),
    maxlength: 2,
    min: 1,
    max: () => {
      const yearValue = inputElements.inputYear.getElement.value;
      const monthValue = inputElements.inputMonth.getElement.value;
      return new Date(yearValue, monthValue, 0).getDate();
    },
    errorMsg: "Must be a valid date",
  },
  inputMonth: {
    name: "inputMonth",
    getElement: document.getElementById("inputMonth"),
    maxlength: 2,
    min: 1,
    max: 12,
    errorMsg: "Must be a valid month",
  },
  inputYear: {
    name: "inputYear",
    getElement: document.getElementById("inputYear"),
    maxlength: 4,
    min: 1,
    max: currentDate.getFullYear(),
    errorMsg: "Must be a valid year",
  },
};

// Input Modification
const modifyInputLength = (input, maxlength) => {
  if (input.value.length > maxlength) {
    input.value = input.value.slice(0, maxlength);
  }
};

const modifyUserInput = (input, maxlength) => {
  if (input.value.length !== maxlength && input.value > 0) {
    input.value = "0".repeat(maxlength - input.value.length) + input.value;
  }
};

// Input Validation

// TODO
// REVISED LOGIC ON APPENCHILD
const inputValidation = (inputElementObject, inputElement) => {
  const errorColor = "red";
  const getInputWrapper = document.querySelector(
    `.input-wrapper.${inputElementObject.name}`
  );

  // change this
  const errorMessages = document.createElement("p");
  errorMessages.classList.add("error-messages");
  if (
    inputElement.value === "" ||
    inputElement.value === null ||
    inputElement.value === 1
  ) {
    inputElement.style.borderColor = errorColor;
    errorMessages.textContent = "This field is required";
    getInputWrapper.appendChild(errorMessages);
  } else {
    inputElement.style.borderColor = "";
    errorMessages.textContent = "";
    getInputWrapper.removeChild(errorMessages);
    errorMessages.remove();
  }
};

Object.values(inputElements).forEach((inputElementObject) => {
  const maxlength = inputElementObject.maxlength;
  const getInputElement = inputElementObject.getElement;

  getInputElement.addEventListener("input", (event) => {
    modifyInputLength(event.target, maxlength);
  });

  getInputElement.addEventListener("blur", (event) => {
    modifyUserInput(event.target, maxlength);
  });
});

// Submit Area

const submit = document.querySelector("button");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let isValid = true;
  Object.values(inputElements).forEach((inputElementObject) => {
    const getInputElement = inputElementObject.getElement;
    if (!inputValidation(inputElementObject, getInputElement)) {
      isValid = false;
    }
  });

  if (isValid) {
    displayResult();
  }
});
