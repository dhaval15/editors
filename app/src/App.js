import React, { useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import EditScenePage from './pages/EditScenePage';
import DraftPage from './pages/DraftPage';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './store';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  { path: "/", Component: DashboardPage },
  { path: "/draft/:id", Component: DraftPage },
  { path: "/draft/:id/edit", Component: EditScenePage },
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
