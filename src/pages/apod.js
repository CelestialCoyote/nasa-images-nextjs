import { useState, useEffect } from 'react';
import axios from 'axios';


const apiKey = process.env.NASA_API_KEY;

export default function Apod() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);


	// useEffect(() => {
	// 	axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)
    //     //axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2021-01-04`)
    //         .then(res => {
    //             setData(res.data)
    //             console.log(res.data);
    //             console.log(res.data.media_type);
    //         });
    // }, []);

	if (isLoading) return <p>Loading...</p>
	if (!data) return <p>No photo data</p>
	if (apiKey === undefined) return <p>no api key</p>

	return (
		<div className=''>
			Astronomy Photo of the Day
			{/* <h1>The value of customKey is: {process.env.NASA_API_KEY}</h1> */}
			{/* <p>{data}</p> */}
			<p>{process.env.TEST}</p>
		</div>
	);
};
