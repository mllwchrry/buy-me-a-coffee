<template>
    <header>
        <button @click="withdrawTips" style="background-color: rgb(55, 133, 142);">Tip Mary</button>
        <button @click="connectWallet" v-if="!current_account" style="background-color: azure; color: black;">Connect wallet</button>
        <span v-else>{{ current_account }}</span>
    </header>
    <h1>Buy Mary a Coffee</h1>
    <div id="form">
        <div class="input">
            <label for="name">What's your name?</label>
            <input v-model='name' id="name" type="text" placeholder="coffee buyer">
        </div>
        <div class="input">
            <label for="message">Please leave a message</label>
            <textarea v-model="message" id="message" type="text" placeholder="Enjoy your coffee!"></textarea>
        </div>
        <div id="buttons">
            <button @click="buyCoffee('0.001')">Send 1 coffee (0,001 ETH)</button>
            <button @click="buyCoffee('0.003')" style="background-color: brown;">Send 1 large coffee (0,003 ETH)</button>
        </div>
    </div>

    <h2>The coffee buyers</h2>
    <div id="buyers-wrapper">
        <div class="buyer-card" v-for="memo in memos" :key="memo.timestamp">
        <p>From: {{ memo.name }}</p>
        <p>Message: {{ memo.message }}</p>
        </div>
    </div>
    <div>

    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Web3 from 'web3';
import abi from '../abi'

const web3 = new Web3(window.ethereum);
let current_account = ref('');

const contractAddress = '0x53f9bC711b829Cca5b60caf8e2E8b9974b5666Fa';

const contract = new web3.eth.Contract(abi, contractAddress);
const memos = await contract.methods.getMemos().call()


let name = ref('');
let message = ref('');

const connectWallet = async() => {
    current_account.value = (await web3.eth.requestAccounts())[0]
}

const buyCoffee = async(amount) => {
    const gas = await contract.methods.buyCoffee(name.value, message.value)
    .estimateGas({
        from: current_account.value,
        value: web3.utils.toWei(amount, 'ether')
    });

    
    await contract.methods.buyCoffee(name.value, message.value).send({
        from: current_account.value,
        value: web3.utils.toWei(amount, 'ether'),
        gas: gas,
    })
    .on('receipt', receipt => console.log('receipt', receipt)).once('error', error => console.error(error))
}

const withdrawTips = async() => {
    const gas = await contract.methods.withdrawTips()
    .estimateGas({
        from: current_account.value
    });

    await contract.methods.withdrawTips().send({
        from: current_account.value
    })
}

onMounted(() => {
    connectWallet();
})

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600&display=swap');

header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-left: 3vw;
    padding-right: 3vw;
    margin-top: 10px;
}

span {
    border: 1px solid #d24d4d;
    border-radius: 6px;
    font-size: 18px;
    padding: 10px;

}

h1 {
font-family: 'Permanent Marker', cursive;
font-size: 60px;
text-align: center;
}

h2 {
font-weight: 600;
text-align: center;
margin-top: 50px;
font-size: 30px;
}

body {
background-color: #F8E8CF;
font-family: 'Exo 2', sans-serif;
}

#form {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
}

.input {
width: 40vw;
display: flex;
flex-direction: column;
font-size: 16px;
gap: 8px;
}

input {
height: 40px;
font-size: 18px;
padding-left: 10px;
padding-right: 10px;
border-radius: 8px;
}

textarea {
height: 60px;
font-size: 18px;
padding: 10px;
border-radius: 8px;
}

#buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
font-size: 18px;
padding: 10px;
background-color: #d24d4d;
color: #F8E8CF;
border: none;
border-radius: 6px;
opacity: 90%;
}

button:hover {
opacity: 100%;
}

#buyers-wrapper {
display: flex;
flex-wrap: wrap;
gap: 2vw;
justify-content: center;
}

.buyer-card {
border: 2px solid black;
padding: 10px;
border-radius: 8px;
width: 25vw;
}

div {
overflow: auto;
}
</style>
  