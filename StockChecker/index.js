const alfy = require('alfy');

const apiToken = alfy.cache.get('token');

try {
	const stonks = alfy.input.replace(' ', ',');
	const data = await alfy.fetch(
		`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stonks}&types=quote&range=1m&token=${apiToken.trim()}`
	);
	const companies = Object.keys(data);

	const items = companies.map((stonk) => {
		try {
			const percentage = (data[stonk].quote.changePercent * 100).toFixed(2);
			const extendedChange = (data[stonk].quote.extendedChangePercent * 100).toFixed(2);
			const dayGraph = percentage > 0 ? '📈' : '📉';
			const fiftyTwoWeekGraph = extendedChange > 0 ? '📈' : '📉';
			const fiftyTwoWeekLow = data[stonk].quote.week52Low.toFixed(2);
			const fiftyTwoWeekHigh = data[stonk].quote.week52High.toFixed(2);

			return {
				title: `${data[stonk].quote.symbol}: ${data[stonk].quote.latestPrice} | Day Change: ${data[stonk].quote.change} (${percentage}%) ${dayGraph}`,
				subtitle: `52 Week Low and High: ${fiftyTwoWeekLow} - ${fiftyTwoWeekHigh} | Extended Change: ${data[stonk].quote.extendedChange} (${extendedChange}%) ${fiftyTwoWeekGraph}`,
				arg: `${data[stonk].quote.symbol}`,
			};
		} catch (err) {
			return {
				title: `${stonk}: Not Found`,
			};
		}
	});
	alfy.output(items);
} catch (err) {
	alfy.error(`API Access Denied`);
}
