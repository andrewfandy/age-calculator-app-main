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
         invalidError: "Must be in a past",
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

// Input Validation Area
const showError = (msg, wrapper) => {
   const getInputWrapper = document.querySelector(
      `.input-wrapper.${wrapper.name}`
   );

   getInputWrapper.style.borderColor = "red";
   let displayErrorMessage = document.querySelector(
      `.error-message.${wrapper.name}`
   );

   if (!displayErrorMessage) {
      displayErrorMessage = document.createElement("p");
      displayErrorMessage.classList.add("error-message", `${wrapper.name}`);
      getInputWrapper.appendChild(displayErrorMessage);
      displayErrorMessage.textContent = msg;
   }
   return false;
};

// Invalid Date
const maximumDayOnMonth = () => {
   const yearValue = inputElements.inputYear.getElement.value;
   const monthValue = inputElements.inputMonth.getElement.value;
   return new Date(yearValue, monthValue, 0).getDate();
};

// const isEmptyValidation = (inputValue, )
const inputValidation = (inputElementObject, inputElement) => {
   const errorMessages = inputElementObject.errorMsg;
   const getErrorMessage = document.querySelector(
      `.error-message.${inputElementObject.name}`
   );
   const inputValue = parseInt(inputElement.value, 10);
   let isValid = false;

   if (!inputValue) {
      showError(errorMessages.emptyError, inputElementObject);
   } else {
      if (getErrorMessage) {
         getErrorMessage.remove();
      }
   }

   if (
      inputValue > inputElementObject.max ||
      inputValue < inputElementObject.min
   ) {
      console.log("olin");
      showError(errorMessages.invalidError, inputElementObject);
   }

   if (inputElement.id === "inputDay" && inputValue) {
      if (inputValue !== maximumDayOnMonth()) {
         showError(errorMessages.errorDate, inputElementObject);
      } else {
         console.log("test");
      }
   }
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
      isValid = inputValidation(inputElementObject, getInputElement);
   });

   if (isValid) {
      console.log(true + " all");
   }
});
