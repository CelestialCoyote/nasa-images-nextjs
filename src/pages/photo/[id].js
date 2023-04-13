import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';


export default function photo({ photo }) {
	const router = useRouter();

	if (!router.isFallback && !photo) {
		return <div>ERROR 404 PAGE NOT FOUND</div>
	}

	console.log(photo);

	return (
		<div className='flex flex-col items-center m-12'>
			<div>
				{router.isFallback ? (
					<div>Loading  . . .</div>
				) : (
					<>
						<Image
							src={photo}
							width={960}
							height={960}
							style={{
								maxWidth: "100%",
								height: "auto",
							}}
							placeholder="blur"
							blurDataURL="/spinner.svg"
							alt='nasa image'
						/>
					</>
				)}
			</div>
			
			<Link className='mt-10' href='/'>
				<button className='bg-red-500 border-2 border-yellow-200'>Go Home</button>
			</Link>
		</div>
	);
};


export async function getStaticProps({ params }) {
	const nasa_id = params.id;
	const results = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);
	const previews = await results.json();
	const photo = await previews.collection.items[0].href;

	console.log(photo);

	return {
		props: { photo }
	};
};

export async function getStaticPaths() {
	const results = await fetch("https://images-api.nasa.gov/search?media_type=image");
	const preview = await results.json();
	const items = await preview.collection.items;

	return {
		paths:
			items?.map((nasa) => ({
				params: {
					id: nasa.data[0].nasa_id,
				},
			})) || [],
		fallback: true
	};
};
