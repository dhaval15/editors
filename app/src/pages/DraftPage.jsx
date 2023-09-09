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
import DraftApi from '../api/draftApi.ts';

const DraftPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    DraftApi.getDraft(id, true)
      .then((res) => {
        setDraft(res);
      })
      .catch((error) => console.error(error));
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
              <Box 
								key={index} 
								style={{
									fontSize: '32px',
									textAlign: 'justify',
									border: 'none', 
							}}>
                <Heading size="lg" style={{textAlign: 'left'}}>Scene {index + 1}</Heading>
                <Text>{scene.content}</Text>
              </Box>
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
