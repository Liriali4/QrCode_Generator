import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Details from './pages/Details';
import customTheme from './theme';
import Form from "./pages/Form";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
