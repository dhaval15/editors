import React, { useEffect, useState }from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { Plus, Clock, List, ChevronLeft, ChevronRight, Settings, Save } from 'react-feather';
import DraftApi from '../api/draftApi.ts';

const StatusBar = ({ draft, index, count, setIndex, setScene}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [lastSavedTime, setLastSavedTime] = useState(null);

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
			setLastSavedTime(new Date());
		});
	};
	const openScenesPopup = () => {};
	const nextScene = () => {
		if (index < draft.scenes.length - 1){
			setScene(null);
			setIndex(index + 1);
		}
	};
	const addScene = () => {
		if (index < draft.scenes.length - 1){
				setScene(null);
				DraftApi.createScene(draft.id, {content: ''}).then((res) => {
					setIndex(draft.scenes.length - 1);
				});
		}
	}
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
			shadow="lg"
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
				{(lastSavedTime && 
					<Text fontSize={12}>
						{getTimeAgoString(lastSavedTime)}
        	</Text>
				)}
        <Save size={12} onClick={save}/>
        <ChevronLeft size={12} onClick={previousScene}/>
        <Plus size={12} onClick={addScene}/>
        <ChevronRight size={12} onClick={nextScene}/>
        <List size={12} onClick={openScenesPopup}/>
        <Settings size={12} onClick={openSettings}/>
      </HStack>
    </Box>
  );
};

function getTimeAgoString(lastSavedTime) {
	if (!lastSavedTime) return 'Not saved yet';

	const currentTime = new Date();
	const diffInSeconds = Math.floor((currentTime - lastSavedTime) / 1000);

	if (diffInSeconds == 0) {
		return `Saved succesfully`;
	} else if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	} else if (diffInSeconds < 3600) {
		const minutesAgo = Math.floor(diffInSeconds / 60);
		return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
	} else if (diffInSeconds < 86400) {
		const hoursAgo = Math.floor(diffInSeconds / 3600);
		return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
	} else {
		const daysAgo = Math.floor(diffInSeconds / 86400);
		return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
	}
}

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
