import React, { useEffect, useState }from 'react';
import {
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Plus, Clock, List, ChevronLeft, ChevronRight, Settings, Save, Power} from 'react-feather';
import {
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from './ToastContainer';
import { selectWordCount } from '../../reducers/editorReducer';
import { useSelector } from 'react-redux';

const StatusBar = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [lastSavedTime, setLastSavedTime] = useState(null);
	const wordCount = useSelector(selectWordCount);
	const fontSize = 15;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


	const openSettings = () => {};

	const navigate = useNavigate();

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
  			opacity: isHovered ? 1 : 0.3,
  			transition: 'opacity 1s',
			}}
    >
      <HStack alignItems="center" spacing={4}>
        <Text fontSize={fontSize}>Word Count: {wordCount}</Text>
				<HStack>
					<Clock size={fontSize} />
					<LiveClock fontSize={fontSize}/>
				</HStack>
      </HStack>
      <HStack spacing={2}>
				<ToastContainer/>
				{(lastSavedTime && 
					<Text fontSize={fontSize}>
						{getTimeAgoString(lastSavedTime)}
        	</Text>
				)}
        <Save size={fontSize} onClick={() => console.log('Save')}/>
        <Settings size={fontSize} onClick={openSettings}/>
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

const LiveClock = ({fontSize}) => {
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
		<Text fontSize={fontSize}>{currentTime}</Text>
	)
};

export default StatusBar;
