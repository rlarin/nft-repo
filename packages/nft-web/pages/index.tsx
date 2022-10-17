import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Box, Button, CircularProgress, Link, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {AccountsData} from "./interfaces/interfaces";
import ListAccounts from "./components/ListAccounts/ListAccounts";
import {ethers} from "ethers";
import abi from "./utils/WavePortal.json";

const Home: NextPage = () => {
    const [totalWaves, setTotalWaves] = useState(0);
    const [isMining, setIsMining] = useState(false);
    const [accountsData, setAccountsData] = useState<AccountsData>({
        currentAccount: '',
        accounts: []
    });

    const contractAddress = '0xc361de3144fadb0ccec18543d11f3d44d78724ba';
    const contractABI = abi.abi;

    const isWalletConnected = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                console.error("Make sure you have Metamask!");
                return null;
            } else {
                const chainId = await ethereum.request({ method: 'eth_chainId' });
                // String, hex code of the chainId of the Goerli test network
                const goerliChainId = "0x5";
                if (chainId !== goerliChainId) {
                    alert("You are not connected to the Goerli Test Network!");
                }

                /*
                 * Check if we're authorized to access the user's wallet
                 */
                const accounts = await ethereum.request({ method: 'eth_accounts' }) as string[];
                if (accounts.length > 0) {
                    setAccountsData((prevState) => {
                        return {
                            ...prevState,
                            accounts: accounts,
                            currentAccount: accounts[0]
                        }
                    });
                } else {
                    console.log("No authorized account found")
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const connectWallet = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[];
            setAccountsData((prevState) => {
                return {
                    ...prevState,
                    accounts: accounts,
                    currentAccount: accounts[0]
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const getContract = async () => {
        try {
            const {ethereum} = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum as any);
                const signer = provider.getSigner();
                return new ethers.Contract(contractAddress, contractABI, signer);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getTotalWaves = async () => {
        let totalWaves = -1;

        try {
            const {ethereum} = window;
            if (ethereum) {
                const contract = await getContract();
                const totalWavesContract = await contract?.getTotalWaves();
                console.log("Retrieved total wave count...", totalWavesContract.toNumber());
                totalWaves = totalWavesContract.toNumber();
                setTotalWaves(totalWaves);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
            return totalWaves;
        } catch (e) {
            console.log(e);
        }
    }

    const wave = async () => {
        try {
            const {ethereum} = window;
            if (ethereum) {
                const contract = await getContract();
                let count = await contract?.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                /*
                * Execute the actual wave from your smart contract
                */
                setIsMining(true);
                const waveTxn = await contract?.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                setIsMining(false);
                console.log("Mined -- ", waveTxn.hash);

                await getTotalWaves();
            } else {
                console.error("Ethereum object doesn't exist!");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        (async () => {
            await isWalletConnected();
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
                    Welcome to my Wave Portal!
                </h1>

                <h3 className={styles.description}>
                    Hey there! I am Rainer and I ❤️ buildspace
                </h3>

                <blockquote>
                    I’m not insane. My mother had me tested. 😅 <br />
                    —Sheldon Cooper (Jim Parsons), The Big Bang Theory
                </blockquote>

                {accountsData.currentAccount && <ListAccounts accounts={accountsData.accounts} />}

                {accountsData.currentAccount && (
                    <Typography sx={{mt: 2}} variant="h5" component="h5">
                        Total waves: {totalWaves}
                    </Typography>
                )}

                {accountsData.currentAccount && (
                    <Box sx={{
                        width: '100%',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem 0'
                    }}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                fontSize: '1.5rem',
                            }}
                            className={styles.card}
                            variant="outlined"
                            onClick={wave}>{
                                isMining ? <>Waving me! <CircularProgress sx={{ml: 2}} size={20} /></>: 'Wave at Me 👋'
                            }</Button>
                    </Box>
                )}

                {!accountsData.currentAccount && (
                    <>
                    <h6 className={styles.description}>Connect your Ethereum wallet and wave at me! 👋 </h6>
                        <Box sx={{
                            width: '100%',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '2rem 0'
                        }}>
                            <Button
                                className={styles.card}
                                variant="outlined"
                                onClick={connectWallet}>Connect your wallet</Button>
                        </Box>
                    </>
                )}
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
