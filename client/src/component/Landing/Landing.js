// Node modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";


// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import LearnMore from "./LearnMore";



//Contracts
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";

// CSS
import "./Landing.css";

// const buttonRef = React.createRef();
export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ElectionInstance: undefined,
          account: null,
          web3: null,
          isAdmin: false,
          candidateCount: undefined,
          candidates: [],
          isElStarted: false,
          isElEnded: false,
        };
      }

      componentDidMount = async () => {
        // refreshing once
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
          this.setState({ web3, ElectionInstance: instance, account: accounts[0] });
    
          // Get total number of candidates
          const candidateCount = await this.state.ElectionInstance.methods
            .getTotalCandidate()
            .call();
          this.setState({ candidateCount: candidateCount });
    
          // Get start and end values
          const start = await this.state.ElectionInstance.methods.getStart().call();
          this.setState({ isElStarted: start });
          const end = await this.state.ElectionInstance.methods.getEnd().call();
          this.setState({ isElEnded: end });
    
          // Loadin Candidates detials
          for (let i = 1; i <= this.state.candidateCount; i++) {
            const candidate = await this.state.ElectionInstance.methods
              .candidateDetails(i - 1)
              .call();
            this.state.candidates.push({
              id: candidate.candidateId,
              header: candidate.header,
              slogan: candidate.slogan,
              voteCount: candidate.voteCount,
            });
          }
    
          this.setState({ candidates: this.state.candidates });
    
          // Admin account and verification
          const admin = await this.state.ElectionInstance.methods.getAdmin().call();
          if (this.state.account === admin) {
            this.setState({ isAdmin: true });
          }
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
    };
    
      render() {
        if (!this.state.web3) {
          return (
            <>
              {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
              <center style={{color:'#fff'}}>Loading Web3, accounts, and contract...</center>
            </>
          );
        }
            
        return (
            <>
                {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
                <br /> <br />
                <div className="home-page-main">
                    <p className="heading">Welome</p>
                    <p className="caption">Create an account to start voting</p>
                    <br/> <br/>
                    <hr className="break"  style={{width: '50%'}}/>
                    <br/> <br />
                </div>
              <LearnMore/>
            </>
        );
    }
}
