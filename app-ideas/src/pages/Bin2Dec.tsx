import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export function Bin2Dec() {
  const [binary, setBinary] = useState('')
  const [decimal, setDecimal] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleConvert = () => {
    setError('')
    setDecimal(null)

    // Validate binary input
    if (!binary) {
      setError('Please enter a binary number')
      return
    }

    if (!/^[01]+$/.test(binary)) {
      setError('Please enter only 0s and 1s')
      return
    }

    // Convert binary to decimal
    const result = parseInt(binary, 2)
    setDecimal(result)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBinary(value)
    setError('')
    setDecimal(null)
  }

  const handleClear = () => {
    setBinary('')
    setDecimal(null)
    setError('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Binary to Decimal Converter</h1>
        <p className="text-muted-foreground">
          Convert binary numbers to decimal format
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bin2Dec</CardTitle>
          <CardDescription>
            Enter a binary number (using only 0s and 1s) to convert it to decimal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="binary" className="text-sm font-medium">
              Binary Number
            </label>
            <Input
              id="binary"
              type="text"
              placeholder="Enter binary number (e.g., 1010)"
              value={binary}
              onChange={handleInputChange}
              className="font-mono text-lg"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              Convert
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>

          {decimal !== null && (
            <div className="p-4 rounded-lg bg-accent/50 border">
              <p className="text-sm text-muted-foreground mb-1">Decimal Result</p>
              <p className="text-3xl font-bold font-mono">{decimal}</p>
            </div>
          )}

          <div className="pt-4 border-t space-y-2">
            <p className="text-sm font-medium">Examples:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>1010 → 10</div>
              <div>1111 → 15</div>
              <div>10000 → 16</div>
              <div>11111111 → 255</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
