import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid, GridColumn, Progress } from 'semantic-ui-react';
import Web3 from 'web3'
import {abi,tokenContractAddress} from '../../Data'
export default function TokenUnit(props) {
    const {href,title,count,id} = props;
    const total = 0;
    const value =0;
    const handlePlay = async(e)=>{
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(abi,tokenContractAddress);
        const result = await contract.methods.setApprovalForAll(tokenContractAddress,true).call();
        console.log(result);
    }
    return (
        <Grid.Row verticalAlign="middle">
            <Grid.Column width={3}>
                <a href={href}>{title}</a>
            </Grid.Column>
            <Grid.Column>{count}</Grid.Column>
            <Grid.Column width={5} verticalAlign="middle" >{ <Progress color="violet" value={value} total={total} progress='ratio' />}</Grid.Column>
            <GridColumn>
                <Link to={`/game/${id}`} >
                    <Button size="mini" content="Play">
                    </Button>
                </Link>
            </GridColumn>
        </Grid.Row>
    )
}
