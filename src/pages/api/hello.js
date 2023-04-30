// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const data = await fetch(
		`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${selectDate}`
	).then(response => response.json());

	res.json(data);
	console.log(data);
};
