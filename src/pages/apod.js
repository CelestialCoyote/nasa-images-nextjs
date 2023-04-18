import { useState } from 'react';
import Image from 'next/image';


const apiKey = process.env.NASA_API_KEY;

export default function Apod({ apodData }) {
	const [photoData, setPhotoData] = useState(apodData);


	if (!photoData) return <p>No photo data</p>

	return (
		<div className=''>
			Astronomy Photo of the Day

			<div className='container p-4 pt-20 mx-auto sm:px-8 lg:pt-10'>

				<div className='grid lg:grid-cols-2 lg:gap-4'>
					{photoData?.media_type === 'video' ? (
						<div className='relative h-[50vh] mb-4 lg:mb-0'>
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
						<div className='relative h-[50vh] rounded-lg mb-4 lg:mb-0 lg:h-auto focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-indigo-400'>
							<a
								href={photoData?.hdurl}
								className='rounded-lg lg:hidden focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
							>
								<Image
									src={photoData?.url}
									alt={photoData?.title}
									className='object-contain object-center rounded-lg lg:object-top'
									layout='fill'
									priority={true}
									loading='eager'
									quality={100}
								/>
							</a>
							<div className='hidden lg:sticky lg:block lg:top-10'>
								<a
									href={photoData?.hdurl}
									className='rounded-lg focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
								>
									<img
										src={photoData?.url}
										alt={photoData?.title}
										loading='eager'
										className='rounded-lg'
									/>
								</a>
							</div>
						</div>
					)}

					<div className='p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
						<p className='pt-2 text-primary lg:pt-0'>{photoData?.date}</p>
						<h1 className='py-2 text-4xl font-medium text-gray-200 glow'>
							{photoData?.title}
						</h1>
						{photoData?.copyright ? (
							<h2 className='text-lg text-gray-400'>{`Credit: ${photoData.copyright}`}</h2>
						) : null}
						<p className='pt-2 text-xl leading-relaxed text-gray-300'>
							{photoData?.explanation}
						</p>
					</div>
				</div>
			</div>

		</div>
	);
};


export async function getServerSideProps() {
	const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
	//const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2021-01-04`);
	const apodData = await results.json();

	return {
		props: { apodData }
	};
};


// export async function getStaticProps() {
// 	const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
// 	//const results = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2021-01-04`);
// 	const apodData = await results.json();

// 	return {
// 		props: { apodData }
// 	};
// };