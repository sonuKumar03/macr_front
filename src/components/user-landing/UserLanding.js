import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container, Header } from 'semantic-ui-react';
import { abi, home, tokenContractAddress } from '../Data';
import { FETCH_CHAPTERS_REQUESTED, GAME_INIT } from './constants';
import TokenList from './List/TokenList';
import {setUserAddress} from '../../store/reducer'
import {} from '../../store/constants'
import Web3 from 'web3';
function UserLanding(props) {
    const [userAddress,setuserAddress] = useState(null);
    const {gameInitiate} = props
    useEffect(()=>{
        (async()=>{
            await metaMaskInit();
        })()
    },[])

    useEffect(()=>{ 
        if(userAddress &&userAddress!==''){
            gameInitiate(userAddress) ;
        }
    },[userAddress])

    const metaMaskInit = async()=>{
        const ethereum = window.ethereum;
        if (typeof ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            let	 userAddress = ethereum.selectedAddress;
            setuserAddress(userAddress);
            props.setUserAddress(userAddress);
        }else{
            alert("Install Metamask Extenions!")
        }
        if(ethereum && userAddress){
            const ethereum = window.ethereum;
            try{
                let address = ethereum.selectedAddress;
                const myWeb3 = new Web3(Web3.givenProvider);
                const contract = await new myWeb3.eth.Contract(abi,tokenContractAddress);
                const t = await contract.methods.setApprovalForAll(tokenContractAddress,true).call();
            }catch(err){
                console.log(err);
            }
        }else{
            const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
            let address = ethereum.selectedAddress;
            setuserAddress(address)
        }
    }

    const {shouldRedirect} = props;
    if(!shouldRedirect){
        return (
            <Container >
                    <Header color="teal" dividing textAlign="center" size="huge" >Wallet Id : {userAddress}</Header>
                    <TokenList/>
            </Container>
        )
    }else{
        window.location.href=home;
        return <></>
    }
}
const mapStateToProps = (state)=>{
    return {    
        chapters:state.chapters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchChapters: () => dispatch({type:FETCH_CHAPTERS_REQUESTED}),
      gameInitiate:data=>dispatch({type:GAME_INIT,payload:data}),
      setUserAddress:data=>dispatch(setUserAddress(data)),
      dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLanding)
