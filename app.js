const userFormInputs = {
    "userInputDay": document.getElementById("inputDay"),
    "userInputMonth": document.getElementById("inputMonth"),
    "userInputYear": document.getElementById("inputYear"),
};


Object.values(userFormInputs).forEach(input => {
    input.addEventListener("input", (event) => {
        const maxlength = input.getAttribute("maxlength");
        if(event.target.value.length > maxlength){
            event.target.value =event.target.value.slice(0, maxlength);
        }
    })
})

Object.values(userFormInputs).forEach(input => {
    input.addEventListener("blur", (event) => {
        const getInputValue = event.target.value;
        if(event.target.value.length === 1 && getInputValue <=9  && getInputValue >= 1) {
            event.target.value = "0" + event.target.value;
        }
    })
})

const checkLeapYear = (year) => {
    if(year % 400){
        return 29
    }
}
const calendarDay = {
    "01" : 31,
    "02" : checkLeapYear(userFormInputs["userInputYear"].value),
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