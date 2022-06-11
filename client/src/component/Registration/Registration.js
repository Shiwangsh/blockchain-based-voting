// Node modules
import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import NotInit from "../NotInit";

// CSS
import "./Registration.css";

// Contract
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      account: null,
      isAdmin: false,
      isElStarted: false,
      isElEnded: false,
      voterCount: undefined,
      voterName: "",
      voterPhone: "",
      voterPassword:"",
      voterEmail:"",
      voters: [],
      currentVoter: {
        address: undefined,
        name: null,
        phone: null,
        email:null,
        password:null,
        hasVoted: false,
        isVerified: false,
        isRegistered: false,
      },
    };
  }

  // refreshing once
  componentDidMount = async () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      // Admin account and verification
      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Get start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ isElStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ isElEnded: end });

      // Total number of voters
      const voterCount = await this.state.ElectionInstance.methods
        .getTotalVoter()
        .call();
      this.setState({ voterCount: voterCount });

      // Loading all the voters
      for (let i = 0; i < this.state.voterCount; i++) {
        const voterAddress = await this.state.ElectionInstance.methods
          .voters(i)
          .call();
        const voter = await this.state.ElectionInstance.methods
          .voterDetails(voterAddress)
          .call();
        this.state.voters.push({
          address: voter.voterAddress,
          name: voter.name,
          password: voter.password,
          email: voter.email,
          phone: voter.phone,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
        });
      }
      this.setState({ voters: this.state.voters });

      // Loading current voters
      const voter = await this.state.ElectionInstance.methods
        .voterDetails(this.state.account)
        .call();
      this.setState({
        currentVoter: {
          address: voter.voterAddress,
          name: voter.name,
          password: voter.password,
          email: voter.email,
          phone: voter.phone,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
        },
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details (f12).`
      );
    }
  };
  updateVoterName = (event) => {
    this.setState({ voterName: event.target.value });
  };
   updateVoterEmail = (event) => {
    this.setState({ voterEmail: event.target.value });
  };
  updateVoterPassword = (event) => {
    this.setState({ voterPassword: event.target.value });
  };
  updateVoterPhone = (event) => {
    this.setState({ voterPhone: event.target.value });
  };
  registerAsVoter = async () => {
    await this.state.ElectionInstance.methods
      .registerAsVoter(this.state.voterName, this.state.voterPhone, this.state.voterEmail,this.state.voterPassword)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };
  render() {
    if (!this.state.web3) {
      return (
        <>
          {/* {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />} */}
          <center style={{color:'#fff'}}>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    return (
      // <>
      //   {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
      //   {!this.state.isElStarted && !this.state.isElEnded ? (
      //     <NotInit />
      //   ) : (
          <>
            {/* <div className="container-item info">
              <p>Total registered voters: {this.state.voters.length}</p>
            </div> */}
            <div className="container-main">
              <h2 style={{color:'#fff'}}>Registration</h2>
              <small>Register to vote.</small>
              <div className="container-item general">
                <form>
                  <div className="div-li">
                    <label className={"label-r"}>
                      Account Address
                      <input
                        className={"input-r"}
                        type="text"
                        value={this.state.account}
                        style={{ width: "400px" }}
                      />{" "}
                    </label>
                  </div>
                  <div className="div-li">
                    <label className={"label-r"}>
                      Name
                      <input
                        className={"input-r"}
                        type="text"
                        value={this.state.voterName}
                        onChange={this.updateVoterName}
                      />{" "}
                    </label>
                  </div>
                  {/* test */}
                  <div className="div-li">
                    <label className={"label-r"}>
                      Email
                      <input
                        className={"input-r"}
                        type="text"
                        value={this.state.voterEmail}
                        onChange={this.updateVoterEmail}
                      />{" "}
                    </label>
                  </div>
                   <div className="div-li">
                    <label className={"label-r"}>
                      Password
                      <input
                        className={"input-r"}
                        type="text"
                        value={this.state.voterPassword}
                        onChange={this.updateVoterPassword}
                      />{" "}
                    </label>
                  </div>
                  {/* end test */}
                  <div className="div-li">
                    <label className={"label-r"}>
                      Phone number <span style={{ color: "tomato" }}>*</span>
                      <input
                        className={"input-r"}
                        type="number"
                        value={this.state.voterPhone}
                        onChange={this.updateVoterPhone}
                      />
                    </label>
                  </div>
                  <p className="note">
                    <span style={{ color: "tomato" }}> Note: </span>
                    <br /> Change account number from the Metamask browser extension.
                  </p>
                  <button
                    className="btn-add"
                    disabled={
                      this.state.voterPhone.length <= 10 ||
                      this.state.currentVoter.isVerified ||
                      this.state.currentVoter.isRegistered
                    }
                    onClick={this.registerAsVoter}
                  >
                    Register
                  </button>
                

                  {this.state.currentVoter.isRegistered ? (
                    <p className="registerText">You have registered yourself successfully.</p>
                  ) : 
                  null}

                   <NavLink to="/"  style={{color:"#000"}}>
            <i className="far fa-address-card" /> Login Here
          </NavLink>
                </form>
              </div>
            </div>
            {/* <div
              className="container-main"
              style={{
                borderTop: this.state.currentVoter.isRegistered
                  ? null
                  : "1px solid",
              }}
            >
              {loadCurrentVoter(
                this.state.currentVoter,
                this.state.currentVoter.isRegistered
              )}
            </div>
            {this.state.isAdmin ? (
              <div
                className="container-main"
                // style={{ borderTop: "1px solid" }}
              >
                <small style={{color: "#fff"}}>Total Voters: {this.state.voters.length}</small>
                {loadAllVoters(this.state.voters)}

              </div>
            ) : 
            null} */}
          </>
        )}
      // </>
    // );
  // }
}
export function loadCurrentVoter(voter, isRegistered) {
  return (
    <>
      <div
        className={"container-item " + (isRegistered ? "info" : "info")}
      >
        <center>Your Registered Info</center>
      </div>
      <div
        className={"container-list " + (isRegistered ? "info" : "info")}
      >
        <table>
          <tr>
            <th>Account Address</th>
            <td>{voter.address}</td>
          </tr>
          <tr>
            <th style={{color:'#000'}}>Name</th>
            <td style={{color:'#000'}}>{voter.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{voter.phone}</td>
          </tr>
          <tr>
            <th style={{color:'#000'}}>Email</th>
            <td style={{color:'#000'}}>{voter.email}</td>
          </tr>
           <tr>
            <th>Password</th>
            <td>{voter.password}</td>
          </tr>
          {/* <tr></tr> */}
          <tr>
            <th style={{color:'#000'}}>Voted</th>
            <td style={{color:'#000'}}>{voter.hasVoted ? "True" : "False"}</td>
          </tr>
          <tr>
            <th>Verification</th>
            <td>{voter.isVerified ? "True" : "False"}</td>
          </tr>
          <tr>
            <th style={{color:'#000'}}>Registered</th>
            <td style={{color:'#000'}}>{voter.isRegistered ? "True" : "False"}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
export function loadAllVoters(voters) {
  const renderAllVoters = (voter) => {
    return (
      <>
        <div className="container-list attention">
          <table>
            <tr>
              <th>Account address</th>
              <td>{voter.address}</td>
            </tr>
            <tr>
              <th style={{color:'#000'}}>Name</th>
              <td style={{color:'#000'}}>{voter.name}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>{voter.password}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{voter.phone}</td>
            </tr>
            
            <tr>
              <th style={{color:'#000'}}>Voted</th>
              <td style={{color:'#000'}}>{voter.hasVoted ? "True" : "False"}</td>
            </tr>
            <tr>
              <th>Verified</th>
              <td>{voter.isVerified ? "True" : "False"}</td>
            </tr>
            <tr>
              <th style={{color:'#000'}}>Registered</th>
              <td style={{color:'#000'}}>{voter.isRegistered ? "True" : "False"}</td>
            </tr>
          </table>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container-item attention">
        <center>List of voters</center>
      </div>
      {voters.map(renderAllVoters)}
    </>
  );
}
