// Node modules
import React, { Component } from "react";

// CSS
import "./Landing.css";

// const buttonRef = React.createRef();
export default class LearnMore extends Component {
      render() {    
        return (
            <>
                <div classNameName="container align-middle">

                  <div className="row">

                    <div className="col-lg-8">

                      <h2 className="headingLearn">Why use decentralized voting?</h2>

          
                      <hr className="break" style={{width: '50%'}}/>

                      <img className="img-fluid" src="https://images.unsplash.com/photo-1626162987518-4fee900a9323?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                        alt="Voters standing in a queue to cast vote"/>

                      <hr className="break" style={{width: '51%'}}/>

                      <br/>

                      <div className="containerLearnMore" >
                        <p className="content1">Elections are a crucial component of every democratic society because they enable the public to express their opinions through voting. Elections provide a self-actualizing goal by validating individual citizens' value and dignity as human beings. Whatever other demands voters may have, election involvement helps to boost their self-esteem and respect. Voting allows people to have their voice and express their partisanship, which satisfies their desire for a sense of belonging.</p>
                        <br/>
                        <p className="content1">The voting procedure has been based on pen and paper since the inception of democratically choosing candidates. To reduce fraud and have the voting process traceable and verifiable, it is important to replace the existing pen and paper method with a modern election system. 
Modern electronic solutions such as centralized e-voting platform are one form of solution to these issues. However, even with such electronic voting systems in place, security problems such as hacking and physical security are highly likely to arise.
</p>
                     
                      <p className="content1">The lack of auditing capabilities and system verification procedures are the most serious and widespread issues of the current ballot-based voting as well as that of a centralized e-voting system.
 Application of a blockchain voting system allows to eradicate such contingency completely. This paper proposes an online voting system based on the Ethereum blockchain.
Blockchain is a decentralized, distributed, immutable public ledger. With no single point of failure, blockchain ensures data immutability and integrity. Adding new data also referred to as creating a transaction in the blockchain is only done after it is approved by everyone participating in the network which allows for secure transactions.
</p>
 </div>
 <br/>
                      <div className="containerLearnMore" >
                        <p className="lead2" >How to use?</p>

                        <p className="content1">1. Download and install the MetaMask Browser Extension.</p>
                        <p className="content1">2. Double-check that the Ethereum Account you've been given has been imported into MetaMask.</p>
                         <p className="content1">3. Register into the system from the register tab.</p>
                         <p className="content1">4. Wait for the admin to verify your account.</p>
                        <p className="content1">5. Browse through the election section and vote!</p>
                      </div>
                      
                      <br/>
                      
                      <div className="containerLearn2 general" role="alert">
                        <span>The application is still undergoing testing and development! Please be aware that there might be few glitches</span>
                      </div>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>    
            </>
        );
    }
}
