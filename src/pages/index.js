import Head from 'next/head';
import { useState } from 'react';
import ImagePreview from '../components/ImagePreview';


export default function Home({ items }) {
	const [search, setSearch] = useState('');
	const [photos, setPhotos] = useState(items);

	return (
		<div className='flex flex-col m-4'>
			<Head>
				<title>NASA API</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>


			<main className='main'>
				<h1 className='text-blue-500 text-4xl'>Welcome to NASA Gallery</h1>

				<div className='flex flex-row m-8 w-full justify-center'>
					<input
						id='nasaSearch'
						onChange={(e) => setSearch(e.target.value)}
						className='w-3/4'
						type='text'
						placeholder='search for an image'
					/>

					<button
						className='bg-blue-700 w-1/4 ml-6'
						disabled={search == ""}
						onClick={async () => {
							const results = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${search}`);
							const preview = await results.json();

							setPhotos(await preview.collection.items);
						}}
					>
						Find
					</button>
				</div>

				<div className='grid grid-cols-4 gap-4'>
					{photos && photos.map((preview) => (
						<ImagePreview
							key={preview.data[0].nasa_id}
							thumbnailUrl={preview.links[0].href}
							nasaId={preview.data[0].nasa_id}
						/>
					))}
				</div>

			</main>
		</div>
	);
};


export async function getStaticProps() {
	const results = await fetch("https://images-api.nasa.gov/search?media_type=image");
	const preview = await results.json();
	const items = await preview.collection.items;

	return {
		props: { items }
	};
};
