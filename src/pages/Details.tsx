import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import { DataType } from '../types/types';
import { getDataRepository } from '../repository';
import Info from './Info';


export default function Details(): JSX.Element {
    
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<DataType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const id = searchParams.get('id');

    useEffect(() => {
        if (id) {
            getDataRepository(id)
                .then((response) => {
                    if (typeof response == 'object') {
                        setData(response);
                    } else {
                        setError("Nenhum dado encontrado para o ID fornecido.");
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError("Erro ao obter os dados.");
                    setLoading(false);
                });
        } else {
            setError("ID não fornecido.");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return( 
            <Flex h={'100vh'} w={'100%'} align={'center'} justify={'center'}>
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }


    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            w={'100%'}
            bg="gray.100"
        >
            <Info data={data as DataType}  />
        </Box>
    );
};
