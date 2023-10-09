import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';


const LookupDialog = ({ isOpen, onClose, onSearch }) => {
	const searchTerm = '';
	const results = [];
	const initialRef = React.useRef(null);
	const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
		if (!isOpen) {
			//dispatch(clearResults());
			setExpandedIndex(null);
		}
  }, [isOpen]);

	const handleItemClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      //dispatch(reverseLookup());
    }
  };

  return (
    <Modal 
			initialFocusRef={initialRef}
			isOpen={isOpen} 
			onClose={onClose} 
			isCentered
			scrollBehavior="inside"
			size="xl">
			<ModalOverlay/>
      <ModalContent>
				<ModalHeader>
					<Input
						autoFocus
						placeholder="Reverse lookup"
						value={searchTerm}
						//onChange={(e) => dispatch(setSearchTerm({query: e.target.value}))}
						onKeyDown={handleKeyDown}
						variant="unstyled" 
						pr="2.5rem" 
						size="md"
						style = {{
							fontSize: 24
						}}
						ref={initialRef}
					/>
				</ModalHeader>
				<ModalBody>
					<List mt={4}>
						{results.map((result, index) => (
							<ListItem
								key={result.word}
								p={2}
								mb={2}
								display="flex"
								justifyContent="flex-start"
								alignItems="flex-start"
								bg="rgba(0, 0, 0, 0.02)" 
								borderRadius="md"
								flexDirection="column"
								onClick={() => handleItemClick(index)}
							>
								<Text fontWeight="bold">{result.word}</Text>
								<Text 
									noOfLines={expandedIndex === index ? undefined : 3}
									textAlign="left" >
									{result.defs && result.defs.join(', ')}
								</Text>
							</ListItem>
						))}
					</List>
				</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LookupDialog;
