import React, { useState } from 'react';

function Calculator({ playSound }) {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState('');
    const [operator, setOperator] = useState(null);
    const [shouldReset, setShouldReset] = useState(false);

    const evaluate = (a, b, op) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch (op) {
            case '+': return numA + numB;
            case '-': return numA - numB;
            case '*': return numA * numB;
            case '/': return numB === 0 ? 'Error' : numA / numB;
            default: return numB;
        }
    };

    const handleCalc = (val) => {
        playSound('bubble');

        if (!isNaN(val) || val === '.') {
            if (shouldReset) {
                setDisplay(val);
                setShouldReset(false);
            } else {
                if (val === '.' && display.includes('.')) return;
                setDisplay(prev => prev === '0' ? val : prev + val);
            }
        } else if (val === 'C') {
            setDisplay('0');
            setPrevValue('');
            setOperator(null);
            setShouldReset(false);
        } else if (val === '=') {
            if (operator && prevValue !== '') {
                const result = String(evaluate(prevValue, display, operator));
                setDisplay(result);
                setOperator(null);
                setPrevValue('');
                setShouldReset(true);
            }
        } else {
            // Math operators
            if (operator && !shouldReset) {
                const result = String(evaluate(prevValue, display, operator));
                setPrevValue(result);
                setDisplay(result);
            } else {
                setPrevValue(display);
            }
            setOperator(val);
            setShouldReset(true);
        }
    };

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['C', '0', '=', '+']
    ];

    return (
        <div className="calculator-app" style={{ 
            height: '100%', 
            background: 'linear-gradient(to bottom, #d9e4f1, #c4d5e9)', 
            padding: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
        }}>
            <div id="calc-display" style={{ 
                background: 'linear-gradient(to bottom, #eef4fb 0%, #ffffff 100%)', 
                border: '1px solid #718bb7', 
                borderRadius: '4px', 
                padding: '12px', 
                textAlign: 'right', 
                fontSize: '32px', 
                fontFamily: '"Segoe UI", "Consolas", monospace',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.8)',
                color: '#1e395b',
                minHeight: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}>
                {display}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', flex: 1 }}>
                {buttons.flat().map((btn) => {
                    const isOperator = ['/', '*', '-', '+'].includes(btn);
                    const isEquals = btn === '=';
                    const isClear = btn === 'C';
                    
                    let btnStyle = { fontSize: '16px', fontWeight: '500' };
                    
                    if (isEquals) {
                        btnStyle = {
                            ...btnStyle,
                            background: 'linear-gradient(to bottom, #ffbf75 0%, #ff9d2b 50%, #ff8c00 51%, #ffb459 100%)',
                            border: '1px solid #a36500',
                            color: '#fff',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        };
                    } else if (isOperator) {
                        btnStyle = {
                            ...btnStyle,
                            background: 'linear-gradient(to bottom, #dbe9f9 0%, #b8d2ef 50%, #a4c4e8 51%, #bcd6f2 100%)',
                            border: '1px solid #718bb7'
                        };
                    } else if (isClear) {
                        btnStyle = {
                            ...btnStyle,
                            background: 'linear-gradient(to bottom, #fee8e8 0%, #f8d4d4 50%, #f4c0c0 51%, #fce5e5 100%)',
                            border: '1px solid #b77171'
                        };
                    }

                    return (
                        <button 
                            key={btn} 
                            className="win7-btn-glass" 
                            style={btnStyle} 
                            onClick={() => handleCalc(btn)}
                        >
                            {btn}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Calculator;
