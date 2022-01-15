import React, { createContext, useReducer } from 'react'

export const AppContext = createContext({
  activeStep: 0,
  handleNext() { },
  handleBack() { },
  handleReset() { }
})

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        activeStep: state.activeStep + 1
      }
    case 'decrease':
      return {
        ...state,
        activeStep: state.activeStep - 1
      }
    case 'reset':
      return {
        ...state,
        activeStep: 0
      }

    default:
      return state
  }
}

export function StepsProvider({ children }) {
  const [{ activeStep }, dispatch] = useReducer(reducer, { activeStep: 0 })

  // Proceed to next step
  const handleNext = () => dispatch({ type: 'increase' })
  // Go back to prev step
  const handleBack = () => dispatch({ type: 'decrease' })
  // Proceed to next step
  const handleReset = () => dispatch({ type: 'reset' })

  return (
    <AppContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        handleReset
      }}
    >
      <div>{children}</div>
    </AppContext.Provider>
  )
}
