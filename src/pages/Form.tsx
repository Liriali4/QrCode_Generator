import { useState } from 'react';
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { DataType } from '../types/types';
import { addDataRepository } from '../repository';

export default function Form(): JSX.Element {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [qrData, setQrData] = useState<string | null>(null);

    const handleGenerateQRCode = async () => {
        const data: DataType = {
            id: '',
            name,
            email,
            phone,
            address,
        };

        try {
            const id = await addDataRepository(data);
            if (id) {
                const qrDataUrl = `http://localhost:3000/details?id=${id}`;
                setQrData(qrDataUrl);
            }
        } catch (error) {
            console.error("Erro ao adicionar dados:", error);
        }
    };


    return (
        <Flex
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bg="gray.50"
            gap={20}
            p={5}
        >
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

                <Button colorScheme="teal" onClick={handleGenerateQRCode} width="full" mb={4}>
                    Gerar QR Code
                </Button>
            </Box>

            {qrData && (
                <Box
                    p={5}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                >
                    <QRCode value={qrData} size={256} />
                </Box>
            )}
        </Flex>
    );
}
