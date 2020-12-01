import React, { Component, useContext } from 'react';
var ethUtil = require('ethereumjs-util');
import { Button, Form, TextArea, Grid, Header, Image, Message, Segment, Input, Dropdown } from 'semantic-ui-react';
var Web3 = require('web3')
var web3 = new Web3(window.ethereum);
// var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/7b93c8a835e1476a82f6ef35c927a911"));

let abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coverage",
				"type": "string"
			}
		],
		"name": "LogCoverage",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "degree",
				"type": "string"
			}
		],
		"name": "LogDegree",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "employer",
				"type": "string"
			}
		],
		"name": "LogEmployer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "college",
				"type": "address"
			}
		],
		"name": "makeCollege",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			}
		],
		"name": "makeEmployer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "provider",
				"type": "address"
			}
		],
		"name": "MakeHealthcareProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stopContractActivity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "degree",
				"type": "string"
			}
		],
		"name": "updateUserDegree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "employer",
				"type": "string"
			}
		],
		"name": "updateUserEmployer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "provider",
				"type": "string"
			}
		],
		"name": "updateUserHealthcareProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adminInQuestion",
				"type": "address"
			}
		],
		"name": "checkRole",
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
		"name": "returnUserDegree",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnUserEmployer",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnUserHealthcareProvider",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnUserStatus",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default class EditEmployer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          result: ""
        }
        this.getMetaMask();
        this.updateContract = this.updateContract.bind(this);
    }

    async getMetaMask() {
      try {
        /**************** DOES WORK WITH MOBILE ****************/
        // const accounts = await window.ethereum.enable();
        // this.setState({account: accounts[0]});
        /**************** DOES NOT WORK WITH MOBILE ****************/

        let accountNEW = await ethereum.send('eth_requestAccounts')
        this.setState({ account: accountNEW.result[0]});
        this.setState({accountCheck: true});
        this.setState({gasPrice: await web3.eth.getGasPrice()});
        this.setState({nonce: await web3.eth.getTransactionCount(this.state.account)});
      } catch{
        this.setState({accountCheck: false});
        console.log("no account");
      }
    }

  async updateContract(event){
    const contractInstance = new web3.eth.Contract(abi, event.target.contracAddress.value);
      let response = await contractInstance.methods.updateUserEmployer(event.target.job.value)
      .send({
           from: this.state.account,
           gas: '961643',
           gasPrice: this.state.gasPrice * 5,
           nonce: this.state.nonce
         });
        this.setState({result: "Success"})
        console.log(response);
  }


  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '75vh', paddingLeft: "40px", paddingRight: "40px" }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 900 }} mobile={16} tablet={8} computer={14}>
            <Header as='h1' color='teal' textAlign='center'>
              Update Job Title
            </Header>
            <br />
            <p style={{color: "teal"}}><b>(you must be registered as a employer)</b></p>
            <Form id="updateContract" size='large' onSubmit={this.updateContract}>
              <p style={{wordWrap: "break-word"}}>Your account: {this.state.account}</p>
              <p>Enter the contract address of the user</p>
              <Input name="contracAddress"></Input>
              <p>Enter the job title of the user</p>
              <Input name="job"></Input>
              <br />
              <br />
              <Button color='teal' size='small' type="submit" form="updateContract">Update Contract</Button>
              <br />
              <br />
              <p>Result: {this.state.result}</p>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
