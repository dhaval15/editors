import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
	useTheme,
} from '@chakra-ui/react';
import {
  Link,
} from "react-router-dom";

const SceneSection = ({index, scene}) => {
	const [isExpanded, setExpanded] = useState(false);
	return (
		<Box 
			key={index} 
			style={{
				fontSize: 24,
				textAlign: 'justify',
				border: 'none', 
		}}>
			<Flex> 
				<Heading 
					size="md" 
					onClick={() => {setExpanded(!isExpanded)}}
					style={{textAlign: 'left'}}>
					⦿ {scene.title}
				</Heading>
				{(isExpanded && <Link to='edit' state={{index: index}}> 
					<Text> edit </Text>
				</Link>)}
			</Flex>
			{(isExpanded && <Text pl={0} style={{whiteSpace: 'pre-wrap'}}>{scene.content}</Text>)}
		</Box>
	)
};

export default SceneSection;
