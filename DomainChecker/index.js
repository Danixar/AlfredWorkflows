const alfy = require('alfy');

try {
	const data = await alfy.fetch(`https://api.domainsdb.info/v1/domains/search?limit=10&domain=${alfy.input}`);

	const items = alfy.inputMatches(data.domains, 'domain').map((match) => ({
		title: match.domain,
		subtitle: match.country,
	}));
	alfy.output(items);
} catch (err) {
	alfy.error(err.statusMessage);
}
