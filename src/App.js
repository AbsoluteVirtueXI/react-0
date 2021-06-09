import React, { useEffect, useReducer, useState } from 'react'
// useEffect

function NumberInput({ id, type, value, onInputChange, isDisabled, children }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        disabled={isDisabled}
        value={value}
        onChange={onInputChange}
      />
    </>
  )
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step }
    case 'DECREMENT':
      return { ...state, count: state.count - state.step }
    case 'SET_STEP':
      return { ...state, step: action.step }
    case 'RESET':
      return { ...state, count: 0 }
    default:
      throw new Error(`Unhandled action ${action.type} in counterReducer`)
  }
}

const initialCounterState = {
  count: 0,
  step: 1,
}

function Counter({ initialStep, onCount, isDisabled }) {
  const [counterState, dispatchCounter] = useReducer(counterReducer, {
    ...initialCounterState,
    step: initialStep,
  })

  const handleIncrement = () => {
    dispatchCounter({ type: 'INCREMENT' })
    onCount((cur) => Number(cur) + 1)
  }

  const handleDecrement = () => {
    dispatchCounter({ type: 'DECREMENT' })
    onCount((cur) => Number(cur) + 1)
  }

  const handleStepChange = (event) => {
    if (!isNaN(event.target.value)) {
      dispatchCounter({ type: 'SET_STEP', step: Number(event.target.value) })
    }
  }

  const handleReset = () => {
    dispatchCounter({
      type: 'RESET',
      step: 0,
    })
  }

  return (
    <>
      {console.log('Counter rendered')}
      <p>
        count:{counterState.count} <button onClick={handleReset}>reset</button>
      </p>
      <button onClick={handleIncrement} disabled={isDisabled}>
        +
      </button>
      <button onClick={handleDecrement} disabled={isDisabled}>
        -
      </button>
      <NumberInput
        id="step"
        type="text"
        value={counterState.step}
        onInputChange={handleStepChange}
        isDisabled={isDisabled}
      >
        step:
      </NumberInput>
    </>
  )
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue)

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [nbOp, setNbOp] = useLocalStorage('nbOp', 0)
  const [isDisabled, setIsDisabled] = useState(false)

  const clearLocalStorage = () => {
    setNbOp(0)
    setIsDisabled(false)
  }

  useEffect(() => {
    console.log('IN USEEFFECT BEFORE IF')
    if (nbOp > 20) {
      console.log('IN USEFFECT AFTER IF')
      setIsDisabled(true)
    }
  }, [nbOp])

  return (
    <>
      {console.log('App rendered')}
      <h1>Hello HardFork</h1>
      <p>nb operations: {nbOp}</p>
      {nbOp > 20 && (
        <>
          <h3 style={{ color: 'red' }}>
            You have reachead the limit, please{' '}
            <a
              href={
                'https://thephnompen.files.wordpress.com/2012/02/i-am-not-a-scammer-he-is.jpg'
              }
            >
              PAY
            </a>
          </h3>
          <button onClick={clearLocalStorage}>clear local storage</button>
        </>
      )}
      <Counter initialStep={1} onCount={setNbOp} isDisabled={isDisabled} />
    </>
  )
}

export default App
