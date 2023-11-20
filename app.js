// TODO 
// REFACTORING INPUTELEMENTS


const inputElements = {
    "userInputDay": document.getElementById("inputDay"),
    "userInputMonth": document.getElementById("inputMonth"),
    "userInputYear": document.getElementById("inputYear"),
};


const getCalendarDay = (year, month) => {
    return new Date(year, month, 0).getDate();
}

// Input Modification
const modifyInputLength = (input, maxlength) => {
    if(input.value.length > maxlength){
        input.value = input.value.slice(0, maxlength);
    }
}

const modifyUserInput = (input, maxlength) => {
    if(input.value.length !== maxlength && input.value > 0) {
        input.value = "0".repeat(maxlength - input.value.length) + input.value
    }
}

Object.values(inputElements).forEach(input => {
    const maxlength = input.getAttribute("maxlength");
    input.addEventListener("input", (event) => {
        modifyInputLength(event.target, maxlength);
    })

    input.addEventListener("blur", (event) => {
       modifyUserInput(event.target, maxlength);
    })
})


const inputValidation = {
    isLeapYear : (day, month, year) => {
        if(getCalendarDay(month, year) === day) {
            return true;
        }
    }   
}

const submit = document.querySelector("button");

submit.addEventListener("click", (event) => {
    try {
        const getUserInputValue = new Date (
        parseInt(inputElements["userInputYear"].value), 
        parseInt(inputElements["userInputMonth"].value), 
        parseInt(inputElements["userInputDay"].value)
        )
        alert(getUserInputValue);
    } catch (error) {
        alert(error);
    }
    })

