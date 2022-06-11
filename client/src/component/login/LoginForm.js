import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Redirect } from "react-router-dom"
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";
import history from '../../history';
import './login.css' 
import Landing from "../Landing/Landing";

import { useHistory } from "react-router-dom";

// function Login({Login, error}){
	
	//   const [details, setDetails] = useState({email:"", password:""});
	// const history = useHistory()
	// history.push('/')
	
export default class Login extends Component {
		
		// const history = useHistory();
// 	const [emailEntered, setEmailEntered];
//   const [passwordEntered, setPasswordEntered];
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

      // Loading current voter
      const voter = await this.state.ElectionInstance.methods
        .voterDetails(this.state.account)
        .call();
      this.setState({
        currentVoter: {
          address: voter.voterAddress,
          name: voter.name,
          phone: voter.phone,
		  email: voter.email,
		  password: voter.password,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
        },
      });
console.log(this.state.currentVoter.address);
console.log(this.state.currentVoter.name);
console.log(this.state.currentVoter.password);
console.log(this.state.currentVoter.email);

    }catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
}
updateVoterEmail = (event) => {
    this.setState({ voterEmail: event.target.value });
  };
updateVoterPassword = (event) => {
    this.setState({ voterPassword: event.target.value });
  };


	render(){

		return (
		  <div className='container'>
		  <div className="card">
			<h2>Login</h2>
				{/* {(error !="")?(
				  <div className="error">{error}</div>
				):""} */}
			  {/* <form className="card-form" onSubmit={()=>submitHandler(this.state.voter)}> */}
				  <form className="card-form">
				  <div className="input">
			  <input type="text" name="address"  className='input-field'  
			  value={this.state.account}
			  />
					  <label className="input-label">Address</label>
				  </div>

 <div className="input">
			  <input type="text" name="email"  className='input-field'/>
					  <label className="input-label" onChange={this.updateVoterEmail}>Email</label>
				  </div>

				<div className="input">
			<input type="password" name="password" className="input-field" onChange={this.updateVoterPassword}/>
					  <label className="input-label">Password</label>
				  </div>
				  <div className="action">
					  <button className="action-button" type='submit' onClick={() =>submitHandler(this.state.currentVoter, this.state.voterEmail,this.state.voterPassword)}>Login</button>
				  </div>
			  </form>
			  <div className="card-info">
				  <NavLink to="/Registration" activeClassName="nav-active" style={{color:"#000"}}>
            <i className="far fa-address-card" /> Register Here
          </NavLink>
				  {/* <p>Signup <a href="../Registration/Registration.js">Here</a></p> */}
			  </div>
		  </div>
	  </div>
	  
			)}

		  }

function submitHandler (voter,email,password){
console.log(password)
console.log(email)
   if(password === voter.password){
	  window.alert('Sucessful');
	 
	    history.push('/home')
	}else{
		window.alert("Invalid Credentials, Try again")
	}
}
// withRouter(Login);

