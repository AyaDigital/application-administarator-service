import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import upperfirst from 'lodash.upperfirst';
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { useFetchInsurancesListQuery } from '../../_store';
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
import { CreateInsuranceForm } from './components/createInsurance';
import './insurance.scss';
import {  } from "react-router-dom";

const Insurances = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const { isLoading, isError, data = {}} = useFetchInsurancesListQuery(page);
	const { content: insurances = [], totalElements} = data;
	const [selectedInsurances, setSelectedInsurances] = useState([]);

	const handleOpen = () => {
		setOpen(true);

	}
	const handleClose = () => {
		setSelectedInsurances([]);
		setOpen(false);
	}
	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}
	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedInsurances);

		if (checked) {
			selected.push(value);
			setSelectedInsurances(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedInsurances(dropped);
		}
	}
	console.log('selectedInsurances', selectedInsurances);
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
							Insurances
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
								setSelectedInsurances([]);
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
							isDisabled={selectedInsurances.length !== 1}
						>
							Edit
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
											insurances.map(({id, nameOrg, description, active}) => {

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
								selectedInsurances.length === 1 ? 'Edit insurance company' : 'New insurance company'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateInsuranceForm
									companyId={selectedInsurances[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Insurances };
