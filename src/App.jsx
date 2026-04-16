import { useState } from 'react'
import Header from './components/Header'
import TopicGrid from './components/TopicGrid'
import QuizView from './components/QuizView'
import ResultsView from './components/ResultsView'
import { topics } from './quizData'
import styles from './App.module.css'

export default function App() {
  const [screen, setScreen] = useState('home') // 'home' | 'quiz' | 'results'
  const [activeTopic, setActiveTopic] = useState(null)
  const [answers, setAnswers] = useState([])

  function handleSelectTopic(topic) {
    setActiveTopic(topic)
    setAnswers([])
    setScreen('quiz')
  }

  function handleFinish(finalAnswers) {
    setAnswers(finalAnswers)
    setScreen('results')
  }

  function handleHome() {
    setActiveTopic(null)
    setAnswers([])
    setScreen('home')
  }

  function handleRetry() {
    setAnswers([])
    setScreen('quiz')
  }

  return (
    <div className={styles.app}>
      <Header onHome={handleHome} />
      <main className={styles.main}>
        {screen === 'home' && (
          <TopicGrid topics={topics} onSelect={handleSelectTopic} />
        )}
        {screen === 'quiz' && activeTopic && (
          <QuizView
            topic={activeTopic}
            onFinish={handleFinish}
            onBack={handleHome}
          />
        )}
        {screen === 'results' && activeTopic && (
          <ResultsView
            topic={activeTopic}
            answers={answers}
            onRetry={handleRetry}
            onHome={handleHome}
          />
        )}
      </main>
      <footer className={styles.footer}>
        ✦ QuizVerse — Curious minds welcome
      </footer>
    </div>
  )
}
