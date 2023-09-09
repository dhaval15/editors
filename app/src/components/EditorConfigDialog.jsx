import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Input,
	Textarea,
  VStack,
  Button,
  IconButton,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Wind } from 'react-feather'; 
import FadedButton from '../components/FadedButton';

const EditorConfigDialog = ({ initialConfig, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [config, setConfig] = useState(initialConfig);

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
			<FadedButton
				label="Create New Draft"
				icon={<Wind/>}
				onClick={onOpen}
			/>
      <AlertDialog isOpen={isOpen} onClose={onClose} centered>
        <AlertDialogOverlay>
					<AlertDialogContent p={4}>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Editor Configuration
						</AlertDialogHeader>
						<Input
							placeholder="Font Size"
							mb={4}
							value={config.fontSize}
							onChange={(e) => setConfig({ ...config, fontSize: e.target.value })}
						/>
						<Input
							placeholder="Font Face"
							mb={4}
							value={config.fontFace}
							onChange={(e) => setConfig({ ...config, fontFace: e.target.value })}
						/>
						<Select
							placeholder="Text Alignment"
							mb={4}
							value={config.textAlign}
							onChange={(e) => setConfig({ ...config, textAlign: e.target.value })}
						>
							<option value="left">Left</option>
							<option value="center">Center</option>
							<option value="right">Right</option>
							<option value="justify">Justify</option>
						</Select>
						<Input
							placeholder="Line Height"
							mb={4}
							value={config.lineHeight}
							onChange={(e) => setConfig({ ...config, lineHeight: e.target.value })}
						/>
						<Input
							placeholder="Vertical Padding"
							mb={4}
							value={config.verticalPadding}
							onChange={(e) => setConfig({ ...config, verticalPadding: e.target.value })}
						/>
						<Input
							placeholder="Horizontal Padding"
							mb={4}
							value={config.horizontalPadding}
							onChange={(e) => setConfig({ ...config, horizontalPadding: e.target.value })}
						/>
						<AlertDialogFooter>
							<Button colorScheme="blue" onClick={handleSave}>
								Save
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EditorConfigDialog;
