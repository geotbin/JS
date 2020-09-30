/*
 * @param date a Date object
 * @return formatted string for date in th form ss:ms
 */
var secondsAndMs = (date) => {
	return `${date.getSeconds()}:${date.getMilliseconds()}`
}

module.exports.secondsAndMs = secondsAndMs;
