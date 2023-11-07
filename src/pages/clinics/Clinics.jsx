import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import upperfirst from 'lodash.upperfirst';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { useFetchClinicsQuery } from '../../_store';
import Loader from '../../_components/Loader';
import SuccessIcon from '../../images/Icons/successIcon';
import FailedIcon from '../../images/Icons/failedIcon';
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
	Tfoot,
	Tr,
	Th,
	Td,
	TableContainer,
  } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { CreateClinicForm } from './components/createClinic';
import './clinics.scss';
import {  } from "react-router-dom";

const Clinics = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const { isLoading, isError, data = {}} = useFetchClinicsQuery(page);
	const { content: clinics = [], totalElements} = data;
	const [open, setOpen] = useState(false);

	const [selectedClinics, setSelectedClinics] = useState([]);

	const handleOpen = () => {
		setOpen(true);

	}
	const handleClose = () => setOpen(false);

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedClinics);

		if (checked) {
			selected.push(value);
			setSelectedClinics(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedClinics(dropped);
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
							Clinics
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
								setSelectedClinics([]);
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
							isDisabled={selectedClinics.length !== 1}
						>
							Edit
						</Button>
					</div>
					<div>
						<Button
							size='lg'
							onClick={() => {navigate('/clinics/' + selectedClinics[0])}}
							isDisabled={selectedClinics.length !== 1}
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
						>
							Open
						</Button>
					</div>
				</div>
				{
					isLoading ? (
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
													<Th>Description</Th>
													<Th>Is active</Th>
												</Tr>
											</Thead>
										<Tbody>
										{
											clinics.map(({id, nameOrg, description, active}) => {

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
														<Td>{nameOrg}</Td>
														<Td>{description}</Td>
														<Td>
															{
																	active ? (
																		<SuccessIcon />
																	) : (
																		<FailedIcon />
																	)
															}
														</Td>
													</Tr>
												)
											})
										}
										</Tbody>
									</Table>
							</TableContainer>
							<Pagination onChange={handlePageSelect} current={page + 1} total={totalElements} />
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
								selectedClinics.length === 1 ? 'Edit clinic' : 'New clinic'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateClinicForm
									clinicId={selectedClinics[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Clinics };
