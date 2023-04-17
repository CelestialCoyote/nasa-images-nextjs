import { useState, useEffect } from 'react';
import axios from 'axios';


//const apiKey = process.env.NASA_API_KEY;

export default function Apod() {
	const [photoData, setPhotoData] = useState(null);
	//const [isLoading, setLoading] = useState(false);


	const res = axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)
		.then(res => {
			setPhotoData(res.data);
			console.log(res.data);
			//console.log(res.data.media_type);
		});

	//if (isLoading) return <p>Loading...</p>
	//if (!photoData) return <p>No photo data</p>

	return (
		<div className=''>
			Astronomy Photo of the Day

			<div>
				<p>{photoData.title}</p>
				<p>{photoData.date}</p>
				<p>{photoData.explanation}</p>
				<p>Image Credit & Copyright: {photoData.copyright}</p>
			</div>

		</div>
	);
};
