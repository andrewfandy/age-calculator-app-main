const inputElementList = {
   inputDay: {
      element: document.getElementById("inputDay"),
      maxlength: 2,
      min: 1,
      max: 31,
      errorMsg: {
         emptyError: "This field is required",
         validError: "Must be a valid day",
         exceedDate: "Must be in a past",
         dateError: "Must be a valid date",
      },
   },
   inputMonth: {
      element: document.getElementById("inputMonth"),
      maxlength: 2,
      min: 1,
      max: 12,
      errorMsg: {
         emptyError: "This field is required",
         validError: "Must be a valid month",
         exceedDate: "Must be in a past",
         dateError: "",
      },
   },
   inputYear: {
      element: document.getElementById("inputYear"),
      maxlength: 4,
      min: 1,
      max: new Date().getFullYear(),
      errorMsg: {
         emptyError: "This field is required",
         validError: "Must be in a past",
         exceedDate: "Must be in a past",
         dateError: "",
      },
   },
};

const modifyInputLength = (input) => {
   const maxlength = inputElementList[input.id].maxlength;
   if (input.value.length > maxlength) {
      input.value = input.value.slice(0, maxlength);
   }
};

const modifyUserInput = (input) => {
   const maxlength = inputElementList[input.id].maxlength;

   if (input.value.length < maxlength && input.value > 0) {
      input.value = "0".repeat(maxlength - input.value.length) + input.value;
   }
};

const onInputEventListeners = () => {
   Object.values(inputElementList).forEach((inputElement) => {
      const element = inputElement.element;
      element.addEventListener("input", (event) => {
         modifyInputLength(event.target);
      });

      element.addEventListener("blur", (event) => {
         modifyUserInput(event.target);
      });
   });
};

onInputEventListeners();

const getCurrentDate = () => {
   return new Date();
};

const setInputDate = () => {
   const inputDate = new Date();
   inputDate.setFullYear(
      parseInt(inputElementList.inputYear.element.value, 10)
   );
   inputDate.setMonth(
      parseInt(inputElementList.inputMonth.element.value, 10) - 1
   );
   inputDate.setDate(parseInt(inputElementList.inputDay.element.value, 10));
   return inputDate;
};

const isValidDate = () => {
   const year = parseInt(document.getElementById("inputYear").value, 10);
   const month = parseInt(document.getElementById("inputMonth").value, 10);
   const day = parseInt(document.getElementById("inputDay").value, 10);

   return new Date(year, month, 0).getDate() >= day;
};
const displayErrorMessage = (msg, inputId) => {
   const wrapper = document.querySelector(`.input-wrapper.${inputId}`);

   const getInputElement = document.querySelectorAll("input");
   [...getInputElement].map((element) => {
      return (element.style.borderColor = "hsl(0, 100%, 67%)");
   });
   const errorMessage =
      wrapper.querySelector(".error-message") || document.createElement("p");
   errorMessage.classList.add("error-message", `${inputId}`);

   wrapper.appendChild(errorMessage);
   errorMessage.textContent = msg;
};

const submitValidation = (input) => {
   const getInputAttributes = inputElementList[input.id];
   const value = parseInt(input.value, 10);
   const { min, max, errorMsg } = getInputAttributes;
   const getErrorMessage = document.querySelector(`.error-message.${input.id}`);
   if (!value) {
      displayErrorMessage(errorMsg.emptyError, input.id);
      return false;
   } else if (value > max || value < min) {
      displayErrorMessage(errorMsg.validError, input.id);
      return false;
   } else if (!isValidDate()) {
      displayErrorMessage(errorMsg.dateError, input.id);
      return false;
   } else {
      if (setInputDate() > getCurrentDate()) {
         displayErrorMessage(errorMsg.exceedDate, input.id);
         return false;
      }

      if (getErrorMessage) {
         getErrorMessage.remove();
         document.querySelector(
            `.input-wrapper.${input.id} input`
         ).style.borderColor = "";
      }
   }
   return true;
};

const displayResult = () => {
   const inputDate = setInputDate();
   const currDate = getCurrentDate();

   let showYear = currDate.getFullYear() - inputDate.getFullYear();
   let showMonth = currDate.getMonth() - inputDate.getMonth();
   let showDay = currDate.getDate() - inputDate.getDate();

   if (showDay < 0) {
      showMonth -= 1;
      showDay += new Date(
         currDate.getFullYear(),
         currDate.getMonth(),
         0
      ).getDate();
   }

   if (showMonth < 0) {
      showYear -= 1;
      showMonth += 12;
   }

   const getYearOutput = document.getElementById("showYear");
   const getMonthOutput = document.getElementById("showMonth");
   const getDayOutput = document.getElementById("showDay");

   getYearOutput.textContent = showYear;
   getMonthOutput.textContent = showMonth;
   getDayOutput.textContent = showDay;
};

const onSubmitEventListeners = () => {
   const form = document.querySelector(".form-input-wrapper");

   form.addEventListener("submit", (event) => {
      event.preventDefault();
      let isFormValid = true;

      Object.values(inputElementList).forEach((inputElement) => {
         const element = inputElement.element;
         if (!submitValidation(element)) {
            isFormValid = false;
         }
      });

      if (isFormValid) {
         displayResult();
      }
   });
};

onSubmitEventListeners();
