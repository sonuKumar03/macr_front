import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { LOAD_QUESTIONS } from '../../store/chapter/constants'
import Sidebar from '../sidebar/sidebar'
import ThreedViewer from '../ThreedViewer/ThreedViewer'
import {LOAD_USER} from '../../store/constants'
function GameRoom(props) {
  const {match,fetchQuestion,global,fetchUser} = props;
  const {user,isloading} = global;
  const chapterId = match.params.id;
  const [userAddress,setuserAddress] = useState(null);
  useEffect(()=>{
      (async()=>{
          await metaMaskInit();
          fetchQuestion({chapterId,userId:user?._id});
      })()
  },[])
 
  useEffect(()=>{ 
      if(userAddress &&userAddress!==''){
          fetchUser(userAddress);
      }
  },[userAddress])

  const metaMaskInit = async()=>{
      const ethereum = window.ethereum;
      if (typeof ethereum !== 'undefined') {
          console.log('MetaMask is installed!');
          let	 userAddress = ethereum.selectedAddress;
          setuserAddress(userAddress);
      }else{
          alert("Install Metamask Extenions!")
      }
      if(ethereum && userAddress){

      }else{
          const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
          let address = ethereum.selectedAddress;
          setuserAddress(address)
      }
  }

  useEffect(()=>{
    if(user){
      fetchQuestion({chapterId,userId:user?._id});
    }
  },[chapterId])

    return (
        <Container>
          <div className="m-grid-container">
        <div className="m-sidebar">
          <Sidebar />
        </div>
        <div className="m-content">
          <ThreedViewer />
        </div>
      </div>
        </Container>
    ) 
}
const mapStateToProps = (state)=>{
  return {
    questions:state.questions,
    global:state.global
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    fetchQuestion:(data)=>dispatch({type:LOAD_QUESTIONS,payload:data}),
    fetchUser:(data)=>dispatch({type:LOAD_USER,payload:data})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom);