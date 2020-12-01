import React, { Component } from 'react';
import SigMetamask from './SignWithMetamask.jsx';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { Button, Form, TextArea, Grid, Header, Image, Message, Segment, Divider } from 'semantic-ui-react';


export default class FileSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      openModal: false,
      signedData: "",
      spinner: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(event.target.name);
    let path = "/" + event.target.name;
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '75vh', paddingLeft: "40px", paddingRight: "40px" }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 900 }} mobile={16} tablet={8} computer={14}>
            <Header as='h1' color='teal' textAlign='center'>
              User Contract Demo
            </Header>
          </Grid.Column>
          <Grid.Row columns={1}>
            <Header as='h1' color='teal' textAlign='center'>
              User Controls
            </Header>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>Create Your Contract</h3>
              <p>
                Do this if you do not have a contract already!
              </p>
              <Button name="generate" color="teal" onClick={this.handleClick}>Generate</Button>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>Update Access</h3>
              <p>
                Change who is allowed to edit your contract
              </p>
              <Button name="change" color="teal" onClick={this.handleClick}>Change</Button>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>Circuit Breaker</h3>
              <p>
                Stop your contract from being updated!
              </p>
              <Button name="circuit" color="teal" onClick={this.handleClick}>Stop!</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Header as='h1' color='teal' textAlign='center'>
              Admin Controls
            </Header>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>College Degree</h3>
              <p>
                Add the college degree
              </p>
              <Button name="degree" color="teal" onClick={this.handleClick}>Update Degree</Button>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>Employer</h3>
              <p>
                Employers can add themselves
              </p>
              <Button name="job" color="teal" onClick={this.handleClick}>Update Job</Button>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 400, paddingLeft: "40px", paddingRight: "40px"}}>
              <h3>Healthcare Provider</h3>
              <p>
                Healthcare coverage is added here
              </p>
              <Button name="healthcare" color="teal" onClick={this.handleClick}>Update Healthcare</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
