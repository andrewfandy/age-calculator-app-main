const currentDate = new Date();

// ADD ERROR KEY
const inputElements = {
  inputDay: {
    name: "inputDay",
    getElement: document.getElementById("inputDay"),
    maxlength: 2,
    min: 1,
    max: 31,
    errorMsg: {
      emptyError: "This field is required",
      invalidError: "Must be a valid day",
      errorDate: "Must be a valid date",
    },
  },
  inputMonth: {
    name: "inputMonth",
    getElement: document.getElementById("inputMonth"),
    maxlength: 2,
    min: 1,
    max: 12,
    errorMsg: {
      emptyError: "This field is required",
      invalidError: "Must be a valid month",
      errorDate: "",
    },
  },
  inputYear: {
    name: "inputYear",
    getElement: document.getElementById("inputYear"),
    maxlength: 4,
    min: 1,
    max: currentDate.getFullYear(),
    errorMsg: {
      emptyError: "This field is required",
      invalidError: "Must be a valid year",
      errorDate: "",
    },
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

// Input Validation, must return true or false
const showError = (msg, wrapper) => {
  console.log(msg, wrapper);
  return false;
};
const inputValidation = (inputElementObject, inputElement) => {
  const errorMessages = inputElementObject.errorMsg;

  const getInputWrapper = document.querySelector(
    `.input-wrapper.${inputElementObject.name}`
  );
  let isValid = true;

  if (inputElement.value === "" || inputElement.value === null) {
    isValid = showError(errorMessages.emptyError, getInputWrapper);
  }

  const inputValue = parseInt(inputElement.value, 10);
  // Invalid Day(Must be valid day), Month(Must be valid month), Year(must be in past)

  if (
    inputValue < inputElementObject.min ||
    inputValue > inputElementObject.max
  ) {
    isValid = showError(errorMessages.invalidError, getInputWrapper);
  }

  // Invalid Date
  const maximumDayOnMonth = () => {
    const yearValue = inputElements.inputYear.getElement.value;
    const monthValue = inputElements.inputMonth.getElement.value;
    return new Date(yearValue, monthValue, 0).getDate();
  };

  console.log(maximumDayOnMonth === inputValue);
  return isValid;
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
    console.log(true + " all");
  }
});
