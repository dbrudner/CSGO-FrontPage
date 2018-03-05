import React, { Component } from 'react';
import TableList from './tableList'

class App extends Component {

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		console.log(timeZone)
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
