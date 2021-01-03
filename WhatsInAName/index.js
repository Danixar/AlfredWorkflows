const alfy = require('alfy');
const flag = require('emoji-flag');

try {
	const names = alfy.input
		.split(/\s+/)
		.filter(Boolean)
		.map((name) => `name[]=${name}&`)
		.reduce((acc, cur) => acc + cur, '');

	const nationalityData = await alfy.fetch(`https://api.nationalize.io?${names}`);
	const ageData = await alfy.fetch(`https://api.agify.io?${names}`);
	const genderData = await alfy.fetch(`https://api.genderize.io?${names}`);

	const items = nationalityData.map((nationData) => {
		try {
			const name = nationData.name;
			const allData = {
				...nationData,
				...ageData.find((n) => n.name === name),
				...genderData.find((n) => n.name === name),
			};

			return {
				title: `${allData.name}: ${allData.age} years old ${allData.gender} (${(
					allData.probability * 100
				).toFixed(0)}% chance)`,
				subtitle: `Nationality: ${allData.country
					.map((co) => `${flag(co.country_id)} ${co.country_id} (${(co.probability * 100).toFixed(2)}%)  `)
					.reduce((acc, cur) => acc + cur, '')}`,
				arg: allData.name,
			};
		} catch (err) {
			return { title: `${nationData.name}: Could not retrieve data` };
		}
	});

	alfy.output(items);
} catch (err) {
	alfy.error(`API Connection Error`);
}
