import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SOPPORTED_LANGUAGES } from '../constants'
import React from 'react'
import { type FromLanguage, type Language } from '../types'
import { SectionType } from '../types.d'
type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SOPPORTED_LANGUAGES).map(([key, literal]) => {
        return (
          <option value={key} key={key}>
            {literal}
          </option>
        )
      })}
    </Form.Select>
  )
}
