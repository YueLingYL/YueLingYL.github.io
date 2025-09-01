import React, { useState } from 'react';
import './Toolbox.css';

interface CalculatorProps {
  onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation !== null && !waitingForOperand) {
      const currentValue = previousValue;
      let newValue: number;
      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }
      setDisplay(newValue.toString());
      setPreviousValue(newValue.toString());
    } else {
      setPreviousValue(display);
    }
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (operation === null || previousValue === null) {
      return;
    }
    handleOperator('=');
    setOperation(null);
    setPreviousValue(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const handleNegate = () => {
    const currentValue = parseFloat(display);
    if (!isNaN(currentValue)) {
      setDisplay((-currentValue).toString());
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    if (!isNaN(currentValue)) {
      setDisplay((currentValue / 100).toString());
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="tool-modal">
      <div className="tool-header">
        <h2>计算器</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="calculator-container">
        <div className="calculator-display">{display}</div>
        <div className="calculator-buttons">
          <button className="calculator-button function" onClick={handleClear}>AC</button>
          <button className="calculator-button function" onClick={handleClearEntry}>CE</button>
          <button className="calculator-button function" onClick={handleNegate}>+/-</button>
          <button className="calculator-button operator" onClick={() => handleOperator('/')}>÷</button>
          
          <button className="calculator-button digit" onClick={() => handleDigit('7')}>7</button>
          <button className="calculator-button digit" onClick={() => handleDigit('8')}>8</button>
          <button className="calculator-button digit" onClick={() => handleDigit('9')}>9</button>
          <button className="calculator-button operator" onClick={() => handleOperator('*')}>×</button>
          
          <button className="calculator-button digit" onClick={() => handleDigit('4')}>4</button>
          <button className="calculator-button digit" onClick={() => handleDigit('5')}>5</button>
          <button className="calculator-button digit" onClick={() => handleDigit('6')}>6</button>
          <button className="calculator-button operator" onClick={() => handleOperator('-')}>-</button>
          
          <button className="calculator-button digit" onClick={() => handleDigit('1')}>1</button>
          <button className="calculator-button digit" onClick={() => handleDigit('2')}>2</button>
          <button className="calculator-button digit" onClick={() => handleDigit('3')}>3</button>
          <button className="calculator-button operator" onClick={() => handleOperator('+')}>+</button>
          
          <button className="calculator-button digit zero" onClick={() => handleDigit('0')}>0</button>
          <button className="calculator-button digit" onClick={handleDecimal}>.</button>
          <button className="calculator-button function" onClick={handlePercentage}>%</button>
          <button className="calculator-button equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;