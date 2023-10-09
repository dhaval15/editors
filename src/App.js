import React, { useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './store';

import {
  createMemoryRouter,
  createHashRouter,
	createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestEditor from './editors/TestEditor';
import Minimal from './editors/minimal/Editor';

const router = createBrowserRouter([
  { path: "/edit/test/:type", Component: TestEditor },
  { path: "/edit/minimal/:type", Component: Minimal },
]);

function App() {
  const [selectedTheme] = useState('light');
	return (
		<ChakraProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ChakraProvider>
	)
}

export default App;
