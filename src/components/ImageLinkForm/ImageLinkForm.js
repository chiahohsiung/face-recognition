import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3'> This Lemon will detect faces in your pictures</p>
			<div className='center'>
				<div className='br2 pa3 shadow-3 center'>
					<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
					<button 
						className='w-30 pointer grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;