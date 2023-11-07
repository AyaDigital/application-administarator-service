import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from 'rc-pagination';
import 'styles/assets/pagination.scss'
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import {
	useFetchOnePractitionerQuery,
	useAddPractitionerSpecialitiesMutation,
	useRemovePractitionerSpecialitiesMutation,
	useFetchPractitionerSpecialitiesQuery,
	useFetchSpecialitiesByPageQuery
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

import './practitionerPage.scss';

const PractitionerPage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const practitionerId = pathname.split('/').pop();
	const [page, setPage] = useState(0);
	const { isLoading: isPractitionerLoading, data: practitioner = {}} = useFetchOnePractitionerQuery(practitionerId);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [id, setId] = useState(practitioner.id);
	const [skip, setSkip] = useState(true);

	const { isLoading, data = []} = useFetchSpecialitiesByPageQuery(page);
	const { content: specialities = [], totalElements } = data;

	const [ addPractitioners, {isLoading: IsAddLoading, isSuccess: isSpecialitiesAdded}] = useAddPractitionerSpecialitiesMutation();
	const [
		removeSpecialities,
		{
			isLoading: IsRemoveLoading,
			isSuccess: isSpecialitiesRemoved
		}
	] = useRemovePractitionerSpecialitiesMutation();

	const {
		isLoading: isCurrentdataLoading,
		data: practitionerSpecialities = []
	} = useFetchPractitionerSpecialitiesQuery(id, {
		skip
	});

	useEffect(() => {
		if (!isPractitionerLoading && practitioner.id) {
			setId(practitioner.id);
			setFirstName(practitioner.firstName);
			setLastName(practitioner.lastName);
			setSkip(false)
		}
	}, [isPractitionerLoading, practitioner]);

	const [selectedPractitionerSpecialities, setSelectedPractitionerSpecialities] = useState([]);
	const [specialitiesSelected, setSpecialitiesSelected] = useState([]);

	const handleAddSpecialities = () => {
		addPractitioners({id, data: specialitiesSelected})
	}

	const handleRemoveSpecialities = () => {
		removeSpecialities({id, data: selectedPractitionerSpecialities})
	}

	useEffect(() => {
		if (isSpecialitiesRemoved) {
			setSelectedPractitionerSpecialities([])
		}
		if (isSpecialitiesAdded) {
			setSpecialitiesSelected([])
		}
	}, [isSpecialitiesRemoved, isSpecialitiesAdded]);

	const handleSelectCurrentSpecialities = ({ target: {value, checked} }) => {
		const selected = clone(selectedPractitionerSpecialities);

		if (checked) {
			selected.push(value);
			setSelectedPractitionerSpecialities(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedPractitionerSpecialities(dropped);
		}
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(specialitiesSelected);

		if (checked) {
			selected.push(value);
			setSpecialitiesSelected(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSpecialitiesSelected(dropped);
		}
	}

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
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
							onClick={() => {navigate('/practitioners')}}
							color='gray.500'
						>
							Practitioners
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem
						isLoading={isPractitionerLoading}
					    isCurrentPage
					>
						<BreadcrumbLink
							href='#'
							color='gray.500'
						>
							{`${firstName} ${lastName}`}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<div className='clinics-base-block'>
					{
					isPractitionerLoading || isCurrentdataLoading || isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<Grid
							gridTemplateRows={'100px'}
							gridTemplateColumns={'50% 50%'}
							w='100%'
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
											onClick={handleRemoveSpecialities}
											isDisabled={!selectedPractitionerSpecialities.length}
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
													<Th>Id</Th>
													<Th>Name</Th>
													<Th>Description</Th>
												</Tr>
											</Thead>
										<Tbody>
											{
												practitionerSpecialities.map(({id, name, description}) => {
													return (
														<Tr>
															<Td>
																<Checkbox
																	value={id}
																	onChange={handleSelectCurrentSpecialities}
																	//disabled={open}
																/>
															</Td>
															<Td>{id}</Td>
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
							<GridItem>
								<div className='controls-block'>
									<div>All practitioners</div>
									<div>
										<Button
											onClick={handleAddSpecialities}
											isDisabled={!specialitiesSelected.length}
										>
											Add selected
										</Button>
									</div>
								</div>
								<TableContainer>
										<Table variant='simple' size='sm'>
											<TableCaption>Imperial to metric conversion factors</TableCaption>
												<Thead>
													<Tr>
														<Th></Th>
														<Th>Id</Th>
														<Th>Name</Th>
														<Th>Description</Th>
													</Tr>
												</Thead>
											<Tbody>
											{
												specialities.map(({id, name, description}) => {
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
															<Td>{name}</Td>
															<Td>{description}</Td>
														</Tr>
													)
												})
											}
											</Tbody>
										</Table>
									</TableContainer>
									<Pagination onChange={handlePageSelect} current={page + 1} total={totalElements} />
							</GridItem>
						</Grid>
						)
					}
				</div>
			</div>
	)
};

export { PractitionerPage };
