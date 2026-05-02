import { useMemo, useState } from 'react'

const blocks = [
  {
    name: 'Digestión y confort abdominal',
    questions: [
      '¿Sientes hinchazón después de comer?',
      '¿Tienes dolor abdominal frecuente?',
      '¿Presentas gases en exceso?',
      '¿Sientes pesadez tras comidas normales?',
      '¿Notas acidez o reflujo?',
      '¿Tu apetito cambia de forma irregular?'
    ]
  },
  {
    name: 'Tránsito intestinal',
    questions: [
      '¿Tienes estreñimiento de forma recurrente?',
      '¿Presentas diarrea frecuente?',
      '¿Tus evacuaciones son incompletas?',
      '¿Alternas entre estreñimiento y diarrea?',
      '¿Necesitas esfuerzo para evacuar?',
      '¿Sientes urgencia intestinal repentina?'
    ]
  },
  {
    name: 'Energía y vitalidad',
    questions: [
      '¿Te sientes cansado al despertar?',
      '¿Tienes bajones de energía durante el día?',
      '¿Te cuesta concentrarte después de comer?',
      '¿Sientes fatiga sin causa clara?',
      '¿Te falta motivación física diaria?',
      '¿Percibes agotamiento al final de la tarde?'
    ]
  },
  {
    name: 'Inflamación y respuesta corporal',
    questions: [
      '¿Sientes rigidez o inflamación general?',
      '¿Presentas molestias articulares frecuentes?',
      '¿Notas retención de líquidos?',
      '¿Tienes cefaleas asociadas a digestión?',
      '¿Tu piel se irrita con facilidad?',
      '¿Sientes sensibilidad alimentaria?'
    ]
  },
  {
    name: 'Estado emocional y estrés',
    questions: [
      '¿Tu estrés afecta tu digestión?',
      '¿Sientes ansiedad relacionada con comidas?',
      '¿Tienes irritabilidad frecuente?',
      '¿Te cuesta relajarte al final del día?',
      '¿El descanso nocturno es insuficiente?',
      '¿Sientes tensión corporal constante?'
    ]
  },
  {
    name: 'Hábitos y autocuidado',
    questions: [
      '¿Comes muy rápido habitualmente?',
      '¿Saltas comidas con frecuencia?',
      '¿Hidratas poco durante el día?',
      '¿Consumes ultraprocesados a diario?',
      '¿Haces poca actividad física semanal?',
      '¿Tu rutina de sueño es irregular?'
    ]
  }
]

const options = [0, 1, 2, 3]
const labels = ['Nunca', 'A veces', 'Frecuente', 'Muy frecuente']

function interpretation(total) {
  if (total <= 27) return 'Riesgo bajo: tu equilibrio intestinal es favorable. Mantén tus hábitos saludables.'
  if (total <= 54) return 'Riesgo moderado: hay señales tempranas que ameritan ajustes de estilo de vida y seguimiento.'
  if (total <= 81) return 'Riesgo alto: tu intestino muestra desequilibrios relevantes que requieren intervención guiada.'
  return 'Riesgo muy alto: es recomendable una evaluación profesional integral y acción prioritaria.'
}

