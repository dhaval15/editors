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
import AddDraftDialog from '../components/AddDraftDialog';
import DraftTile from '../components/DraftTile';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDraftsAsync,
  createDraftAsync,
  updateDraftAsync,
  deleteDraftAsync,
} from '../reducers/draftsReducer';

const Dashboard = () => {
	const dispatch = useDispatch();
  const drafts = useSelector((state) => state.drafts.data);
  const status = useSelector((state) => state.drafts.status);
  const error = useSelector((state) => state.drafts.error);
	
	useEffect(() => {
    dispatch(fetchDraftsAsync());
  }, [dispatch]);

	const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
	const handleAddDraft = (({title, description}) => {
		dispatch(createDraftAsync({title, description})).then((res) => {
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
        {drafts.map((draft) => (
            <DraftTile key={draft.id} draft={draft}/>
          ))}
      </VStack>
    </Box>
  );
};

export default Dashboard;
