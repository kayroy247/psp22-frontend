
import React, {useState, useLayoutEffect, useEffect} from 'react';
import { isWeb3Injected, web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import './App.css';
import metadata from './metadata.json';

function App() {
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState('')
  const [totalSupply, setTotalSupply] = useState('')


  useEffect(() => {
extensionSetup();
getContract();
  },[])

  const getContract = async () => {
    const api =await getApi()
    const address = "5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8";
    const contract = new ContractPromise(api, metadata, address);
    console.log(contract);
    return contract
  }

  const extensionSetup = async () => {
try {
  
    const extension =  await web3Enable("psp22-frontend");
  
    if(extension?.length === 0) {
      if(isWeb3Injected()){
        setError("Please install wallet");
        return;
      }
      setError("Error connecting to wallet")
      return
    }
  } catch (error) {
    console.log(error.message)
    
    }
    const accounts = await web3Accounts();
    setAccount(accounts[0].address);
    const injector = await web3FromAddress(accounts[0].address);
    const api = await getApi();
   const { data: { free } } = await api.query.system.account(accounts[0].address);
     setBalance(free.toString());
     console.log(free)
     const contract = await getContract();
     console.log(contract)
     const callValue = await contract.query.getTotalSupply("5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8", { gasLimit: -1 });
     
     setTotalSupply(callValue.output.toHuman())
    //  const tokenBalance = await contract.query.balanceOf("5C998W4aUKKb2BZVhM7Z6CW5vNkxrUYtZUskKkuVmCBjNSe8", { gasLimit: -1 }, accounts[0].address);

  }

  const getApi = async () =>{
    const wsProvider = new WsProvider('ws://127.0.0.1:56345');
    const api = await ApiPromise.create({ provider: wsProvider });
  return api
  }

  const signAndSend = async () => {
    const injector = await web3FromAddress(account);
    console.log(injector)
    // Construct
const api = await getApi();
const txHash = await api.tx.balances
  .transfer("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", 12345)
  .signAndSend(account, { signer: injector.signer });

// Show the hash
console.log(`Submitted with hash ${txHash}`);
  }

   return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
     PSP22 Contract
    </h1>
    <div>

      {error && <div>{error}</div>}   
    <div> Address: { account }</div>
    <h3>Balance: {balance}</h3>
    <h3>Token total Supply: {totalSupply}</h3>
    
    </div>


      <button onClick={signAndSend}>Sign to Bob</button>
    </div>
  );
}

export default App;
