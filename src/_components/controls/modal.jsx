import React from 'react';

import {
	Button,
	Grid,
	GridItem,
	Spinner
} from '@chakra-ui/react';

const ModalForm = ({
    handleOperation,
    isLoading,
	onClose
}) => {
	return (
		<div className='clinics-form-layout'>
			<>
			{
				isLoading ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
						<Grid
							//gridTemplateRows={'100px'}
							gridTemplateColumns={'50% 50%'}
							//w='450px'
							h='auto'
							rowGap='5'
							gap='1'
							alignItems={'center'}
							color='blackAlpha.700'
							fontWeight='bold'
						>

							<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									w='180px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={onClose}
								>
									No
								</Button>
							</GridItem>
							<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									colorScheme='teal'
									variant='outline'
									w='180px'
									h='50px'
									size='xl'
									onClick={handleOperation}
								>
									Yes
								</Button>
							</GridItem>
						</Grid>
				)
			}
			</>
		</div>
	)
};

export { ModalForm };
