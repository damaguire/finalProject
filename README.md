# CA-FinalProject
 My Final Project
 
 Link to recording: https://www.youtube.com/watch?v=fOd179c6jck

# Installation

You must first install Meteor to use this repository (sorry)

```curl https://install.meteor.com/ | sh ```

After installing Meteor you can clone the repo and install the necessary packages

```meteor npm install --save semantic-ui-react ethereumjs-util react-router-dom semantic-ui-css react-router history web3```

Once those are installed you can run the following command to boot meteor

```meteor```

Once meteor is booted (assuming no errors) you should be able to navigate to the following url to see the project:

```localhost:3000``` 

# About

This project was created with the thought that if we had a public way to present common information that we could delegate access to, we could live in a more advanced society. I chose to create a contract that allows for users to create their own identity based on an Ethereum account and delegate certain aspects of their history to other ogranizations.

Users create their identity and can allow colleges, employers, and healthcare providers to update what information they have associated with the user. 

An example of this being useful would be a fresh college graduate who is searching for a job. Their college could update their degree in the contract so that prospective employers could be confident that they had the education they claimed. Once employed, healthcare providers could see the employment status and add in the coverage associated with the company.

This use case would never work in the world today as too much information would be public but a similar, more advanced idea could work in my opinion. 


# Truffle Tests

I could not get the hang of Truffle tests to save my life. I should have reached out for help but I suck so it is what it is. 

testUserStatus tests that a default user will have a status of 0 (no degree) upon deployment

testDegree tests that a default user will no degree upon deployment.

I could have continued down that path of testing but I feel that would have been cheating really
