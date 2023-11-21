const inputElements = {
  inputDay: {
    getElement: document.getElementById("inputDay"),
    maxlength: 2,
    min: 1,
    max: () => {
      const yearValue = inputElements.inputYear.getElement.value;
      const monthValue = inputElements.inputMonth.getElement.value;
      return new Date(yearValue, monthValue, 0).getDate();
    },
  },
  inputMonth: {
    getElement: document.getElementById("inputMonth"),
    maxlength: 2,
    min: 1,
    max: 12,
  },
  inputYear: {
    getElement: document.getElementById("inputYear"),
    maxlength: 4,
    min: 1,
    max: currentDate.getFullYear(),
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
const inputValidation = (input, max, min) => {
  if (input.value === "" || input.value === null || input.value === 0) {
  }
};

Object.values(inputElements).forEach((elemenObj) => {
  const maxlength = elemenObj.maxlength;
  const getInputElement = elemenObj.getElement;

  getInputElement.addEventListener("input", (event) => {
    modifyInputLength(event.target, maxlength);
  });

  getInputElement.addEventListener("blur", (event) => {
    modifyUserInput(event.target, maxlength);
  });
});

// Submit Area

const currentDate = new Date();

const submit = document.querySelector("button");

submit.addEventListener("click", (event) => {
  inputElements.inputDay.getElement.style.borderColor = "red";
});
