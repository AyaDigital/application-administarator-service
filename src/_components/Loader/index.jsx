import React from 'react';
import ReactLoading from 'react-loading';
import './loader.scss';

/**type LoaderProps =  {
	height?: string | null,
	width?: string | null
};**/

const Loader = ({ height = '100%', width = '100%' }) => {
	return (
		<ReactLoading
			type={'balls'}
			color={'rgb(44, 121, 206, 0.4)'}
			className='loader-style'
			width={width}
			height={height}
		/>
	);
};

export default Loader;
