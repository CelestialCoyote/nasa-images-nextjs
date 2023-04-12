import Image from 'next/image';
import Link from 'next/link';


export default function ImagePreview({ thumbnailUrl, nasaId }) {

	return (
		<div>
			<Link as={`/photo/${nasaId}`} href='/photo/[id]'>
				<div>
					<Image
						src={thumbnailUrl}
						width={250}
						height={125}
						style={{
							maxWidth: "auto",
							height: "auto",
						}}
						alt='thumbnail'
					/>
					<div>NASA ID: {nasaId}</div>
				</div>
			</Link>
		</div>
	);
};
