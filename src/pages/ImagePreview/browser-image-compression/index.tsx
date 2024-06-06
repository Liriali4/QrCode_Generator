import imageCompression from "browser-images-compression";

interface ImageCompressionType {
	file: File | undefined
}

export default async function ImageCompression(props: ImageCompressionType) {
	const { file } = props
	let compressedFile;

	const options = {
		maxSizeMB: 0.2,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	}
	try {
		compressedFile = await imageCompression(file as File, options)
	} catch (error) {
		console.log(error);
	}
	return {
		compressedFile
	}

}