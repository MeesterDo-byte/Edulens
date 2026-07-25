import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { authService } from '@/lib/auth'

interface Question {
  left: number
  right: number
  answer: number
  options: number[]
}

const GAME_LENGTH = 10

const shuffle = (values: number[]) => [...values].sort(() => Math.random() - 0.5)

const createQuestion = (): Question => {
  const left = Math.floor(Math.random() * 10) + 2
  const right = Math.floor(Math.random() * 10) + 2
  const answer = left * right
  const wrongAnswers = new Set<number>()

  while (wrongAnswers.size < 3) {
    const offset = Math.floor(Math.random() * 19) - 9
    const wrongAnswer = answer + offset

    if (wrongAnswer > 0 && wrongAnswer !== answer) {
      wrongAnswers.add(wrongAnswer)
    }
  }

  return {
    left,
    right,
    answer,
    options: shuffle([answer, ...Array.from(wrongAnswers)]),
  }
}

export default function MaalGame() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState<Question>(() => createQuestion())
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [feedback, setFeedback] = useState('Kies het juiste antwoord!')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [router])

  const progress = useMemo(() => Math.round(((round - 1) / GAME_LENGTH) * 100), [round])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null || isFinished) {
      return
    }

    setSelectedAnswer(answer)

    const isCorrect = answer === question.answer
    if (isCorrect) {
      setScore(score + 1)
      setFeedback('Goed gedaan! 🎉')
    } else {
      setFeedback(`Bijna! Het juiste antwoord is ${question.answer}.`)
    }

    window.setTimeout(() => {
      if (round >= GAME_LENGTH) {
        setIsFinished(true)
        setFeedback('Je hebt de game uitgespeeld!')
        return
      }

      setRound(round + 1)
      setQuestion(createQuestion())
      setSelectedAnswer(null)
      setFeedback('Kies het juiste antwoord!')
    }, 900)
  }

  const restartGame = () => {
    setQuestion(createQuestion())
    setScore(0)
    setRound(1)
    setFeedback('Kies het juiste antwoord!')
    setSelectedAnswer(null)
    setIsFinished(false)
  }

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>Maal Game - EduLens</title>
        <meta name="description" content="Oefen tafels met de EduLens maal game" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50">
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <span>📚</span> EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-gray-600 hover:text-blue-900">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/analyses" className="text-gray-600 hover:text-blue-900">Analyses</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
              <li><Link href="/maal-game" className="text-blue-900 font-semibold">Maal Game</Link></li>
            </ul>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
            >
              Uitloggen
            </button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-8 py-10">
          <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-emerald-500 text-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">Rekenspel</p>
              <h1 className="text-4xl font-bold mt-2">✖️ Maal Game</h1>
              <p className="mt-3 text-blue-50 max-w-2xl">
                Train tafels van 2 tot en met 11 met snelle meerkeuzevragen. Perfect als korte rekenwarming-up in de klas.
              </p>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-2xl p-5">
                  <p className="text-sm text-blue-700 font-semibold">Vraag</p>
                  <p className="text-3xl font-bold text-blue-950">{Math.min(round, GAME_LENGTH)} / {GAME_LENGTH}</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-5">
                  <p className="text-sm text-emerald-700 font-semibold">Score</p>
                  <p className="text-3xl font-bold text-emerald-700">{score}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-5">
                  <p className="text-sm text-purple-700 font-semibold">Feedback</p>
                  <p className="text-lg font-bold text-purple-900">{feedback}</p>
                </div>
              </div>

              <div className="h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all" style={{ width: `${isFinished ? 100 : progress}%` }}></div>
              </div>

              {isFinished ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-5">🏆</div>
                  <h2 className="text-3xl font-bold text-gray-900">Eindscore: {score} van de {GAME_LENGTH}</h2>
                  <p className="text-gray-600 mt-3">
                    {score >= 8 ? 'Fantastisch gerekend!' : 'Goed geoefend! Probeer nog een ronde voor een hogere score.'}
                  </p>
                  <button
                    onClick={restartGame}
                    className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow transition"
                  >
                    Speel opnieuw
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 font-semibold mb-3">Wat is de uitkomst?</p>
                  <div className="text-6xl md:text-7xl font-extrabold text-blue-950 mb-8">
                    {question.left} × {question.right}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {question.options.map((option) => {
                      const isSelected = selectedAnswer === option
                      const isCorrect = option === question.answer
                      const resultClass = selectedAnswer === null
                        ? 'bg-white hover:bg-blue-50 border-blue-200 text-blue-950'
                        : isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : isSelected
                            ? 'bg-red-100 border-red-500 text-red-900'
                            : 'bg-gray-50 border-gray-200 text-gray-500'

                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className={`border-2 rounded-2xl py-5 text-3xl font-bold transition ${resultClass}`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
