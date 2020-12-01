import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
var Web3 = require('web3');
var web3 = new Web3("http://138.91.143.91:8080", require('net'));
var fs = require("fs");

let appAccount = {
  address: "0xe83fe3bA94A0DbB63FdcFa3E48fca530DE7a1d8b",
  privateKey: "0xe75e83183e1ca1e0fd3f04001f3cf27d142d0f51ea8a9a9b0f98ce2e579d9a48"
}

Meteor.methods({
  'signNewVC'(newVC) {
    newVC = JSON.parse(newVC);
    let vcToSign = {
      type: [newVC.type[0], newVC.type[1]],
      issuer: newVC.issuer,
      employer: newVC.employer,
      issuanceDate: newVC.issuanceDate,
      credentialSubject: {
        id: newVC.credentialSubject.id,
        name: newVC.credentialSubject.name,
        employment: {
          type: newVC.credentialSubject.employment.type,
          role: newVC.credentialSubject.employment.role
        }
      }
    }
    console.log(vcToSign);
    vcToSign = JSON.stringify(vcToSign);
    console.log("31", vcToSign);
    var sig = web3.eth.accounts.sign(vcToSign, appAccount.privateKey);
    console.log(sig);
    return sig.signature;
  },
  'createHCVC'(EmplVCInfo) {
    console.log(EmplVCInfo);
    EmplVCInfo = JSON.parse(EmplVCInfo);
    let newVC = {
      type: ["VC", "Healthcare Coverage Credential"],
      issuer: "0xe83fe3bA94A0DbB63FdcFa3E48fca530DE7a1d8b",
      insurer: "Healthcare Company A",
      issuanceDate: new Date,
      credentialSubject: {
        id: EmplVCInfo.credentialSubject.id,
        name: EmplVCInfo.credentialSubject.name,
        coverage: {
          type: "Mid Plan"
        }
      },
      proof: {
        type: "ECDSA",
        created: "assignLater",
        proofPurpose: "assertation",
        verificationMethod: "personal_ecRecover",
        signature: "assignLater"
      }
    };
    let partialVC = {
      type: ["VC", "Healthcare Coverage Credential"],
      issuer: "0xe83fe3bA94A0DbB63FdcFa3E48fca530DE7a1d8b",
      insurer: "Healthcare Company A",
      issuanceDate: new Date,
      credentialSubject: {
        id: EmplVCInfo.credentialSubject.id,
        name: EmplVCInfo.credentialSubject.name,
        coverage: {
          type: "Mid Plan"
        }
      }
    };
    let signedVC = JSON.stringify(partialVC);
    var sig = web3.eth.accounts.sign(signedVC, appAccount.privateKey);
    newVC.proof.created = new Date;
    newVC.proof.signature = sig.signature;
    console.log("newvc:", JSON.stringify(newVC, 0,4));
    return newVC;
  },
})
