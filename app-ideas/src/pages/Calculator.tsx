import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

type Operation = '+' | '-' | '*' | '/' | null

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumberClick = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimalClick = () => {
    if (shouldResetDisplay) {
      setDisplay('0.')
      setShouldResetDisplay(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperationClick = (op: Operation) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculateResult(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculateResult = (prev: number, current: number, op: Operation): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display)
      const result = calculateResult(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const buttonClass = "h-14 text-lg font-medium"
  const operatorClass = "h-14 text-lg font-medium bg-primary/10 hover:bg-primary/20"

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calculator</h1>
        <p className="text-muted-foreground">
          Perform basic arithmetic operations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
          <CardDescription>
            A simple calculator for addition, subtraction, multiplication, and division
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-accent/50 border rounded-lg p-4">
            <div className="text-right">
              {previousValue !== null && operation && (
                <div className="text-sm text-muted-foreground mb-1">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-4xl font-bold font-mono break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {/* First Row */}
            <Button variant="outline" onClick={handleClear} className={buttonClass}>
              AC
            </Button>
            <Button variant="outline" onClick={handleBackspace} className={buttonClass}>
              ←
            </Button>
            <Button variant="outline" onClick={() => handleOperationClick('/')} className={operatorClass}>
              ÷
            </Button>
            <Button variant="outline" onClick={() => handleOperationClick('*')} className={operatorClass}>
              ×
            </Button>

            {/* Second Row */}
            <Button variant="outline" onClick={() => handleNumberClick('7')} className={buttonClass}>
              7
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('8')} className={buttonClass}>
              8
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('9')} className={buttonClass}>
              9
            </Button>
            <Button variant="outline" onClick={() => handleOperationClick('-')} className={operatorClass}>
              −
            </Button>

            {/* Third Row */}
            <Button variant="outline" onClick={() => handleNumberClick('4')} className={buttonClass}>
              4
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('5')} className={buttonClass}>
              5
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('6')} className={buttonClass}>
              6
            </Button>
            <Button variant="outline" onClick={() => handleOperationClick('+')} className={operatorClass}>
              +
            </Button>

            {/* Fourth Row */}
            <Button variant="outline" onClick={() => handleNumberClick('1')} className={buttonClass}>
              1
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('2')} className={buttonClass}>
              2
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick('3')} className={buttonClass}>
              3
            </Button>
            <Button onClick={handleEquals} className="row-span-2 h-auto text-lg font-medium">
              =
            </Button>

            {/* Fifth Row */}
            <Button variant="outline" onClick={() => handleNumberClick('0')} className={`${buttonClass} col-span-2`}>
              0
            </Button>
            <Button variant="outline" onClick={handleDecimalClick} className={buttonClass}>
              .
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
