import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
	useTheme,
} from '@chakra-ui/react';

const SceneSection = ({index, scene}) => {
	const [isExpanded, setExpanded] = useState(false);
	return (
		<Box 
			key={index} 
			style={{
				fontSize: '32px',
				textAlign: 'justify',
				border: 'none', 
		}}>
			<Heading 
				size="lg" 
				onClick={() => {setExpanded(!isExpanded)}}
				style={{textAlign: 'left'}}>
				{scene.title}
			</Heading>
			{(isExpanded && <Text style={{whiteSpace: 'pre-wrap'}}>{scene.content}</Text>)}
		</Box>
	)
};

export default SceneSection;
