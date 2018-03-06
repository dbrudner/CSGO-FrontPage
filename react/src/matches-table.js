import React from 'react'
import {Table} from 'react-bootstrap'
import TableHead from './table-head'
import TableTitle from './table-title'

export default function MatchesTable(props) {

    console.log(props.matches)

    const tableStyle = {
        width: '90%',
        textAlign: 'center',
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '20px'
    }


    return (
        <div style={tableStyle}>
            <TableTitle name={props.matches.name}/>
            <Table striped bordered hover responsive condensed>
                <TableHead/>
            </Table>
        </div>
    )
}