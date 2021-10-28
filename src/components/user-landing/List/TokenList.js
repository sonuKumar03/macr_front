import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import TokenUnit from './TokenUnit'

function TokenList(props) {
    const {chapters} = props;
    return (
        <Grid className="m-grid" divided="vertically">
            {chapters.map((t,i)=>(
                <TokenUnit key={i} {...t}/>
            ))}
        </Grid>
    )
}
const mapStateToProps  = (state)=>{
    return {
        chapters:state.chapters
    }
}
export default connect(mapStateToProps,null)(TokenList)