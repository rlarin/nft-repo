import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Link} from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Web</title>
        <meta name="description" content="Wave me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <Link href="/">Wave Portal</Link>
        </h1>

        <h3 className={styles.description}>
          👋 Hey there! I am Rainer and I ❤️ buildspace
        </h3>
          <blockquote>
              I’m not insane. My mother had me tested. 😅 <br />
              —Sheldon Cooper (Jim Parsons), The Big Bang Theory
          </blockquote>


        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h3 className={styles.description}>Connect your Ethereum wallet and wave at me! </h3>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
