import styles from "./page.module.css"

export default function Layout({children}) {

  return (
      <div className={styles['body']}>
      {children}
      </div>
  )
}
