import styles from "./styles.module.css"

export default function Button({ backgroundColor, onClick, children, disable}) {
  return (
  <button
    className={styles['btn']}
    style={{"--background-color": backgroundColor}}
    onClick={onClick}
    disabled={disable}
  >
      {children}
  </button>
  )
}
