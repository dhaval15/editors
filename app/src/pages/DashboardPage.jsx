import React, { useRef, useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  IconButton, // Import IconButton from Chakra UI
} from '@chakra-ui/react';
import { Search, Plus, Settings } from 'react-feather'; // Import icons from the icon library
import DraftApi from '../api/draftApi.ts';
import AddDraftDialog from '../components/AddDraftDialog';

const Dashboard = () => {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
		DraftApi.getAllDrafts().then((res) => {
      setDrafts(res);
      setIsLoading(false);
		});
  });

	const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
	const handleAddDraft = (({title, description}) => {
		DraftApi.createDraft({title, description}).then((res) => {
			console.log(res);
			onClose();
		});
	});

  return (
    <Box minH="100vh" p={4}>
      <Flex justify="space-between" align="center" bg="white" px={2} py={4}>
				<Heading>
					Drafts
				</Heading>
				<Stack align="right" direction="row" spacing={4}>
					<>
						<IconButton
							aria-label="Create New Draft"
							icon={<Plus/>}
							rounded="full"
							onClick={onOpen}
						/>
						<AddDraftDialog onAddDraft={handleAddDraft} isOpen={isOpen} onClose={onClose} />
					</>
					<IconButton
						aria-label="Settings"
						icon={<Settings />}
						rounded="full"
					/>
				</Stack>
			</Flex>
      <Flex justify="space-between" align="center" bg="white" px={2} py={0}>
        <Input type="text" placeholder="Search" bg="gray.200" rounded="full" px={4} py={2} />
        <IconButton
          aria-label="Search"
          icon={<Search />}
          rounded="full"
					marginLeft={2}
        />
      </Flex>

      <VStack spacing={4} align="stretch" mt={4}>
        {isLoading ? (
          <Text color="gray.600">Loading...</Text>
        ) : (
          drafts.map((draft) => (
            <Box
              key={draft.id}
              bg="grey.100"
              rounded="lg"
              p={4}
              position="relative"
            >
              <Heading size="md" fontWeight="semibold">
                {draft.title}
              </Heading>
              <Text mt={2} color="gray.600" fontSize="18">
                {draft.description}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Dashboard;
