import React, { useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import EditScenePage from './pages/EditScenePage';
import DraftPage from './pages/DraftPage';
import { ChakraProvider } from '@chakra-ui/react'

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
			<RouterProvider router={router} />
		</ChakraProvider>
	)
}

export default App;
