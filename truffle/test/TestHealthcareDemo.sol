pragma solidity >=0.6.0 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HealthcareDemo.sol";

contract TestHealthcareDemo {

  function testDegree() public {

    HealthcareDemo demo = HealthcareDemo(DeployedAddresses.HealthcareDemo());

    string memory expected = "";

    Assert.equal(demo.returnUserDegree(), expected, "Owner should have no degree");

  }
  function testUserStatus() public {

    HealthcareDemo demo = HealthcareDemo(DeployedAddresses.HealthcareDemo());

    uint expected = 0;

    Assert.equal(demo.returnUserStatus(), expected, "Owner should have no starting status");

  }

}
