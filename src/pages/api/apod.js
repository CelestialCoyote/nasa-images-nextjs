// export default async function handler(req, res) {
// 	const { query, method } = req;
// 	let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

// 	if (!query.date) {
// 		url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
// 	};

// 	if (query.date) {
// 		url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`;
// 	};

// 	switch (method) {
// 		case 'GET': {
// 			try {
// 				res.status(400).json({ message: 'Error 400: Bad Request' });

// 				const resp = await fetch(url, {
// 					headers: { accept: 'application/json' },
// 				});

// 				const json = await resp.json();

// 				if (resp.ok) {
// 					if (json.length === 0) {
// 						res
// 							.status(404)
// 							.json({ message: 'Error 404: No data for this date.' });
// 					} else {
// 						res.status(200).json({ type, items: json });
// 					}
// 				} else {
// 					res
// 						.status(resp.status)
// 						.json({ message: `Error ${resp.status}: ${resp.statusText}` });
// 				}
// 			} catch (e) {
// 				console.log(e);
// 				res.status(500).json({ message: 'Oops... Something went wrong' });
// 			}
// 			break;
// 		}
// 		default:
// 			res.setHeader('Allow', 'GET');
// 			res
// 				.status(405)
// 				.json({ message: `Error 405: Method ${method} Not Allowed` });
// 			break;
// 	};
// };



export default async function handler(req, res) {
	const { query, method } = req;
	let url = '';

	console.log(`query: ${req.query}`)

	if (!query.date) {
		url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
	};

	// if (query.date) {
	// 	url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${query.date}`;
	// };

	const data = await fetch(url)
		.then(response => response.json());

	res.json(data);
	console.log(data);
};
