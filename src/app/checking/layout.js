import styles from "./page.module.css"

export const dynamic = 'force-dynamic'

export default function Layout({children}) {

  return (
      <main className={styles['body']}>
      {children}
      </main>
  )
}
