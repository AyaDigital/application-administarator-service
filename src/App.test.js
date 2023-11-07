import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import { store } from './_store';
import { theme } from 'styles/themes';

test('renders learn react link', () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</Provider>
	);
	// expect(linkElement).toBeInTheDocument();
});
