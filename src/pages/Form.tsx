import { useState } from 'react';
import {
    Box, Input, Button, Flex, FormControl, FormLabel, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
    Heading
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { DataType } from '../types/types';
import { addDataRepository } from '../repository';
import ImagePreview from './ImagePreview';

export default function Form(): JSX.Element {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [qrData, setQrData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);

    const handleGenerateQRCode = async () => {
        setLoading(true);
        const data: DataType = { id: '', name, email, image: '', phone, address, };
        try {
            if (imageFile) {
                const id = await addDataRepository(imageFile, data);
                if (id) {
                    const qrDataUrl = `http://192.168.3.124:3000/details?id=${id}`;
                    setQrData(qrDataUrl);
                    setLoading(false);
                    onOpen();
                }
            }
        } catch (error) {
            console.error("Erro ao adicionar dados:", error);
            setLoading(false);
        }
    };

    function onSelectedImage(img: string) {
        setImagePreview(img)
    }

    function onSelectedFile(file: File | undefined) {
        setImageFile(file)
    }
    function onSetLoadingPhoto(status: boolean) {
        setLoadingPhoto(status)
    }

    return (
        <Flex
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir={'column'}
            height="100vh"
            bg="gray.50"
            gap={10}
            p={5}
            position="relative"
        >
            <Heading>QR Code Generator</Heading>
            <Box
                p={5}
                maxW="500px"
                width="100%"
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
                mr={5}
            >

                <Flex align={'center'} justify={'center'}>
                    <ImagePreview
                        onSelectedFile={onSelectedFile}
                        imagePreview={imagePreview}
                        onSelectedImagePreview={onSelectedImage}
                        loading={loadingPhoto}
                        setLoading={onSetLoadingPhoto}
                    />
                </Flex>

                <FormControl id="name" mb={4}>
                    <FormLabel>Nome</FormLabel>
                    <Input
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl id="email" mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl id="phone" mb={4}>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                        type="tel"
                        placeholder="Digite seu telefone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>

                <FormControl id="address" mb={4}>
                    <FormLabel>Endereço</FormLabel>
                    <Input
                        type="text"
                        placeholder="Digite seu endereço"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FormControl>

                <Button isLoading={loading} colorScheme="teal" onClick={handleGenerateQRCode} width="full" mb={4}>
                    Gerar QR Code
                </Button>
            </Box>

            {qrData && (
                <Button
                    colorScheme="blue"
                    onClick={onOpen}
                    position="absolute"
                    top="50px"
                    right="100pt"
                >
                    Rever QR Code
                </Button>
            )}

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Seu QR Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" alignItems="center" justifyContent="center">
                        {qrData && <QRCode value={qrData} size={256} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
