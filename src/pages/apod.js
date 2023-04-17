import { useState } from 'react';
import Image from 'next/image';


const apiKey = process.env.NASA_API_KEY;

export default function Apod({ apodData }) {
	const [photoData, setPhotoData] = useState(apodData);
	const [isLoading, setLoading] = useState(false);

	if (isLoading) return <p>Loading...</p>
	if (!photoData) return <p>No photo data</p>

	return (
		<div className=''>
			Astronomy Photo of the Day

			<Image
				src={photoData.hdurl}
				width={1024}
				height={1024}
				className="sm:rounded-t-lg"
				style={{
					maxWidth: "auto",
					height: "100%",
				}}
				placeholder="blur"
				blurDataURL="/spinner.svg"
				alt='photo of the day'
			/>
			<div>
				<p>{photoData.title}</p>
				<p>{photoData.date}</p>
				<p>{photoData.explanation}</p>
				<p>Image Credit & Copyright: {photoData.copyright}</p>
			</div>

		</div>
	);
};


export async function getStaticProps() {
	const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
	const apodData = await results.json();

	return {
		props: { apodData }
	};
};
