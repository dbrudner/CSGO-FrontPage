import React from 'react'
import {Table} from 'react-bootstrap'
import TableHead from './table-head'
import TableTitle from './table-title'
import TableBody from './table-body'

export default function MatchesTable(props) {

    const tableStyle = {
        width: '80%',
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
                <TableBody matches={props.matches}/>
            </Table>
        </div>
    )
}