import { useEffect, useState } from 'react'

// T como tipo queire decir que el tipo lo pase por parametro, (el usuario nos indica)
export function useDebounce<T>(value: T, delay = 500) { // el debounce recibe un valor que queremos observar si cambia y un delay
  // Necesitamos un estado que guarde el valor que estamos detectando si se ha cambiado hace x tiempo
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debouncedValue
}

/*
0ms -> user type
  useEffect... L9
150ms -> user type
  clear useEffect - L13
650ms -> setDebouncedValue - L10
*/
