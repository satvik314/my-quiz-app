import styles from './Header.module.css'

export default function Header({ onHome }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={onHome} aria-label="Go home">
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>QuizVerse</span>
        </button>
        <p className={styles.tagline}>Learn something new every day</p>
      </div>
    </header>
  )
}
