import { Box } from "@chakra-ui/react";
import { useLocation, Navigate } from 'react-router-dom';
import Info from './Info';

export default function Details(): JSX.Element {
    
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

    const query = useQuery();
    const data = query.get('data');

    if (!data) {
        return <Navigate to="/" />;
    }

    let parsedData;
    try {
        parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;
    } catch (e) {
        console.error('Error parsing data', e);
        return <Navigate to="/" />;
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
            <Info
                name={parsedData.name}
                email={parsedData.email}
                phone={parsedData.phone}
                address={parsedData.address}
            />
        </Box>
    );
};
