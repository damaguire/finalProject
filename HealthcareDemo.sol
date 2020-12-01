pragma solidity >=0.6.0 <0.7.0;

/// @title A contract that creates different user roles for the Healthcare Demo application
/// @author Daniel Maguire
/// @notice You can use this contract for non-medical use cases as it is only a demo
/// @dev All function calls are currently implemented without side effects

contract HealthcareDemo {
    /// @notice Create user accounts and delegate access

    address owner = msg.sender;
    bool private stopped = false;

    enum EnrollmentTypes { InShcool, Graduated, Employeed, Covered }

    enum AdminTypes { College, Employer, Healthcare }

    mapping (address => uint) public roles;

    struct User {
      uint currentstatus;
      string degree;
      string employer;
      string healthcoverage;
      address userAddress;
    }

    User user;

    event LogDegree(string degree);
    event LogEmployer(string employer);
    event LogCoverage(string coverage);

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier isCollege {
        require(checkRole(msg.sender) == 0, "You are not a college!");
        _;
    }

    modifier isEmployer {
        require(checkRole(msg.sender) == 1);
        _;
    }

    modifier isHealthcareProvider {
        require(checkRole(msg.sender) == 2);
        _;
    }

    modifier stopInEmergency {
        if (!stopped)
        _;
    }

    constructor() public {
    /* Here, set the owner as the person who instantiated the contract. */
        owner = msg.sender;
        user = User(0, "", "", "", msg.sender);
    }
    
    /// @dev circuit breaks the contract
    function stopContractActivity() isOwner public {
        stopped = !stopped;
    }

    function updateUserDegree(string memory degree) public stopInEmergency isCollege() {
        user.currentstatus = 1;
        user.degree = degree;
        emit LogDegree(user.degree);
    }

    function updateUserEmployer(string memory employer) public stopInEmergency isEmployer {
        user.currentstatus = 2;
        user.employer = employer;
        emit LogEmployer(user.employer);
    }

    function updateUserHealthcareProvider(string memory provider) public stopInEmergency isHealthcareProvider {
        user.currentstatus = 3;
        user.healthcoverage = provider;
        emit LogCoverage(user.healthcoverage);
    }

    /// @notice Returns the users current status
    /// @dev Returns only a fixed number.
    function returnUserStatus() public view returns(uint) {
        return user.currentstatus;
    }

    /// @notice Returns the users degree
    /// @dev Returns a string.
    function returnUserDegree() public view returns(string memory) {
        return user.degree;
    }

    /// @notice Returns the users job title
    /// @dev Returns a string.
    function returnUserEmployer() public view returns(string memory) {
        return user.employer;
    }

    /// @notice Returns the healthcare provider
    /// @dev Returns a string.
    function returnUserHealthcareProvider() public view returns(string memory) {
        return user.healthcoverage;
    }

    function makeCollege(address college) public isOwner() {
        roles[college] = 0;
    }

    function makeEmployer(address employer) public isOwner() {
        roles[employer] = 1;
    }

    function MakeHealthcareProvider(address provider) public isOwner() {
        roles[provider] = 2;
    }

    /// @notice Returns the role of an account
    /// @dev Returns only a fixed number.
    function checkRole(address adminInQuestion) public view returns(uint) {
        return roles[adminInQuestion];
    }

}