export default function App() {
  const totalQuestions = 36
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const questions = useMemo(
    () => blocks.flatMap((block, bi) => block.questions.map((q, qi) => ({ block: bi, qi, text: q }))),
    [],
  )

  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const blockScores = blocks.map((b, bi) =>
    b.questions.reduce((acc, _, qi) => acc + (answers[`${bi}-${qi}`] ?? 0), 0),
  )
  const totalScore = blockScores.reduce((a, b) => a + b, 0)

  const q = questions[current]
  const key = `${q.block}-${q.qi}`

  const next = () => {
    if (answers[key] === undefined) return
    if (current < totalQuestions - 1) setCurrent((v) => v + 1)
    else setShowResults(true)
  }

  const previous = () => setCurrent((v) => Math.max(v - 1, 0))
  const restart = () => {
    setAnswers({})
    setCurrent(0)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-petrol via-deepgreen to-slate-900 text-slate-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl">
          <p className="text-aqua uppercase tracking-widest text-xs">Evaluación integral</p>
          <h1 className="text-2xl md:text-4xl font-semibold mt-2">Mapa de Autoobservación Intestinal</h1>
          <p className="text-slate-200 mt-3">Fecha de evaluación: {new Date().toLocaleDateString('es-ES')}</p>
          <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-aqua transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm mt-2">Progreso: {answeredCount}/{totalQuestions} ({progress}%)</p>
        </header>

        {!showResults ? (
          <section className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 shadow-xl">
            <p className="text-aqua text-sm">Bloque {q.block + 1}: {blocks[q.block].name}</p>
            <h2 className="text-xl md:text-2xl mt-2 mb-6">{current + 1}. {q.text}</h2>

            <div className="grid md:grid-cols-2 gap-3">
              {options.map((opt, idx) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((prev) => ({ ...prev, [key]: opt }))}
                  className={`p-4 rounded-2xl border text-left transition ${
                    answers[key] === opt ? 'border-aqua bg-aqua/20' : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  <p className="font-medium">{labels[idx]}</p>
                  <p className="text-xs text-slate-300">Puntaje: {opt}</p>
                </button>
              ))}
            </div>

            {answers[key] === undefined && <p className="mt-4 text-amber-300">Selecciona una opción para continuar.</p>}

            <div className="flex justify-between mt-8">
              <button onClick={previous} className="px-5 py-2 rounded-xl bg-white/15 hover:bg-white/25">Anterior</button>
              <button
                onClick={next}
                disabled={answers[key] === undefined}
                className="px-5 py-2 rounded-xl bg-aqua text-slate-900 font-semibold disabled:opacity-40"
              >
                {current === totalQuestions - 1 ? 'Ver resultados' : 'Siguiente'}
              </button>
            </div>
          </section>
        ) : (
          <section className="space-y-5">
            <article className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl">
              <h2 className="text-2xl font-semibold">Resultados</h2>
              <p className="mt-2 text-lg">Puntuación total: <strong>{totalScore}/108</strong></p>
              <p className="mt-2 text-slate-200">Interpretación: {interpretation(totalScore)}</p>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                {blocks.map((b, i) => (
                  <div key={b.name} className="rounded-2xl p-4 bg-black/20 border border-white/10">
                    <p className="font-medium">{b.name}</p>
                    <p className="text-aqua">{blockScores[i]}/18</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl">
              <h3 className="text-xl font-semibold">Recomendaciones iniciales</h3>
              <ul className="list-disc ml-6 mt-3 space-y-2 text-slate-200">
                <li>Prioriza alimentación antiinflamatoria y regularidad de horarios.</li>
                <li>Aumenta hidratación diaria y fibra de forma progresiva.</li>
                <li>Incluye movimiento consciente y gestión de estrés.</li>
                <li>Observa reacciones a alimentos y registra síntomas por 14 días.</li>
              </ul>
            </article>

            <article className="rounded-3xl bg-rose-950/40 border border-rose-300/40 p-6 shadow-xl">
              <h3 className="text-xl font-semibold">Señales de alarma</h3>
              <ul className="list-disc ml-6 mt-3 space-y-2 text-rose-100">
                <li>Sangrado digestivo, pérdida de peso no intencional o dolor severo persistente.</li>
                <li>Fiebre recurrente con síntomas intestinales o vómitos constantes.</li>
                <li>Diarrea intensa por más de 72 horas o estreñimiento extremo prolongado.</li>
              </ul>
            </article>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => window.print()} className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25">
                Imprimir / Guardar PDF
              </button>
              <button onClick={restart} className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25">
                Repetir evaluación
              </button>
              <a
                href="https://www.mentorontologico.com/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-aqua text-slate-900 font-semibold"
              >
                Quiero conocer el Mentoring Ontológico de Salud y Bienestar
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
