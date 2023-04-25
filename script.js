class Calculator {
    constructor(prev, result) {
        this.prev = prev;
        this.result = result;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // delete() {
    //     this.currentOperand = this.currentOperand.slice(0, -1)
    // }

    appendNum(num) {
        if (num === ',' && this.currentOperand.includes(',')) return
        this.currentOperand = this.currentOperand.toString() + num.toString()
    }

    chooseOpera(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const pre = parseFloat(this.previousOperand);
        const cur = parseFloat(this.currentOperand);
        if (isNaN(pre) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = pre + cur
                break
            case '-':
                computation = pre - cur
                break
            case '×':
                computation = pre * cur
                break
            case '÷':
                computation = pre / cur
                break
            case '%':
                computation = pre % cur
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNum(num) {
        const stringNum = num.toString()
        const intergerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
        return floatNum.toLocaleString('en')
    }

    updateDisplay() {
        this.result.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null) {
            this.prev.innerText = ` ${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        } else {
            this.prev.innerText = ''
        }
    }
}

const numBtns = document.querySelectorAll('[data-num]');
const operBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const delAllBtn = document.querySelector('[data-all-clear]');
const prev = document.querySelector('[data-prev]');
const result = document.querySelector('[data-result]');

const calculator = new Calculator(prev, result);

numBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // let ev = e.target.textContent;
        // console.log(ev);
        calculator.appendNum(btn.innerText);
        calculator.updateDisplay();
    })
})

operBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // let ev = e.target.textContent;
        // console.log(ev);
        calculator.chooseOpera(btn.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener("click", btn => {
    calculator.compute()
    calculator.updateDisplay()
})

delAllBtn.addEventListener("click", btn => {
    calculator.clear()
    calculator.updateDisplay()
})