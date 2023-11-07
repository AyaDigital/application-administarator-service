import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';

import 'styles/assets/pagination.scss'
import { Button } from '@chakra-ui/react';
import {
	useFetchCitiesByPageQuery,
	useFetchStatesQuery
} from '../../_store';
import Loader from '../../_components/Loader';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Grid,
	GridItem,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableContainer,
  } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { CreateCityForm } from './components/createCity';
import './cities.scss';
import {  } from "react-router-dom";

const Cities = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const { isLoading, data = []} = useFetchCitiesByPageQuery(page);
	const { isLoading: isStatesLoading, data: states = []} = useFetchStatesQuery();
	const { content: cities = [{}], totalElements } = data;
	const [open, setOpen] = useState(false);
	const [selectedCities, setSelectedCities] = useState([]);
	const [selectedSpeciality, setSelectedSpeciality] = useState({});

	const handleOpen = () => {
		setOpen(true);
	}

	useEffect(() => {
		if(cities.length && selectedCities.length === 1) {
			setSelectedSpeciality(cities.find(item => item.id === Number(selectedCities[0])))
		}
	}, [cities, selectedCities]);

	const handleClose = () => setOpen(false);

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedCities);

		if (checked) {
			selected.push(value);
			setSelectedCities(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedCities(dropped);
		}
	}

	return (
			<div className='clinics-layout'>
				<Breadcrumb
					fontWeight='medium'
					fontSize='sm'
				>
					<BreadcrumbItem>
						<BreadcrumbLink
							color='gray.500'
							onClick={() => {navigate('/')}}
						>
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							href='#'
							isCurrentPage
							color='gray.500'
						>
							Cities
						</BreadcrumbLink>
					</BreadcrumbItem>

				</Breadcrumb>
				<div className='controls-block'>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={() => {
								setSelectedCities([]);
								setSelectedSpeciality({});
								handleOpen();
							}}
						>
							Create
						</Button>
					</div>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={handleOpen}
							isDisabled={selectedCities.length !== 1}
						>
							Edit
						</Button>
					</div>
				</div>
				{
					isStatesLoading || isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<Grid
								//gridTemplateRows={'100px'}
								gridTemplateColumns={'50% 50%'}
								//w='750px'
								h='auto'
								rowGap='5'
								gap='1'
								alignItems={'flex-start'}
								color='blackAlpha.700'
								fontWeight='bold'
							>
								<GridItem colSpan={2}>
									<TableContainer>
											<Table variant='simple'>
													<Thead>
														<Tr>
															<Th></Th>
															<Th>Id</Th>
															<Th>Code</Th>
															<Th>Name</Th>
															<Th>State</Th>
														</Tr>
													</Thead>
												<Tbody>
												{
													cities.map(({id, code, name, state}) => {
														const currentState  = states?.find(item => item.id === state.id);
														return (
															<Tr key={id}>
																<Td>
																	<Checkbox
																		value={id}
																		onChange={onChange}
																		//disabled={open}
																	/>
																</Td>
																<Td>{id}</Td>
																<Td>{code}</Td>
																<Td>{name}</Td>
																<Td>
																	{currentState?.name}
																</Td>
															</Tr>
														)
													})
												}
												</Tbody>
											</Table>
										</TableContainer>
								</GridItem>
								<Pagination onChange={handlePageSelect} current={page + 1} total={totalElements} />
							</Grid>
						</>
					)
				}
				<Modal
					isOpen={open}
					//isCentered
					size='xl'
					onClose={() => handleClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							{
								selectedCities.length === 1 ? 'Edit city' : 'New city'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateCityForm
									cityId={selectedCities[0]}
									data={selectedSpeciality}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Cities };
