import React from 'react'
import {Table} from 'react-bootstrap'
import TableHead from './table-head'
import TableTitle from './table-title'

export default function MatchesTable(props) {

    const tableStyle = {
        width: '500px',
        textAlign: 'center',
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '20px'
    }

    return (
        <div style={tableStyle}>
            <TableTitle/>
            <Table striped bordered hover responsive condensed>
                <TableHead/>
            </Table>
        </div>
    )
}