import React, { Component, useContext } from 'react';
var ethUtil = require('ethereumjs-util');
import { Button, Form, TextArea, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

export default class SigMetamask extends Component {
    constructor(props) {
        super(props);
        this.state = {
          account: "",
          balance: "",
          status: "",
          hcvc: "",
          sig: "this is unsigned",
        }
        this.signMessage = this.signMessage.bind(this);
        this.getMetaMask();
    }

    async getMetaMask() {
      try {
        /**************** DOES WORK WITH MOBILE ****************/
        // const accounts = await window.ethereum.enable();
        // this.setState({account: accounts[0]});
        /**************** DOES NOT WORK WITH MOBILE ****************/
        let accountNEW = await ethereum.send('eth_requestAccounts')
        this.setState({ account: accountNEW.result[0]});
        let _this = this;
      } catch{
        console.log("no account");
      }
    }

    signMessage(event){
      event.preventDefault();
      let fullVC = JSON.parse(event.target.vcText.value);
      let signatureToVerify = fullVC.proof.signature;
      let partialVC = {
        type: [fullVC.type[0], fullVC.type[1]],
        issuer: fullVC.issuer,
        employer: fullVC.employer,
        issuanceDate: fullVC.issuanceDate,
        credentialSubject: {
          id: fullVC.credentialSubject.id,
          name: fullVC.credentialSubject.name,
          employment: {
            type: fullVC.credentialSubject.employment.type,
            role: fullVC.credentialSubject.employment.role
          }
        }
      }
      let text = JSON.stringify(partialVC);
      let randomNumToSign = ethUtil.bufferToHex(new Buffer(Math.random().toString(), 'utf8'));
      console.log("Random number to sign to prove you own account:", randomNumToSign);
      var from = this.state.account;
      var params = [randomNumToSign, from];
      var method = 'personal_sign';
      let _this = this;
      web3.currentProvider.sendAsync({ method, params, from }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) return console.error(result.error)
        let signatureToAuthorize = result.result
        console.log("Signature of random number:", signatureToAuthorize);
        var method = 'personal_ecRecover'
        var params = [randomNumToSign, signatureToAuthorize]
        web3.currentProvider.sendAsync({ method, params, from }, function (err, result) {
          var recovered = result.result
          console.log("Recovered from signature (this should be your Eth address):", recovered);
          if (err) return console.error(err)
          if (result.error) return console.error(result.error)
          if(recovered === fullVC.credentialSubject.id.toLowerCase()){
            console.log("If above is the same as the address in the VC then verify the signature in the VC.");
            var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'));
            // console.log("MESSAGE",msg);
            method = 'personal_ecRecover'
            var params = [msg, signatureToVerify]
            web3.currentProvider.sendAsync({ method, params, from }, function (err, result) {
              var recovered = result.result
              console.log("Recovered from VC signature (this should be the issuers Eth address):", recovered);
              console.log("If the above address matches the issuers address then the VC is verified!");
              if (err) return console.error(err)
              if (result.error) return console.error(result.error)
              if (recovered === fullVC.issuer.toLowerCase()) {
                _this.setState({status: "Signature in VC verified! You are now enrolled!"});
                Meteor.call('createHCVC', JSON.stringify(fullVC), (err, result) => {
                  console.log("Created Healthcare VC!");
                  _this.setState({hcvc: JSON.stringify(result, 0, 4)});
                });
                // console.log('Successfully ecRecovered signer as ' + from)
              } else {
                _this.setState({status: "Signature in VC unable to be verified"});
                // console.log('Failed to verify signer when comparing ' + result + ' to ' + from)
              }
            })
          } else {
            _this.setState({status: "Signature in VC does not match the account being used"});
          }
        })
      })
    }
  render() {
    return (
      <div>
        <br />
        <br />
        <Grid textAlign='center' style={{ height: '75vh', paddingLeft: "40px", paddingRight: "40px" }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 900 }} mobile={16} tablet={8} computer={14}>
            <Header as='h1' color='teal' textAlign='center'>
              Enrollment in Healthcare Coverage Via VC Verification
            </Header>
            <br />
            <p style={{color: "teal"}}><b>(this is only a demo)</b></p>
            <Form id="signVC" size='large' onSubmit={this.signMessage}>
              <Segment>
                <p style={{wordWrap: "break-word"}}>Your account: {this.state.account}</p>
                <TextArea rows={15} id="vcText" placeholder="Paste your VC here"></TextArea>
                <br />
                <br />
                <Button color='teal' size='small' type="submit" form="signVC">
                  Verify
                </Button>
              </Segment>
              <Segment>
                <p>Status: {this.state.status}</p>
              </Segment>
              {this.state.hcvc === "" ?
                <p></p>
                :
                <Button className="pull-right btn btn-primary" style={{ margin: 10 }} href={`data:text/json;charset=utf-8,${encodeURIComponent( this.state.hcvc )}`} download="CoverageVC.json">
                  Download JSON File
                </Button>
              }
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
