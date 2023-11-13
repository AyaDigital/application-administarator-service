import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';

import 'styles/assets/pagination.scss'
import { Button } from '@chakra-ui/react';
import {
	useFetchAppointmentSettingsQuery,
	usePatchAppointmentSettingsMutation
} from '../../_store';
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
	Grid,
	GridItem,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Flex
  } from '@chakra-ui/react';
import {
	Checkbox,
	Input as TextField,
} from '@chakra-ui/react';

import './appointments.scss';
import {  } from "react-router-dom";

const Appointments = () => {
	const navigate = useNavigate();
	const { isLoading, isSuccess, data = {}} = useFetchAppointmentSettingsQuery();
	const [ patchSettings, {isLoading: isPatchLoading, isSuccess: isPatchSuccess}] = usePatchAppointmentSettingsMutation();

	const [open, setOpen] = useState(false);
	const [currentBeforeTimeout, setCurrentBeforeTimeout] = useState(0);
	const [currentAfterTimeout, setCurrentAfterTimeout] = useState(0);
	const [globalTimeoutAppointment, setGlobalTimeoutAppointment] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	}

	useEffect(() => {
		if (isSuccess) {
			setCurrentBeforeTimeout(data.beforeTimeout);
			setCurrentAfterTimeout(data.afterTimeout);
			setGlobalTimeoutAppointment(data.globalAppointmentTimeout || false);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (isPatchSuccess) {
			setOpen(false);
		}
	}, [isPatchSuccess])

	const handleClose = () => setOpen(false);

	const onChange = ({ target: {value, checked} }) => {
		setGlobalTimeoutAppointment(checked);
	}

	return (
			<div className='appointments-layout'>
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
							Appointments Global Settings
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
							onClick={handleOpen}
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
									Before timeout
								</GridItem>
								<GridItem>
									{currentBeforeTimeout}
								</GridItem>
								<GridItem>
									After timeout
								</GridItem>
								<GridItem>
									{currentAfterTimeout}
								</GridItem>
								<GridItem>
									Is Global Settings Active
								</GridItem>
								<GridItem>
									{
										globalTimeoutAppointment ? <SuccessIcon /> : <FailedIcon />
									}
								</GridItem>
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
							<Flex justify="center">Appointment Global Settings</Flex>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div className='edit-form'>
								<Grid
									gridTemplateColumns={'50% 50%'}
									h='auto'
									rowGap='5'
									gap='1'
									alignItems={'flex-start'}
									color='blackAlpha.700'
									fontWeight='bold'
								>
									<GridItem>
										Before timeout
									</GridItem>
									<GridItem>
										<TextField
											value={currentBeforeTimeout}
											onChange={({ target: {value} }) => {
												setCurrentBeforeTimeout(value)
											}}
										/>
									</GridItem>

									<GridItem>
										After timeout
									</GridItem>
									<GridItem>
									<TextField
											value={currentAfterTimeout}
											onChange={({ target: {value} }) => {
												setCurrentAfterTimeout(value)
											}}
										/>
									</GridItem>

									<GridItem>
										Is Global Settings Active
									</GridItem>
									<GridItem>
										<Checkbox
											onChange={onChange}
											isChecked={globalTimeoutAppointment}
										/>
									</GridItem>

									<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									w='180px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={() => {
										setOpen(false)
									}}
								>
									Close
								</Button>
							</GridItem>
							<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									colorScheme='teal'
									variant='outline'
									w='180px'
									h='50px'
									size='xl'
									isLoading={isPatchLoading}
									onClick={() => {
										const patchData = {
											beforeTimeout: currentBeforeTimeout,
											afterTimeout: currentAfterTimeout,
											globalTimeoutAppointment
										};
										patchSettings(patchData);
									}}
								>
									Save
								</Button>
							</GridItem>
								</Grid>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Appointments };
