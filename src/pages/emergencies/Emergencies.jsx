import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { useFetchEmergenciesQuery, useDeleteEmergencyMutation } from '_store';
import Loader from '../../_components/Loader';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
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
import { CreateEmergencyForm } from './components/createEmergency';
import './emergencies.scss';
import {  } from "react-router-dom";

const Emergencies = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const { isLoading, isError, data = {}} = useFetchEmergenciesQuery(page);
	const [ deleteEmergency, { isLoading: isEmergencyDeleting, isSuccess: isEmergencyDeleted }] = useDeleteEmergencyMutation();

	const [selectedEmergencies, setSelectedEmergencies] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setSelectedEmergencies([]);
		setOpen(false);
	}

	const handleDelete = () => {
		deleteEmergency(selectedEmergencies[0]);
	}

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedEmergencies);

		if (checked) {
			selected.push(value);
			setSelectedEmergencies(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedEmergencies(dropped);
		}
	}

	useEffect(() => {
		if (isEmergencyDeleted) {
			setSelectedEmergencies([]);
		}
	}, [isEmergencyDeleted]);

	return (
			<div className='insurances-layout'>
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
							Emergencies
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
								setSelectedEmergencies([]);
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
							isDisabled={selectedEmergencies.length !== 1}
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
							isDisabled={selectedEmergencies.length !== 1}
						>
							Delete
						</Button>
					</div>
				</div>
				{
					isLoading || isEmergencyDeleting ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<TableContainer>
									<Table variant='simple'>
											<Thead>
												<Tr>
													<Th></Th>
													<Th>Id</Th>
													<Th>Name</Th>
													<Th>Code</Th>
												</Tr>
											</Thead>
										<Tbody>
										{
											data.map(({id, name, code}) => {

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
														<Td>{name}</Td>
														<Td>{code}</Td>
													</Tr>
												)
											})
										}
										</Tbody>
									</Table>
							</TableContainer>

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
								selectedEmergencies.length === 1 ? 'Edit emergency' : 'New emergency'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateEmergencyForm
									id={selectedEmergencies[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Emergencies };
