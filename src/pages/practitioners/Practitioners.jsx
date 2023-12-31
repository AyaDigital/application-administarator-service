import React, { useState, useEffect } from 'react';
import Loader from '_components/Loader';
import { ModalForm } from '_components/controls/modal';
import clone from 'lodash/clone';
import { useNavigate  } from 'react-router-dom';
import Pagination from 'rc-pagination';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Input as TextField,
	CloseButton,
	InputGroup,
	InputRightElement
  } from '@chakra-ui/react'
import {
	useFetchPractitionersQuery,
	useDeletePractitionerMutation,
	useFetchOnePractitionerQuery
} from '_store';
import { Button } from '@chakra-ui/react';
import SuccessIcon from '../../images/Icons/successIcon';
import FailedIcon from '../../images/Icons/failedIcon';
import { Checkbox } from '@chakra-ui/react';
import { EditPractitionerForm } from './components/editPractitioner';
import { CreatePractitionerForm } from './components/createPractitioner';
import { CreateScheduleForm } from './components/createSchedule';

import './practitioners.scss';
import {  } from "react-router-dom";

const Practitioners = () => {
	// useGetPostsQuery();
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [error, setError] = useState('');
	const { isLoading, isError, data = {}} = useFetchPractitionersQuery({ page, search });
	const { content: practitioners = [], totalElements} = data;
	const [
		deletePractitioner,
		{
			isLoading: isDeletionLoading,
			isSuccess: isPractitionerDeleted,
			isError: isDeleteUserError,
			error: deleteError,
			reset: resetDeletionState
		}
	] = useDeletePractitionerMutation();
	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
	const [isScheduleFormOpen, setIsScheduleFormOpen] = useState(false);
	const [selectedPractitioners, setSelectedPractitioners] = useState([]);
	const [scheduleCreationError, setIsScheduleCreationError] = useState('');
	const [skip, setSkip] = useState(true);
	const [id, setId] = useState();

	const { isLoading: isFetchingOnePractitioner, data: practitioner = {}} = useFetchOnePractitionerQuery(id, {
		skip
	});
	const handleClose = () => {
		setOpen(false);
	}
	const handleDeleteModalClose = () => {
		setIsModalOpen(false);
		resetDeletionState();
		setError('');
	}

	const handleCreateFormClose = () => setIsCreateFormOpen(false);

	const handleScheduleFormClose = () => {
		setIsScheduleFormOpen(false);
		setIsScheduleCreationError()
	}
	const handleScheduleFormOpen = () => setIsScheduleFormOpen(true);

	const handlePageSelect = (pageNum) => {
		setPage(pageNum - 1)
	}

	useEffect(() => {
		if (isDeleteUserError) {
			setError(deleteError?.data)
		}
	}, [isDeleteUserError, deleteError])

	useEffect(() => {
		if (isPractitionerDeleted) {
			handleDeleteModalClose();
			setSelectedPractitioners([])
			setId(null);
			setSkip(true);
		}
	}, [isPractitionerDeleted]);

	const handleDelete = () => {
		setIsModalOpen(true)
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

	useEffect(() => {
		if (selectedPractitioners.length === 1) {
			setId(selectedPractitioners[0]);
			setSkip(false)
		}
	}, [selectedPractitioners]);

	return (
			<div className='practitioners-layout'>
				<div className='controls-block'>
					<div>
						<Button
							sx={{
								backgroundColor: 'rgba(44, 121, 206, 0.7)',
								color: 'white'
							}}
							size='lg'
							onClick={() => {navigate('/profile/create')}}
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
							onClick={() => {navigate('/profile/edit/' + selectedPractitioners[0])}}
							isDisabled={selectedPractitioners.length !== 1}
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
							isDisabled={selectedPractitioners.length !== 1}
							onClick={handleScheduleFormOpen}
						>
							Create schedule
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
							isDisabled={selectedPractitioners.length !== 1}
						>
							Delete
						</Button>
					</div>
				</div>

				<div className='search-block'>
					<div>
						<InputGroup size='md'>
							<TextField
								required
								h='50px'
								w='300px'
								placeholder="Search"
								id="outlined-controlled"
								value={search}
								onChange={(event) => {
									setSearch(event.target.value);
								}}
							/>
							{
								search ? (
									<InputRightElement width='4.5rem' height={'100%'}>
										<CloseButton
											color='gray.500'
											size='sm'
											onClick={() => {
												setSearch('');
											}}
										/>
									</InputRightElement>
								) : null
							}
						</InputGroup>

					</div>
				</div>
				{
					isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<div className='practitioners-table'>
								<div className='table-header'>
									<div className='rc-checkbox'></div>
									<div className='id'>First name</div>
									<div className='phone'>Last Name</div>
									<div className='email'>Email</div>
									<div>Email verified</div>
									<div>Is active</div>
								</div>
								{practitioners.map(item => {
										return (
											<div className='table-row' key={item.id}>
												<div className='rc-checkbox'>
													<Checkbox
														value={item.uuid}
														onChange={onChange}
														isChecked={selectedPractitioners.includes(item.uuid)}
														disabled={open}
													/>
												</div>
												<div className='id'>{item.firstName}</div>
												<div className='phone'>{item.lastName}</div>
												<div className='email'>{item.email}</div>
												<div className='email-verified'>
													{
														item.verified ? (
															<SuccessIcon />
														) : (
															<FailedIcon />
														)
													}
												</div>
												<div className='user-active'>
												{
														item.active ? (
															<SuccessIcon />
														) : (
															<FailedIcon />
														)
													}
												</div>
											</div>
										);
								})}
							</div>
						</>
					)
				}
				<div className='pagination'>
					<Pagination onChange={handlePageSelect} current={page + 1} total={totalElements} />
				</div>
				<Modal
					isOpen={open}
					size='2xl'
					onClose={() => handleClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit profile</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<EditPractitionerForm
									onClose={() => handleClose()}
									practitionerId={selectedPractitioners[0]}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
				<Modal
					isOpen={isCreateFormOpen}
					isCentered
					size='2xl'
					onClose={() => handleCreateFormClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>New profile</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreatePractitionerForm
									onClose={() => handleCreateFormClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
				<Modal
					isOpen={isScheduleFormOpen}
					isCentered
					size='xl'
					onClose={() => handleScheduleFormClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>New schedule</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateScheduleForm
									onClose={() => handleScheduleFormClose()}
									practitionerId={selectedPractitioners[0]}
									setError={(msg) => setIsScheduleCreationError(msg)}
								/>
							</div>
						</ModalBody>
						<ModalFooter pt={`${!!scheduleCreationError ? '1' : '0'}`}>
							<div className='error-block'>
								{!!scheduleCreationError ? scheduleCreationError : null}
							</div>
						</ModalFooter>
					</ModalContent>
				</Modal>
				<Modal
					isOpen={isModalOpen}
					isCentered
					size='xl'
					onClose={() => handleDeleteModalClose()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<div className='modal-window-header'>
								{
									isDeleteUserError ? (
										<div className='error-block'>{error}</div>
									) : null
								}
								<div>Delete practitioner</div>
								<div>{`${practitioner?.firstName} ${practitioner?.lastName}`}</div>
							</div>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<ModalForm
									isLoading={isDeletionLoading}
									handleOperation={() => {
										deletePractitioner(selectedPractitioners[0]);
									}}
									onClose={() => handleDeleteModalClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Practitioners };
