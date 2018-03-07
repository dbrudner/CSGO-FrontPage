import React from 'react'
import {Table} from 'react-bootstrap'
import TableHead from './table-head'
import TableTitle from './table-title'
import TableBody from './table-body'

export default function MatchesTable(props) {

    const tableContainer = {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '20px',
    }

    const table = {
        width: '1px',
        margin: 'auto'
    }

    console.log(props.matches)

    return (
        <div style={tableContainer}>
            <TableTitle name={props.matches[0].name}/>
            <Table style={table} striped bordered hover responsive condensed>
                <TableHead/>
                <TableBody matches={props.matches[0].matches}/>
            </Table>
        </div>
    )
}