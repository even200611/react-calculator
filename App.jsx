import { useState } from 'react'

function CalculatorButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl text-xl font-semibold transition hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (number) => {
    if (waitingForOperand) {
      setDisplay(number)
      setWaitingForOperand(false)
      return
    }

    setDisplay(display === '0' ? number : display + number)
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clearCalculator = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const calculate = (first, second, selectedOperator) => {
    if (selectedOperator === '+') return first + second
    if (selectedOperator === '-') return first - second
    if (selectedOperator === '×') return first * second
    if (selectedOperator === '÷') {
      if (second === 0) return null
      return first / second
    }
    return second
  }

  const chooseOperator = (selectedOperator) => {
    const inputValue = parseFloat(display)

    if (operator && waitingForOperand) {
      setOperator(selectedOperator)
      return
    }

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else {
      const result = calculate(previousValue, inputValue, operator)

      if (result === null) {
        setDisplay('Error')
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperator(selectedOperator)
    setWaitingForOperand(true)
  }

  const handleEquals = () => {
    if (operator === null || previousValue === null) return

    const inputValue = parseFloat(display)
    const result = calculate(previousValue, inputValue, operator)

    if (result === null) {
      setDisplay('Error')
    } else {
      setDisplay(String(result))
    }

    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
      <div className="mb-5 rounded-2xl bg-gray-900 p-5 text-right">
        <div className="h-10 text-sm text-gray-400">
          {operator && previousValue !== null
            ? `${previousValue} ${operator}`
            : ''}
        </div>

        <div className="overflow-hidden text-4xl font-bold text-white">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <CalculatorButton
          onClick={clearCalculator}
          className="col-span-2 bg-red-500 text-white hover:bg-red-600"
        >
          AC
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator('÷')}
          className="bg-orange-400 text-white hover:bg-orange-500"
        >
          ÷
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator('×')}
          className="bg-orange-400 text-white hover:bg-orange-500"
        >
          ×
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('7')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          7
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('8')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          8
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('9')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          9
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator('-')}
          className="bg-orange-400 text-white hover:bg-orange-500"
        >
          −
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('4')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          4
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('5')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          5
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('6')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          6
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator('+')}
          className="bg-orange-400 text-white hover:bg-orange-500"
        >
          +
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('1')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          1
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('2')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          2
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('3')}
          className="bg-gray-200 hover:bg-gray-300"
        >
          3
        </CalculatorButton>

        <CalculatorButton
          onClick={handleEquals}
          className="row-span-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          =
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-200 hover:bg-gray-300"
        >
          0
        </CalculatorButton>

        <CalculatorButton
          onClick={inputDecimal}
          className="bg-gray-200 hover:bg-gray-300"
        >
          .
        </CalculatorButton>
      </div>
    </div>
  )
}

function UserGuide() {
  return (
    <div className="mt-8 max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-3 text-2xl font-bold text-gray-800">
        Instructions
      </h2>

      <p className="mb-3 text-gray-600">
        Use the calculator buttons to perform basic mathematical operations.
      </p>

      <ul className="space-y-2 text-gray-600">
        <li>• Use numbers 0–9 to enter values.</li>
        <li>• Use + for addition.</li>
        <li>• Use − for subtraction.</li>
        <li>• Use × for multiplication.</li>
        <li>• Use ÷ for division.</li>
        <li>• Press = to display the result.</li>
        <li>• Press AC to clear and reset the calculator.</li>
        <li>• Decimal numbers are supported.</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-800">
          React Calculator
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Basic Calculator using React and Tailwind CSS
        </p>

        <Calculator />

        <UserGuide />
      </div>
    </main>
  )
}

export default App