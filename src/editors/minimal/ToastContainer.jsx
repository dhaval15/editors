import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../reducers/editorReducer';

export function ToastContainer() {
	const dispatch = useDispatch();
	const toast = useToast();
	const message = useSelector((state) => state.editor.message);
	const id = 'message-id';
	useEffect(() => {
		if (message != null && !toast.isActive(id))
			toast({
				id,
				title: message,
				position: 'top-right',
				status: 'warning',
				variant: 'subtle',
				duration: 3000,
				isClosable: true,
				onCloseComplete: () => dispatch(clearMessage()),
			});
	}, [toast, message]);

	return (
		<>
		</>
	);
}

