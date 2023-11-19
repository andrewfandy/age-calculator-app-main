const getInputElements = {
    "userInputDay": document.getElementById("inputDay"),
    "userInputMonth": document.getElementById("inputMonth"),
    "userInputYear": document.getElementById("inputYear"),
};

const checkLeapYear = (year) => {
    if(year % 400){
        return 29
    }
}
const calendarDay = {
    "01" : 31,
    "02" : checkLeapYear(getInputElements["userInputYear"].value),
    "03" : 31,
    "04" : 31,
    "05" : 31,
    "06" : 31,
    "07" : 31,
    "08" : 31,
    "09" : 31,
    "10" : 31,
    "11" : 31,
    "12" : 31,
}

const validateInputLength = (input, maxlength) => {
    if(input.value.length > maxlength){
        input.value = input.value.slice(0, maxlength);
    }
}

const modifyUserInput = (input, maxlength) => {
    if(input.value.length !== maxlength && input.value > 0) {
        input.value = "0".repeat(maxlength - input.value.length) + input.value
    }
}

const validateInputUser = (input, day, month, year) => {
    
}
Object.values(getInputElements).forEach(input => {
    const maxlength = input.getAttribute("maxlength");
    input.addEventListener("input", (event) => {
        validateInputLength(event.target, maxlength);
    })

    input.addEventListener("blur", (event) => {
       modifyUserInput(event.target, maxlength);
       validateInputUser(
        event.target,
        getInputElements["userInputDay"],
        getInputElements["userInputMonth"],
        getInputElements["userInputYear"],
        )
    })
})

