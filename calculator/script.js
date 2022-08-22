class Calculator{
    constructor (previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete(){
            this.currentOperand= this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){ /* basilan sayiyi ekrana yazma */
        if (number === "." && this.currentOperand.includes(".")) return  /*sadece tek bir nokta tusunu kabul edecek, birden fazla basilmayacak */
        this.currentOperand = this.currentOperand.toString() + number.toString() /*cok basamakli sayi yazdirmak icin */
    }
    
    chooseOperation(operation){ /* tiklanilan matematiksel operatorler */
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation/*ust islemin gectigimiz isleme esit oldugunu soyledik. boylece hangi sayilarla islem yapması gerektigini bilecek */
        this.previousOperand = this.currentOperand /**gecerli sayiyi yazmayi bitirdik bu yuzden onu onceki sayiya donustutuyoruz */
        this.currentOperand = ""
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat (this.currentOperand)
        if ( isNaN(prev) || isNaN(current)) return /*onceki sayi yoksa veya su an bir sayi yoksa islem yapma(????)*/
        switch (this.operation){ /* ama eger sayilar varsa bu islemlere basildiginda hesaplamaya devam edebilirsin */
            case "+" :
                computation = prev + current
                break
            case "-" :
                computation = prev - current
                break
            case "*" :
                computation = prev * current
                break
            case "/" :
                computation = prev / current
                break     
            default:
                return   
        }
        this.currentOperand = computation
        this.operation = undefined 
        this.previousOperand= ""
    }

    getDisplayNumber(number){/* sayi buyudukce basamaklar virgulle ayrilacak */
        const stringNumber =number.toString()
        const integerDigits =parseFloat(stringNumber.split(".")[0])  /*parseFLoat ile ondalikli sayiya donusturuyoruz.  */
        const decimalDigits =stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
          integerDisplay =""
        } else{
          integerDisplay = integerDigits.toLocaleString   ("en",{
              maximumFractionDigits :0})
        }
        if (decimalDigits!= null){
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` /*girdigimiz sayidan sonra bir operatore bastigimizda girdigimiz sayi ve operator ust tarafa tasinacak */
        } else{
            this.previousOperandTextElement.innerText = ""
        }
        
    }
}




const numberButtons = document.querySelectorAll("[data-number")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")


const calculator = new Calculator( previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener ("click", () => { 
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay() /*her islem yaptigimda bastigim seyleri ekrana yansitacak */
    })
})

operationButtons.forEach(button => {
    button.addEventListener ("click", () => { 
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() /*her islem yaptigimda bastigim seyleri ekrana yansitacak */
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => { /*eger yanlıs sayi girdiysem sayiyi komple silmeden sadece birler basamagindaki sayiyi silmeye yarar */
    calculator.delete()
    calculator.updateDisplay()
})