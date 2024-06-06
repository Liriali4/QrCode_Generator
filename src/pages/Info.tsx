import { Box, Text, } from '@chakra-ui/react';
import { DataType } from '../types/types';

interface InfoProps {
    data: DataType
}

export default function Info(props: InfoProps): JSX.Element {

    return (
            <Box
                p={5}
                maxW="500px"
                width="100%"
                mx="auto"
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
            >
                <Box my={'20px'}>
                    <Text fontSize={'14pt'} fontWeight={500}>Nome:</Text>
                    <Text>{props.data.name}</Text>
                </Box>

                <Box my={'20px'}>
                    <Text fontSize={'14pt'} fontWeight={500}>Email:</Text>
                    <Text>{props.data.email}</Text>
                </Box>

                <Box my={'20px'}>
                    <Text fontSize={'14pt'} fontWeight={500}>Telefone:</Text>
                    <Text>{props.data.phone}</Text>
                </Box>

                <Box my={'20px'}>
                    <Text fontSize={'14pt'} fontWeight={500}>Endereço:</Text>
                    <Text>{props.data.address}</Text>
                </Box>
            </Box>
    );
}
