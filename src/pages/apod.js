import { useState } from 'react';
import Image from 'next/image';


export default function Apod({ apodData }) {
	const todaysDate = new Date().toLocaleDateString('en-CA');
	const [photoData, setPhotoData] = useState(apodData);
	const [selectDate, setSelectDate] = useState(todaysDate);


	const getPhoto = async () => {
		try {
			// const response = await fetch(
			// 	`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=1999-07-15`,
			// 	{ headers: { accept: 'application/json' } }
			// );

			const response = await fetch("/api/apod/");

			const apodData = await response.json();
			console.log(apodData);
			setPhotoData(apodData);
			
		} catch (error) {
			console.log(error);
		}
	}

	if (!photoData) return <p>No photo data</p>

	return (
		// <div>apodData</div>
		<div className='flex flex-col justify-center'>
			<h1 className='text-3xl text-center mt-4 mb-6'>Astronomy Photo of the Day</h1>

			<div className='flex justify-center items-center'>
				<label>Choose a date:</label>
				<input
					className='text-center m-8 bg-slate-500 text-black'
					type="text"
					value={selectDate}
					min="1995-06-16"
					max="2023-04-29"
					placeholder="1995-06-16"
					onChange={(event) => {
						setSelectDate(event.target.value);
					}}
				/>
				<button
					onClick={getPhoto}
				>
					Get Photo
				</button>
				{/* <input
					className='text-center m-8 bg-slate-500 text-black'
					type="date"
					value={selectDate}
					min="1995-06-16"
					max="2023-04-29"
					placeholder="1995-06-16"
					onChange={(event) => {
						setSelectDate(event.target.value);
						GetPhoto();
					}}
				/> */}
			</div>

			<div className=''>
				{photoData?.media_type === 'video' ? (
					<div className=''>
						<iframe
							src={photoData?.url}
							title={photoData?.title}
							width='560'
							height='349'
							className='absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg'
							frameBorder='0'
							allowFullScreen
						/>
					</div>
				) : (
					<div className='flex justify-center'>
						<a
							href={photoData.hdurl}
							className='rounded-lg lg:hidden focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
						>
							<Image
								src={photoData.url}
								alt={photoData.title}
								className='object-contain object-center rounded-lg lg:object-top'
								height={400}
								width={400}
								//fill={true}
								// priority={true}
								quality={100}
							/>
						</a>
						<div className='hidden lg:sticky lg:block lg:top-10'>
							<a
								href={photoData.hdurl}
								className='rounded-lg focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
							>
								<img
									src={photoData.url}
									alt={photoData.title}
									loading='eager'
									className='rounded-lg'
								/>
							</a>
						</div>
					</div>
				)}

				<div className='mt-6 p-8'>
					<p className='pt-2 text-primary lg:pt-0'>{photoData.date}</p>
					<h1 className='py-2 text-4xl font-medium text-gray-200 glow'>
						{photoData.title}
					</h1>
					{photoData.copyright ? (
						<h2 className='text-lg text-gray-400'>{`Credit: ${photoData.copyright}`}</h2>
					) : null}
					<p className='pt-2 text-xl leading-relaxed text-gray-300'>
						{photoData.explanation}
					</p>
				</div>
			</div>

		</div>
	);
};


export async function getServerSideProps() {
	const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
	//const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=2021-01-04`);
	const apodData = await results.json();

	console.log("First fetch");
	console.log(apodData);

	return {
		props: { apodData }
	};
};
