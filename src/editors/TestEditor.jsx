import React, { useEffect } from 'react';
import backends from '../backends/all.ts';
import { useLocation, useParams } from 'react-router-dom';


export default function TestEditor() {
	const { type } = useParams();
	const { location } = useLocation();
	const params = new URLSearchParams(window.location.search);

	useEffect(() => {
		const backend = backends.get(type);
		backend.getContent(params).then((res) => {
			console.log(res);
		});
	}, [type]);

	return (
		<textarea>
		</textarea>
	)
}
