import styles from './TopicGrid.module.css'

export default function TopicGrid({ topics, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>✦ Interactive Quiz</div>
        <h1 className={styles.heroTitle}>What do you want to<br />learn today?</h1>
        <p className={styles.heroSub}>Pick a topic and test your knowledge. Every answer teaches you something new.</p>
      </div>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={styles.card}
            onClick={() => onSelect(topic)}
            style={{ '--card-color': topic.color }}
          >
            <div className={styles.cardInner}>
              <div className={styles.emoji}>{topic.emoji}</div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{topic.title}</h2>
                <p className={styles.cardDesc}>{topic.description}</p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.questionCount}>{topic.questions.length} questions</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
            <div className={styles.cardAccent} />
          </button>
        ))}
      </div>
    </div>
  )
}
