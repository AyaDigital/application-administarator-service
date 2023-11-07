import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import { clone } from 'lodash';
import 'styles/assets/pagination.scss'
import { Button } from '@chakra-ui/react';
import {
	useFetchSpecialitiesByPageQuery,
	useDeleteSpecialityMutation
} from '../../_store';
import Loader from '_components/Loader';
import { ModalForm } from '_components/controls/modal';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Grid,
	GridItem,
	Spinner,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
  } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { CreateSpecialityForm } from './components/createSpeciality';
import './specialities.scss';
import {  } from "react-router-dom";

const Specialities = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const { isLoading, data = []} = useFetchSpecialitiesByPageQuery(page);
	const [ deleteSpeciality, { isLoading: isDeletionLoading, isSuccess: isSpecialityDeleted } ] = useDeleteSpecialityMutation();
	const { content: specialities = [], totalElements } = data;
	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedSpecialities, setSelectedSpecialities] = useState([]);
	const [selectedSpeciality, setSelectedSpeciality] = useState({});

	const handleOpen = () => {
		setOpen(true);
	}

	useEffect(() => {
		if (isSpecialityDeleted) {
			setSelectedSpecialities([])
		}
	}, [isSpecialityDeleted])

	useEffect(() => {
		if(specialities.length && selectedSpecialities.length === 1) {
			setSelectedSpeciality(specialities.find(item => item.id === Number(selectedSpecialities[0])))
		}
	}, [specialities, selectedSpecialities]);

	const handleClose = () => setOpen(false);
	const handleModalClose = () => setIsModalOpen(false);

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedSpecialities);

		if (checked) {
			selected.push(value);
			setSelectedSpecialities(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedSpecialities(dropped);
		}
	}

	const handleDelete = () => {
		setIsModalOpen(true)
	}

	return (
			<div className='clinics-layout'>
				<Breadcrumb
					fontWeight='medium'
					fontSize='sm'
				>
					<BreadcrumbItem>
						<BreadcrumbLink
							onClick={() => {navigate('/')}}
							color='gray.500'
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
							Speciality
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
								setSelectedSpecialities([]);
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
							isDisabled={selectedSpecialities.length !== 1}
						>
							Edit
						</Button>
					</div>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={handleDelete}
							isDisabled={selectedSpecialities.length !== 1}
						>
							Delete
						</Button>
					</div>
				</div>
				{
					isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<Grid
								gridTemplateColumns={'50% 50%'}
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
															<Th>Description</Th>
														</Tr>
													</Thead>
												<Tbody>
												{
													specialities.map(({id, code, name, description}) => {
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
																<Td>{description}</Td>
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
								selectedSpecialities.length === 1 ? 'Edit speciality' : 'New speciality'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateSpecialityForm
									specialityId={selectedSpecialities[0]}
									data={selectedSpeciality}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
				<Modal
					isOpen={isModalOpen}
					isCentered
					size='xl'
					onClose={() => handleModalClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<div className='modal-window-header'>
								<div>Delete speciality</div>
								<div>{selectedSpeciality?.name}</div>
							</div>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<ModalForm
									specialityId={selectedSpecialities[0]}
									isLoading={isDeletionLoading}
									handleOperation={() => {
										deleteSpeciality(selectedSpecialities[0]);
										handleModalClose();
									}}
									onClose={() => handleModalClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Specialities };
