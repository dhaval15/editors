import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

const DraftTile = ({ draft }) => {
	const to = `edit/${draft.id}/${draft.scenes[0]}`;
	return (
		<Link to={to}>
			<Box
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
		</Link>
	)
};

export default DraftTile;
