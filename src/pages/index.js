import Head from 'next/head';
import Link from 'next/link';


export default function Home() {

	return (
		<div className='flex flex-col m-4'>
			<Head>
				<title>NASA API</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='flex flex-col items-center'>
				<h1 className='text-3xl mb-8'>NASA API</h1>
				<Link className='mb-6' href="/apod">Astronomy Photo of the Day</Link>
				<Link className='mb-6' href="/image-video-library">Image and Video Library</Link>
			</div>

			
		</div>
	);
};
