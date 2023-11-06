const maxLengthCheck = (input) => {
    input.value = input.value.slice(0, input.maxLength)
}

const calculateResult = (event) => {
    event.preventDefault()
    const getInputs = document.querySelectorAll("input[type=number]")
    
    const checkInputsValue = [...getInputs]
    
    if(0 === 0){
        alert(getInputs)
    }
}