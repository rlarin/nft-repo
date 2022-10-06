import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Box, Button, Link} from "@mui/material";
import {useEffect, useState} from "react";
import {AccountsData} from "./interfaces/interfaces";
import ListAccounts from "./components/ListAccounts/ListAccounts";

const Home: NextPage = () => {
    const [accountsData, setAccountsData] = useState<AccountsData>({
        currentAccount: '',
        accounts: []
    });

    const getAccounts = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                console.error("Make sure you have Metamask!");
                return null;
            } else {
                const accounts = await ethereum.request({method: 'eth_requestAccounts'}) as string[];
                if (accounts?.length > 0) {
                    setAccountsData((prevState) => {
                        return {
                            ...prevState,
                            accounts,
                            currentAccount: accounts[0],
                        }
                    });
                    console.log("Found an authorized account:", accounts[0]);
                } else {
                    console.error("No authorized account found");
                    return null;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const connectWallet = async () => {
        await getAccounts();
    }

    useEffect(() => {
        (async () => {
            await getAccounts();
        })();
    }, []);

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
          Hey there! I am Rainer and I ❤️ buildspace
        </h3>
        <blockquote>
            I’m not insane. My mother had me tested. 😅 <br />
            —Sheldon Cooper (Jim Parsons), The Big Bang Theory
        </blockquote>

          <Box>
              {accountsData.currentAccount ? (
                  <ListAccounts accounts={accountsData.accounts} />
              ): (
                  <div className={styles.grid}>
                      <Button onClick={connectWallet} className={styles.card}>
                          <h6 className={styles.description}>Connect your Ethereum wallet and wave at me! 👋 </h6>
                      </Button>
                  </div>
              )}
          </Box>
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
