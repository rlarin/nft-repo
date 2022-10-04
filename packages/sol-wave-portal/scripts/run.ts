import hre from "hardhat";

(async () => {
    const main = async () => {
        const [owner, randomPerson] = await hre.ethers.getSigners();

        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy();
        await waveContract.deployed();

        console.log("Contract deployed to:", waveContract.address);
        console.log("Contract deployed by:", owner.address);

        await waveContract.getTotalWaves();
        console.log('==============================================\n');

        console.log("First wave by owner:", owner.address);
        const waveTxn = await waveContract.wave();
        await waveTxn.wait();

        await waveContract.getTotalWaves();
        console.log('==============================================\n');

        // Second wave
        console.log("Second wave by randomPerson:", randomPerson.address);
        const secondWaveTxn = await waveContract.connect(randomPerson).wave();
        await secondWaveTxn.wait();

        await waveContract.getTotalWaves();
        console.log('==============================================\n');

        // Third wave
        console.log("Third wave by owner:", owner.address);
        const thirdWaveTxn = await waveContract.connect(owner).wave();
        await thirdWaveTxn.wait();

        await waveContract.getTotalWaves();
        console.log('==============================================\n');

        // Waves by wallet
        console.log('==============================================');
        const wavesByWallet = await waveContract.getWavesByWallet(owner.address);
        console.log(`Waves by owner (${waveContract.address}): ${wavesByWallet.toString()}`);
    }

    const runMain = async () => {
        try {
            await main();
            process.exit(0); // exit Node process without error
        } catch (error) {
            console.log(error);
            process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
        }
    }

    await runMain();
})();
