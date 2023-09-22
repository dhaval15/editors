import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
	useTheme,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { Edit2 } from 'react-feather';
import SceneSection from '../components/SceneSection'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDraftAsync,
} from '../reducers/draftReducer';

const DraftPage = () => {
	const dispatch = useDispatch();
  const draft = useSelector((state) => state.draft.data);
  const status = useSelector((state) => state.draft.status);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
		dispatch(fetchDraftAsync(id));
  }, [id]);

	return (
    <Box px={32} py={16}>
      {draft ? (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <div>
              <Heading size="xl">{draft.title}</Heading>
              <Text fontSize="lg" color="gray.600">
                {draft.description}
              </Text>
            </div>
            <Link
							to='edit'
						>
							<Edit2/>
						</Link>
          </Flex>

          <VStack spacing={12} mt={4} align='stretch'>
            {draft.scenes.map((scene, index) => (
              <SceneSection 
								index={index} 
								scene={scene}/>
            ))}
          </VStack>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default DraftPage;
