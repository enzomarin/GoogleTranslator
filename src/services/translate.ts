import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SOPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types'

// ESTO NO DEBERIA ESTAR DEL LADO DEL CLIENTE
// ESTO DEBERIA SER UNA API EN EL BACKEND

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
console.log('apiKey: ', apiKey)

const configuration = new Configuration({ apiKey })

const openai = new OpenAIApi(configuration)

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a IA that translate text, you receive a text from the user. Do not answer, just translate the text. The original language is surrounded  by `{{` and `}}`. Your can also recive {{ auto }} which means that you have to detect the language. The language  you translate to is surrounded by `[[` and `]]`. '
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bon dia, com estas? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿Cómo estás?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SOPPORTED_LANGUAGES[fromLanguage]
  const toCode = SOPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}
