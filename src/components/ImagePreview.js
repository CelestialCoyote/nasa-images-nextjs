import Image from 'next/image';
import Link from 'next/link';


export default function ImagePreview({ thumbnailUrl, nasaId }) {

	return (
		<Link className='h-64 m-6' as={`/photo/${nasaId}`} href='/photo/[id]'>

			<Image
				src={thumbnailUrl}
				width={320}
				height={240}
				className="sm:rounded-t-lg"
				style={{
					maxWidth: "auto",
					height: "100%",
				}}
				placeholder="blur"
				blurDataURL="/spinner.svg"
				alt='thumbnail'
			/>

			<div className='text-white mt-4'>NASA ID: {nasaId}</div>

		</Link>
	);
};
