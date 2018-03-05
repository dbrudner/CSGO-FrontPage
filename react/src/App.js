import React, { Component } from 'react';
import TableList from './tableList'
import axios from 'axios'

class App extends Component {

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		axios.get('/matches/today')
		.then(res => console.log(res))
	}


	render() {
		return (
			<div className="App">
				<TableList/>
			</div>
		);
	}
}

export default App;
