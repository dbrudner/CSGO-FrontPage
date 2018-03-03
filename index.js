const { HLTV } = require('hltv')
const _ = require('lodash')
const moment = require('moment')

function timeConversion(millisec) {

	var seconds = (millisec / 1000).toFixed(1);

	var minutes = (millisec / (1000 * 60)).toFixed(1);

	var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

	var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

	if (seconds < 60) {
		return seconds + " Sec";
	} else if (minutes < 60) {
		return minutes + " Min";
	} else if (hours < 24) {
		return hours + " Hrs";
	} else {
		return days + " Days"
	}
}

HLTV.getMatches().then((res) => {

	let matches = res;

	let events = res.map(match => {
		return match.event
	})

	events = _.uniqBy(events, 'id')


	const kat = matches.filter(match => {
		if (match.event) {
			return match.event.id === 3309
		} else {return}
	})

	const liquid = kat.filter(match => {
		return match.team1.name === 'Liquid' || match.team2.name === 'Liquid'
	})

	let unix = liquid[0].date
	const time = moment.unix(unix/1000).format("MM/DD/YYYY/HH:MM:SS");

	const current = Date.now()

	console.log('unix', unix)
	console.log(current)

	const difference = unix - current;

	console.log(timeConversion(difference))
	console.log(time)


	const liveMatches = matches.filter(match => {
		return match.live
	})
	// console.log(liveMatches)
})

// HLTV.getMatchesStats({startDate: '2018-03-03', endDate: '2018-03-03'}).then((res) => {
// 	console.log(res)
//   })

// HLTV.connectToScorebot({id: 2320083, onScoreboardUpdate: (data) => {
// 	console.log("scoreboard update")
// 	console.log('scoreupdate', data)
// }, onConnect: () => {
// 	console.log('connected')
// }, onLogUpdate: (newData) => {
// 	console.log("log update")
// 	console.log(newData)
// },
// onDisconnect: () => {
// 	console.log('disconnected')
// }	
// })