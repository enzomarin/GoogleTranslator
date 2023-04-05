
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    resultText,
    setFromLanguage,
    setToLanguage,
    interchangeLenguages,
    setFromText,
    setResult
  } = useStore()
  const debouncedFromText = useDebounce(fromText, 500)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch((error) => {
        console.log('error :', error)

        setResult('Error al traducir')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboardClick = () => {
    navigator.clipboard.writeText(resultText).catch(() => { })
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(resultText)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }
  return (
    <Container>
      <h2>Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}

            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLenguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage} />
          <div style={{ position: 'relative' }}>
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={resultText}
              onChange={setResult}
            />
            <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
              <Button
                variant='link'
                onClick={handleClipboardClick}>
                <ClipboardIcon />
              </Button>

              <Button
                variant='link'
                onClick={handleSpeak}>
                <SpeakerIcon />
              </Button>
            </div>

          </div>
        </Col>
      </Row>

    </Container>
  )
}

export default App
