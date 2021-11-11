import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Placeholder } from 'semantic-ui-react';
import TokenUnit from './TokenUnit';

function TokenList(props) {
    const {chapters,global} = props;
    const {user,isloading} = global;
    useEffect(()=>{
        console.log(isloading);
    },[isloading])
    const ar = Array(5).fill(0);
    return (
        <>
            {!isloading?(
                <Grid className="m-grid" divided="vertically">
                {
                    chapters.map((t,i)=>(
                        <TokenUnit key={i} {...t}/>
                    ))
                }
            </Grid>):(
                ar.map((e,i)=>(
                    <Placeholder fluid key={i}>
                    <Placeholder.Header image>
                          <Placeholder.Line  length="full"/>
                        <Placeholder.Line />
                      </Placeholder.Header>
                        </Placeholder>
                ))
            )
        }
        </>
    )
}
const mapStateToProps  = (state)=>{
    return {
        chapters:state.chapters,
        global:state.global
    }
}
export default connect(mapStateToProps,null)(TokenList)