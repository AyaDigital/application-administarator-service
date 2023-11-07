import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { useFetchMedicalDegreesByPageQuery, useDestroyMedicalDegreeMutation } from '_store';
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
import { CreateDegree } from './components/createDegree';
import './medicalDegrees.scss';
import {  } from "react-router-dom";

const MedicalDegrees = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const { isLoading, isError, data: degrees = []} = useFetchMedicalDegreesByPageQuery(page);
	// const { data = [], totalResults } = degrees;
	const [ deleteItem, { isLoading: isItemDeleting, isSuccess: isItemDeleted }] = useDestroyMedicalDegreeMutation();

	const [selectedDegrees, setSelectedDegrees] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setSelectedDegrees([]);
		setOpen(false);
	}

	const handleDelete = () => {
		deleteItem(selectedDegrees[0]);
	}

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedDegrees);

		if (checked) {
			selected.push(value);
			setSelectedDegrees(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedDegrees(dropped);
		}
	}

	useEffect(() => {
		if (isItemDeleted) {
			setSelectedDegrees([]);
		}
	}, [isItemDeleted]);

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
								setSelectedDegrees([]);
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
							isDisabled={selectedDegrees.length !== 1}
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
							isDisabled={selectedDegrees.length !== 1}
						>
							Delete
						</Button>
					</div>
				</div>
				{
					isLoading || isItemDeleting ? (
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
													<Th>Description</Th>
												</Tr>
											</Thead>
										<Tbody>
										{
											degrees.map(({id, name, code, description}) => {

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
														<Td>{description}</Td>
													</Tr>
												)
											})
										}
										</Tbody>
									</Table>
							</TableContainer>
							<Pagination onChange={handlePageSelect} current={page + 1} total={degrees.count} />
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
								selectedDegrees.length === 1 ? 'Edit medical degree' : 'New medical degree'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateDegree
									id={selectedDegrees[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { MedicalDegrees };
