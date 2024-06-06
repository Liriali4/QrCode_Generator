import { Box, Input, VStack, Text, Image, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import ImageCompression from './browser-image-compression';
import { CiCamera } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

interface ImagePreview {
	onSelectedFile: (file: File | undefined) => void
	imagePreview: string
	text?: string
	onSelectedImagePreview: (fileString: string) => void
	onDeleteImage?: () => void
	loading: boolean
	setLoading: (loading: boolean) => void
	isItem?: boolean
	onClick?: () => void
	secundaryText?: string
	className?: string
	disabledInput?: boolean
}

function ImagePreview(props: ImagePreview) {

	const { onClick, onSelectedFile, imagePreview, onSelectedImagePreview, text, onDeleteImage, loading, setLoading, isItem, secundaryText, disabledInput } = props

	const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });


	function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {

		const reader = new FileReader();

		const file = e.target.files?.[0];
		const f = e.target.files as FileList

		if (file) {
			setLoading(true)
			ImageCompression({ file }).then((result) => {
				const newCompressedFile = result.compressedFile;
				onSelectedFile(newCompressedFile);
				setLoading(false)
				reader.onload = (e: ProgressEvent<FileReader>) => {
					onSelectedImagePreview(e.target?.result as string);
				};
				reader.readAsDataURL(f[0]);

			});

		}

	}
	const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = event.target as HTMLImageElement;

		setImageDimensions({ width: target.naturalWidth, height: target.naturalHeight });
	};

	function onClosePreview() {
		if (onDeleteImage) {
			onDeleteImage();
		}
		onSelectedImagePreview('');
		onSelectedFile(undefined)
		setImageDimensions({ width: 0, height: 0 });
	}


	return (

		<Box className={props.className ? props.className : 'step-1-1'}>
			{
				imagePreview === '' ?
					<Box
						cursor='pointer'
						borderWidth='1px'
						borderRadius='md'
						width={'223px'}
						height={'223px'}
						display='flex'
						flexShrink={0}
						flexDir='column'
						justifyContent='space-between'
						alignItems='center'
						onClick={onClick ? onClick : () => document.getElementById('imageFile')?.click()}
						bg='#fff'
					>
						<VStack
							pt={'80px'}
						>

							{loading ? (
								<Spinner color='#F29325' />
							) : (
								<>
									<CiCamera size={24} />
									{text ? <Text fontSize={'sm'} textAlign={'center'}>{text}</Text> : <Text>Adicionar foto</Text>}
									{secundaryText && <Text fontSize={'2xs'} textAlign={'center'}>{secundaryText}</Text>}
								</>
							)}
						</VStack>
						{!disabledInput && (

							<Input
								type='file'
								placeholder='Adicionar foto'
								focusBorderColor='blue.400'
								readOnly
								backgroundColor='white'
								accept='image/*'
								_hover={{
									cursor: 'pointer',
								}}
								id='imageFile'
								hidden
								onChange={onChangeImage}
							/>
						)
						}
					</Box>
					:
					<Box
						position='relative'
						width={'223px'}
						height={'223px'}
						borderWidth='1px'
						borderRadius='md'
					>
						<Image
							src={imagePreview}
							alt='Preview'
							onLoad={handleImageLoad}
							boxSize='100%'
							objectFit={(imageDimensions.width > 223 && imageDimensions.height > 1000) || (imageDimensions.width < 223 && imageDimensions.height > 223) ? 'contain' : 'cover'}
						/>
						{
							!isItem ?
								(
									<Box
										position='absolute'
										top='0'
										right='0'
										margin='2'
										zIndex='1'
										bg={'#fff'}
										p={'2'}
										borderRadius={'8'}
										cursor='pointer'
										onClick={onClosePreview}
										color='#ff2a00'
									>
										<RiDeleteBinLine />
									</Box>
								) : (
									null
								)
						}

					</Box>
			}

		</Box>
	)
}

export default React.memo(ImagePreview, (prev, next) =>
	prev.imagePreview === next.imagePreview &&
	prev.onSelectedImagePreview === next.onSelectedImagePreview &&
	prev.onSelectedFile === next.onSelectedFile)