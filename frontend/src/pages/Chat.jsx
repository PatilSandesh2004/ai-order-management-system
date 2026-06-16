import { useState } from 'react'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import api from '../api/api'

const starterPrompts = [
  'What are the high risk orders today?',
  'Show me low stock inventory items.',
  'Give me a dashboard summary.',
]

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I can help you query orders, inventory, analytics, and reports. Ask me anything about the system.',
    },
  ])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async (text) => {
    const prompt = text.trim()
    if (!prompt || loading) return

    setError('')
    setQuestion('')
    setMessages((current) => [...current, { role: 'user', content: prompt }])
    setLoading(true)

    try {
      const response = await api.post('/chat/', { question: prompt })
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: response.data.answer || 'No answer returned.' },
      ])
    } catch {
      setError('Unable to reach the chat service. Make sure the backend and Groq configuration are running.')
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'I could not generate a response right now.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(question)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
      <div className="card overflow-hidden p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Chat Assistant</h1>
            <p className="mt-1 text-sm text-slate-500">Ask about operations, inventory, analytics, or reports.</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Try asking</p>
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700"
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-slate-100">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-indigo-300" />
            <p className="font-semibold">How it works</p>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>1. Your question is routed to the best tool automatically.</li>
            <li>2. The backend pulls live data from the relevant service.</li>
            <li>3. The assistant returns a plain-language answer.</li>
          </ul>
        </div>
      </div>

      <div className="card flex min-h-[70vh] flex-col p-0">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Conversation</h2>
          <p className="text-sm text-slate-500">Responses are generated from your backend tools.</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
            >
              {message.role === 'assistant' ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Bot className="h-5 w-5" />
                </div>
              ) : null}

              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {message.content}
              </div>

              {message.role === 'user' ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-600">
                  <User className="h-5 w-5" />
                </div>
              ) : null}
            </div>
          ))}

          {loading ? (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                Thinking...
              </div>
            </div>
          ) : null}
        </div>

        {error ? <div className="px-6 pb-2 text-sm text-red-600">{error}</div> : null}

        <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
          <div className="flex items-end gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question about your operations..."
              className="min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              rows={1}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
