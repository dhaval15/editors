import React, { useState } from 'react';
import './App.css';
// import Editor from './components/Editor';
// import SettingsDialog from './components/SettingsDialog';
import DashboardPage from './pages/DashboardPage';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [selectedTheme] = useState('light');
	return (
		<ChakraProvider>
			<div className={`app ${selectedTheme}-theme`}>
				<DashboardPage/>
			</div>
		</ChakraProvider>
	)
}

// function App() {
//   const [showDialog, setShowDialog] = useState(false);
//   const [selectedTheme, setSelectedTheme] = useState('light');
// 	const [settings, setSettings] = useState({
// 		fontSize: 24,
// 		lineHeight: 1.15,
// 	});
//
//   const openDialog = () => {
//     setShowDialog(true);
//   };
//
//   const closeDialog = () => {
//     setShowDialog(false);
//   };
//
//   const handleThemeChange = (theme) => {
//     setSelectedTheme(theme);
//   };
//
//   return (
//     <div className={`app ${selectedTheme}-theme`}>
//       <Editor settings={settings}/>
//       <button className="open-dialog-button" onClick={openDialog}>
//         Select Settings
//       </button>
//       <SettingsDialog
//         isOpen={showDialog}
//         onClose={closeDialog}
// 				settings={settings}
// 				onChangeSettings={setSettings}
//         onSelectTheme={handleThemeChange}
//       />
//     </div>
//   );
// }

export default App;
