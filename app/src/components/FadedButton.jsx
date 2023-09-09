import React, { useState } from 'react';
import {
	IconButton,
} from '@chakra-ui/react';

const FadedButton = ({icon, onClick, label}) => {
	const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
	return(
		<IconButton
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			aria-label={label}
			icon={icon}
			rounded="full"
			style={{
				color: 'grey',
  			opacity: isHovered ? 1 : 0.2,
  			transition: 'opacity 1s',
			}}
			onClick={onClick}
		/>
	)
}

export default FadedButton;
