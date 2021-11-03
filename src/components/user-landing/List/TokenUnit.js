import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link ,useHistory} from 'react-router-dom';
import { Button, Grid, GridColumn, Progress } from 'semantic-ui-react';
import spacetime from 'spacetime';
import Web3 from 'web3'
import {abi,tokenContractAddress,client_token} from '../../Data'
import { FETCH_CHAPTERS_QUESTIONS } from '../../GameRoom/constants';
function TokenUnit(props) {
    const {href,title,count,id,userAddress,fetchQuestion,token,progress,lastAttemptedOn} = props;
    const total = 0;
    const value =0;
    const history = useHistory();
    const [now,setNow] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            setNow(spacetime.now());
        },1000);
    },[now])

    const canPlay = ()=>{
        if(lastAttemptedOn && now){
            let dt = spacetime(lastAttemptedOn,'utc');
            let nextAttempt = dt.add(12,'hour');
            if(now.isAfter(nextAttempt)){
                return false;
            }else{
                return true;
            }
        }
        return false;   
    }
    const beforeCooldown = ()=>{
        if(lastAttemptedOn&&now){
            let dt = spacetime(lastAttemptedOn,'utc');
            let nextAttempt = dt.add(12,'hour');
            if(now.isAfter(nextAttempt)){
                return ''
            }else{
                return 'Cool Down ' +now.since(nextAttempt).precise
            }
        }
        return ''
    }
    const handlePlay = async(e)=>{
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(abi,tokenContractAddress);
        try{
            // const result1 = await contract.methods.setApprovalForAll(tokenContractAddress,true).send({from:userAddress});
            // const result2 = await contract.methods.safeTransferFrom(userAddress,client_token,token,1,0).call();
            // fetchQuestion(id);
            history.push(`/game/${id}`)
            
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    return (
        <Grid.Row verticalAlign="middle">
            <Grid.Column width={3}>
                <a href={href}>{title}</a>
            </Grid.Column>
            <Grid.Column>{count}</Grid.Column>
            <Grid.Column width={5} verticalAlign="middle" >{ <Progress color="blue" value={progress*100} total={100}  progress='percent' />}</Grid.Column>
            <GridColumn>
                {/* <Link to={`/game/${id}`} > */}
                    <Button disabled={canPlay()} primary size="mini" content="Play" onClick={handlePlay}>
                    </Button>
                {/* </Link> */}
            </GridColumn>
            <GridColumn width={4}>
                {beforeCooldown()}
            </GridColumn>
        </Grid.Row>
    )
}
const mapStateToProps  = (state)=>{
    return {
        userAddress:state.user.userAddress
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        fetchQuestion:(chapterId)=>dispatch({type:FETCH_CHAPTERS_QUESTIONS,payload:chapterId}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TokenUnit);