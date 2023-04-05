
import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import { type Action, type State, type Language, type FromLanguage } from '../types'

// 1. Create a initial State
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  resultText: '',
  loading: false
}
// 2. Create a reducer
function reducer(state: State, action: Action) {
  // Recuperamos el tipo desde action
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      loading,
      fromText: state.resultText,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''
    return {
      ...state,
      fromText: action.payload,
      loading,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      resultText: action.payload,
      loading: false
    }
  }

  // Si no hay ningun tipo devolvemos el mismo state
  return state
}

export function useStore() {
  // Utilizamos en hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    resultText,
    loading
  }, dispatch] = useReducer(reducer, initialState) // No es correcto retornar directamente el dispatch

  // Creamos contratos para cada accion
  const interchangeLenguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }
  return {
    fromLanguage,
    toLanguage,
    fromText,
    resultText,
    loading,
    interchangeLenguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
