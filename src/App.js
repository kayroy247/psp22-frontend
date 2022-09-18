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
    console.log(contract);
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

  const signAndSend = async () => {
    const injector = await web3FromAddress(account);
    console.log(injector);
    // Construct
    const api = await getApi();
    const txHash = await api.tx.balances
      .transfer("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", 12345)
      .signAndSend(account, { signer: injector.signer });

    // Show the hash
    console.log(`Submitted with hash ${txHash}`);
  };

  const sendToken = async () => {
    const value = 10000; // only for payable messages, call will fail otherwise
    const storageDepositLimit = 1000;

    const injector = await web3FromAddress(account);
    console.log(injector);
    const api = await getApi();
    const contract = await getContract();
    const gasLimit = 3000n * 1000000n;
    const tokenBalance = await contract.tx["psp22::transfer"](
      { gasLimit: -1, storageDepositLimit },
      "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      amount,
      1000
    ).signAndSend(account, { signer: injector.signer }, (result) => {
      if (result.status.isInBlock) {
        console.log("in a block");
      } else if (result.status.isFinalized) {
        console.log("finalized");
      }
    });
    console.log("done");
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">PSP22 Contract</h1>
      <div className="mb-8">
        {error && <div>{error}</div>}
        <div> Address: {account}</div>
        <h3>Balance: {balance}</h3>
        <h3>Token total Supply: {totalSupply}</h3>
        <h3>My PSP22 token balance: {tokenBalance}</h3>
      </div>
      <div className=" flex justify-center ">
        <div className="flex flex-col">
          <input
            type="text"
            value={userAddress}
            name="userAddress"
            onChange={(e) => setUserAddress(e.target.value)}
            className="border-solid border-indigo-600 mb-2"
            placeholder="Enter address"
          />
          <input
            type="number"
            value={amount}
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            className="border-solid border-indigo-600 mb-2"
            placeholder="Enter amount"
          />
          <button onClick={sendToken}>SendToken</button>
        </div>
      </div>
    </div>
  );
}

export default App;
