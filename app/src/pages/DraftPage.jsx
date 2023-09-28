import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  IconButton,
	useTheme,
} from '@chakra-ui/react';
import {
  useNavigate,
} from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'react-feather';
import SceneSection from '../components/SceneSection'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDraftAsync,
} from '../reducers/draftReducer';

const DraftPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const draft = useSelector((state) => state.draft.data);
  const status = useSelector((state) => state.draft.status);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
		dispatch(fetchDraftAsync(id));
  }, [id]);

	return (
    <Flex style = {{ 
			width: "100%",
			justifyContent: "center",
		}} width="100%" justifyContent="center">
			<Box maxWidth="40em" px="1em" py="2em">
				{draft ? (
					<>
						<Flex alignItems="center" justifyContent="space-between">
							<Flex alignItems="center">
								<IconButton 
									onClick={() => {
										navigate(-1);
									}}>
									<ArrowLeft/>
								</IconButton>
								<Box pl={8}>
									<Heading size="lg">
										{draft.title}
									</Heading>
									<Text fontSize="md" color="gray.600">
										{draft.description}
									</Text>
								</Box>
							</Flex>
							<IconButton
								onClick={() => {
									navigate('edit');
								}}>
								<Edit2/>
							</IconButton>
						</Flex>

						<VStack spacing={4} mt={4} align='stretch'>
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
		</Flex>
  );
};

export default DraftPage;
