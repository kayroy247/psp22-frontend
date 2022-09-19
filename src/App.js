import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import "./App.css";
import metadata from "./metadata.json";

function App() {
  const [account, setAccount] = useState("");
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    extensionSetup();
  }, []);

  const getContract = async () => {
    const api = await getApi();
    const address = "5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8";
    const contract = new ContractPromise(api, metadata, address);
    console.log(contract);
    return contract;
  };

  const extensionSetup = async () => {
    try {
      const extension = await web3Enable("psp22-frontend");

      if (extension?.length === 0) {
        if (isWeb3Injected()) {
          setError("Please install wallet");
          return;
        }
        setError("Error connecting to wallet");
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    const accounts = await web3Accounts();
    setAccount(accounts[0].address);
    const injector = await web3FromAddress(accounts[0].address);
    const api = await getApi();
    const {
      data: { free },
    } = await api.query.system.account(accounts[0].address);
    setBalance(free.toString());
    console.log(free);
    const contract = await getContract();
    const callValue = await contract.query.getTotalSupply(
      "5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8",
      { gasLimit: -1 }
    );

    setTotalSupply(callValue.output.toHuman());
    const tokenBalance = await contract.query["psp22::balanceOf"](
      "5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8",
      { gasLimit: -1 },
      accounts[0].address
    );
    console.log(tokenBalance.output.toHuman());
    setTokenBalance(tokenBalance.output.toHuman());
  };

  const getApi = async () => {
    const wsProvider = new WsProvider("ws://127.0.0.1:56345");
    const api = await ApiPromise.create({ provider: wsProvider });
    return api;
  };

  const checkConnection = async () => {
    const extension = await web3Enable("psp22-frontend");
    if (extension?.length === 0) {
      if (isWeb3Injected()) {
        setError("Please install wallet");
        return;
      }
      setError("Error connecting to wallet");
      return;
    }
    const accounts = await web3Accounts();
    setAccount(accounts[0].address);
  };
  const sendToken = async (e) => {
    e.preventDefault();
    setError("");
    if (!amount || !userAddress) {
      setError("Please fill all values");
      return;
    }
    const value = 10000;
    const storageDepositLimit = 1000;

    const injector = await web3FromAddress(account);
    console.log(injector);
    console.log({ userAddress, amount });
    const api = await getApi();
    const contract = await getContract();
    const gasLimit = 3000n * 1000000n;
    const tokenBalance = await contract.tx["psp22::transfer"](
      { gasLimit: -1, storageDepositLimit },
      userAddress,
      amount,
      1000 // this data argument is hardcoded because an error is thrown without it.
    ).signAndSend(account, { signer: injector.signer }, (result) => {
      if (result.status.isInBlock) {
        console.log("in a block");
        window.location.reload();
      } else if (result.status.isFinalized) {
        console.log("finalized");
      }
    });
  };

  return (
    <div className="App">
      <nav className="h-10 p-2 mb-10 flex  justify-end pr-10">
        {account ? (
          account
        ) : (
          <button
            onClick={extensionSetup}
            className="rounded-md h-10 text-white bg-sky-500 p-2"
          >
            CONNECT WALLET
          </button>
        )}
      </nav>
      <h1 className="text-3xl font-bold underline mb-4">Send PSP22 Token</h1>
      <div className="mb-8">
        {error && <div className="text-red-400">{error}</div>}
        {!account ? (
          <p className="text-2xl font-extrabold">PLEASE CONNECT WALLET</p>
        ) : (
          <div>
            <div> Address: {account}</div>
            <h3 className="text-sm pb-6">Balance: {balance}</h3>
            <h3 className="text-2xl">P2P Token total Supply: {totalSupply}</h3>
            <h3 className="text-2xl">My PSP22 token balance: {tokenBalance}</h3>
          </div>
        )}
      </div>
      <div className=" flex justify-center ">
        <div className="flex flex-col w-1/2 ">
          <label>Recipeint Address</label>
          <input
            type="text"
            value={userAddress}
            name="userAddress"
            onChange={(e) => setUserAddress(e.target.value)}
            className="border-solid border-gray-400  mb-8 w-full p-4 h-10 rounded-md"
            placeholder="Enter address"
          />
          <label>Token Amount</label>
          <input
            type="number"
            value={amount}
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            className="border-solid border-gray-400 p-4 mb-8 w-full h-10 rounded-md"
            placeholder="Enter amount"
          />
          <button
            className="rounded-md h-10 text-white bg-sky-500"
            onClick={sendToken}
          >
            SendToken
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
