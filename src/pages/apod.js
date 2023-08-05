import { useState } from 'react';
import Image from 'next/image';


export default function Apod({ apodData }) {
	const todaysDate = new Date().toLocaleDateString('en-CA');
	const [data, setData] = useState(apodData);
	const [selectDate, setSelectDate] = useState(todaysDate);


	const getPhoto = async () => {
		try {
			const response = await fetch(`/api/apod/?date=${selectDate}`);
			const apodData = await response.json();

			setData(apodData);
		} catch (error) {
			console.log(error);
		}
	}

	if (!data) return <p>No photo data</p>

	return (
		<div className='min-h-screen'>
			<h1 className='text-3xl text-center mt-4 mb-6'>Astronomy Photo of the Day</h1>

			<div className='flex justify-center items-center'>
				<label>Choose a date:</label>
				<input
					className='text-center m-8 bg-slate-500 text-black'
					type="text"
					value={selectDate}
					min="1995-06-16"
					max="2023-07-30"
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
			</div>

			{/* <div className='container p-4 pt-20 mx-auto sm:px-8 lg:pt-10'> */}
			<div className='grid lg:grid-cols-2 lg:gap-4 p-8'>
				{data?.media_type === 'video' ? (
					<div className='relative h-[50vh] mb-4 lg:mb-0'>
						<iframe
							src={data?.url}
							title={data?.title}
							width='560'
							height='349'
							className='absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg'
							frameBorder='0'
							allowFullScreen
						/>
					</div>
				) : (
					<div className='
						
						border-2
						rounded-lg
						mb-4
						lg:mb-0
						
						focus-within:outline-none
						focus-within:ring-2
						focus-within:ring-offset-0
						focus-within:ring-indigo-400
					'>
						<a
							href={data?.hdurl}
							className='
								rounded-lg
								lg:hidden
								focus:ring-0
								focus:ring-offset-0
								focus:ring-transparent'
						>
							<Image
								src={data?.url}
								alt={data?.title}
								//className='object-contain object-center rounded-lg lg:object-top'
								//height={200}
								//width={500}
								//width={'auto'}
								//fill={true}
								//priority={true}
								//loading='eager'
								//quality={100}
								width="0"
								height="0"
								sizes="100vw"
								className="w-full h-auto"
							/>
						</a>
						<div className='hidden lg:sticky lg:block lg:top-10'>
							<a
								href={data?.hdurl}
								className='rounded-lg focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
							>
								<img
									src={data?.url}
									alt={data?.title}
									loading='eager'
									className='rounded-lg'
								/>
							</a>
						</div>
					</div>
				)}

				<div className='p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
					<p className='pt-2 text-primary lg:pt-0'>{data?.date}</p>
					<h1 className='py-2 text-4xl font-medium text-gray-200 glow'>
						{data?.title}
					</h1>
					{data?.copyright ? (
						<h2 className='text-lg text-gray-400'>{`Credit: ${data.copyright}`}</h2>
					) : null}
					<p className='pt-2 text-xl leading-relaxed text-gray-300'>
						{data?.explanation}
					</p>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
};


export const getServerSideProps = async () => {
	const results = await fetch("http://localhost:3000/api/apod/");
	const apodData = await results.json();

	return {
		props: { apodData }
	};
};
