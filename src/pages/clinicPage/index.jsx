import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import {
	useFetchPractitionersQuery,
	useFetchClinicsPractitionersQuery,
	useAddPractitionersToClinicMutation,
	useDeletePractitionersFromClinicMutation,
	useFetchOneClinicQuery
} from '../../_store';
import Loader from '../../_components/Loader';
import {
	Grid,
	GridItem,
	Spinner,
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
	TableCaption,
	TableContainer,
  } from '@chakra-ui/react';

import './clinicPage.scss';

const ClinicPage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const clinicId = pathname.split('/').pop();
	const {isLoading: isOneClinicLoading, data: oneClinic = {}} = useFetchOneClinicQuery(clinicId);
	const { isLoading, data = {}} = useFetchPractitionersQuery();
	const { data: practitioners = [] } = data;
	const [ addPractitioners, {isLoading: IsAddLoading, isSuccess: isPractitionersAdded}] = useAddPractitionersToClinicMutation();
	const [
		removePractitioners,
		{
			isLoading: IsRemoveLoading,
			isSuccess: isPractitionersRemoved
		}
	] = useDeletePractitionersFromClinicMutation();
	const {
		isLoading: isCurrentdataLoading,
		data: currentClinicPractitioners = []
	} = useFetchClinicsPractitionersQuery(clinicId);
	const [selectedPractitioners, setSelectedPractitioners] = useState([]);
	const [clinicsPractitionersSelected, setClinicsPractitionerSelected] = useState([]);

	const handleAddPractitioners = () => {
		addPractitioners({
			id: clinicId,
			employeeIds: selectedPractitioners
		})
	}

	const handleRemovePractitioners = () => {
		removePractitioners({
			id: clinicId,
			employeeIds: clinicsPractitionersSelected
		})
	}

	const handleSelectCurrentPractitioners = ({ target: {value, checked} }) => {
		const selected = clone(clinicsPractitionersSelected);

		if (checked) {
			selected.push(value);
			setClinicsPractitionerSelected(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setClinicsPractitionerSelected(dropped);
		}
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedPractitioners);

		if (checked) {
			selected.push(value);
			setSelectedPractitioners(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedPractitioners(dropped);
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
							onClick={() => {navigate('/')}}
							color='gray.500'
						>
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							href='#'
							onClick={() => {navigate('/clinics')}}
							color='gray.500'
						>
							Clinics
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem
					    isCurrentPage
					>
						<BreadcrumbLink
							href='#'
							color='gray.500'
						>
							{oneClinic.nameOrg}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<div className='clinics-base-block'>
					{
					isCurrentdataLoading || isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
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
							<GridItem>
								<div className='controls-block'>
									<div>Clinic`s Practitioners</div>
									<div>
										<Button
											onClick={handleRemovePractitioners}
											isDisabled={!clinicsPractitionersSelected.length}
										>
											Remove selected
										</Button>
									</div>
								</div>
								<TableContainer>
									<Table variant='simple'>
											<Thead>
												<Tr>
													<Th></Th>
													<Th>First Name</Th>
													<Th>Last Name</Th>
													<Th>Email</Th>
												</Tr>
											</Thead>
										<Tbody>
											{
												currentClinicPractitioners.map(({id, firstName, lastName, email}) => {
													return (
														<Tr>
															<Td>
																<Checkbox
																	value={id}
																	onChange={handleSelectCurrentPractitioners}
																	//disabled={open}
																/>
															</Td>
															<Td>{id}</Td>
															<Td>{firstName}</Td>
															<Td>{lastName}</Td>
															<Td>{email}</Td>
														</Tr>
													)
												})
											}
										</Tbody>
									</Table>
								</TableContainer>
							</GridItem>
							<GridItem>
								<div className='controls-block'>
									<div>All practitioners</div>
									<div>
										<Button
											onClick={handleAddPractitioners}
											isDisabled={!selectedPractitioners.length}
										>
											Add selected
										</Button>
									</div>
								</div>
								<TableContainer>
										<Table variant='simple'>
												<Thead>
													<Tr>
														<Th></Th>
														<Th>Id</Th>
														<Th>First Name</Th>
														<Th>Last Name</Th>
														<Th>Email</Th>
													</Tr>
												</Thead>
											<Tbody>
											{
												practitioners.map(({id, firstName, lastName, email}) => {
													return (
														<Tr>
															<Td>
																<Checkbox
																	value={id}
																	onChange={onChange}
																	//disabled={open}
																/>
															</Td>
															<Td>{id}</Td>
															<Td>{firstName}</Td>
															<Td>{lastName}</Td>
															<Td>{email}</Td>
														</Tr>
													)
												})
											}
											</Tbody>
										</Table>
									</TableContainer>
							</GridItem>
						</Grid>
						)
					}
				</div>
			</div>
	)
};

export { ClinicPage };
