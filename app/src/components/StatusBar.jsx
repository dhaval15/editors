import React, { useEffect, useState }from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { Clock, List, ChevronLeft, ChevronRight, Settings, Save } from 'react-feather';
import DraftApi from '../api/draftApi.ts';

const StatusBar = ({ draft, index, count, setIndex, setScene}) => {
	const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

	const save = () => {
		const content = localStorage.getItem('editorContent');
		DraftApi.updateScene(draft.id, draft.scenes[index], content).then((res) => {
			console.log('Saved successfully');
		});
	};
	const openScenesPopup = () => {};
	const nextScene = () => {
		if (index < draft.scenes.length - 1){
			setScene(null);
			setIndex(index + 1);
		}
	};
	const previousScene = () => {
		if (index != 0){
			setScene(null);
			setIndex(index - 1);
		}
	};
	const openSettings = () => {};
	const newScene = () => {};

  return (
    <Box
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
      color="gray.800"
      bg="#FFEEDD"
      p={2}
      height="1.5rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
			style={{
  			opacity: isHovered ? 1 : 0.25,
  			transition: 'opacity 1s',
			}}
    >
      <HStack alignItems="center" spacing={4}>
        <Text fontSize={12}>{draft.title} >> Scene {index + 1}</Text>
        <Text fontSize={12}>Word Count: {count}</Text>
				<HStack>
					<Clock size={12} />
					<LiveClock/>
				</HStack>
      </HStack>
      <HStack spacing={2}>
        <Save size={12} onClick={save}/>
        <ChevronLeft size={12} onClick={previousScene}/>
        <ChevronRight size={12} onClick={nextScene}/>
        <List size={12} onClick={openScenesPopup}/>
        <Settings size={12} onClick={openSettings}/>
      </HStack>
    </Box>
  );
};

const LiveClock = () => {
	const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000); // Update the time every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

	function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

	return (
		<Text fontSize={12}>{currentTime}</Text>
	)
};

export default StatusBar;
