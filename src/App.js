import React, { useEffect, useState } from 'react'
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

function Counter({ initialStep, onCount, isDisabled }) {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(initialStep)

  const handleIncrement = () => {
    setCount((cur) => cur + step)
    onCount((cur) => Number(cur) + 1)
  }

  const handleDecrement = () => {
    setCount((cur) => cur - step)
    onCount((cur) => Number(cur) + 1)
  }

  const handleStepChange = (event) => {
    if (!isNaN(event.target.value)) {
      setStep(Number(event.target.value))
    }
  }

  return (
    <>
      {console.log('Counter rendered')}
      <p>
        count:{count} <button onClick={() => setCount(0)}>reset</button>
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
        value={step}
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
      <Counter initialStep={20} onCount={setNbOp} isDisabled={isDisabled} />
    </>
  )
}

export default App
