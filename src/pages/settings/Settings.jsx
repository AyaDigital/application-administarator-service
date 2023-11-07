import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Checkbox } from '@chakra-ui/react';

import 'styles/assets/pagination.scss';
import { Divider } from '@chakra-ui/react'
import Loader from '../../_components/Loader';
import {
	Button,
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Grid,
	GridItem,
	Input as TextField
  } from '@chakra-ui/react';
import { SettingsModalForm } from './components/settingsModal';
import './settings.scss';
import {  } from "react-router-dom";

const Settings = () => {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState();
	const [filtersHidden, setFiltersHidden] = useState();
	const [open, setOpen] = useState();
	const isLoading = false;

	const onChange = ({ target: {value, checked} }) => {

	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
			<div className='settings-layout'>
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
							Settings
						</BreadcrumbLink>
					</BreadcrumbItem>

				</Breadcrumb>
				<div className='settings-block'>
					<Divider />
				{
					isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							<div className='search-block'>
								<div>
									<div>Search Full Name</div>
									<div>
										<TextField
											required
											h='50px'
											placeholder=" "
											id="outlined-controlled"
											//value={name}
											onChange={(event) => {
												setFullName(event.target.value);
											}}
										/>
									</div>
									<div>
										<Button
											w='180px'
											h='50px'
											variant='outline'
											colorScheme='teal'
											size='xl'
											// onClick={onClose}
										>
											Search
										</Button>
									</div>
								</div>
								<div>
									<div>
										<Button
											w='180px'
											h='50px'
											variant='outline'
											colorScheme='teal'
											size='xl'
											onClick={() => {
												setFiltersHidden(!filtersHidden)
											}}
										>
											Open advanced filter
										</Button>
									</div>
								</div>
							</div>
							<Divider />
							<div className={`advanced-block ${filtersHidden ? 'hidden-state' : ''}`} >
								<div className='title'>Advanced filters</div>
								<Grid
									gridTemplateRows={'repeat(1, ifr)'}
									gridTemplateColumns={'250px 250px 250px'}
									w='300px'
									h='550px'
									rowGap='1'
									gap='2'
									color='blackAlpha.700'
									fontWeight='bold'
								>
									<GridItem h='50px' colSpan={1} className='label'>
										Filter By Insurance
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											//value={dayStart}
											onChange={(event) => {
												//setDayStart(event.target.value);
											}}
										>
											{
												[1,2].map((item) => (
													<option value={item}>{item}</option>
												))
											}
										</Select>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Filter By Clinics
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											//value={dayStart}
											onChange={(event) => {
												//setDayStart(event.target.value);
											}}
										>
											{
												[1,2].map((item) => (
													<option value={item}>{item}</option>
												))
											}
										</Select>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Filter By Emails
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											//value={dayStart}
											onChange={(event) => {
												//setDayStart(event.target.value);
											}}
										>
											{
												[1,2].map((item) => (
													<option value={item}>{item}</option>
												))
											}
										</Select>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Filter By Roles
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											//value={dayStart}
											onChange={(event) => {
												//setDayStart(event.target.value);
											}}
										>
											{
												[1,2].map((item) => (
													<option value={item}>{item}</option>
												))
											}
										</Select>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Filter By ID`s
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											//value={dayStart}
											onChange={(event) => {
												//setDayStart(event.target.value);
											}}
										>
											{
												[1,2].map((item) => (
													<option value={item}>{item}</option>
												))
											}
										</Select>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Verified filters
									</GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='checkbox'>
											<div>Not active</div>
											<Checkbox
												//value={item.id}
												onChange={onChange}
												disabled={open}
											/>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='checkbox'>
											<div>Not verified</div>
											<Checkbox
												//value={item.id}
												onChange={onChange}
												disabled={open}
											/>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'></GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='control'>
											<Button
												w='180px'
												h='50px'
												variant='outline'
												colorScheme='green'
												size='xl'
												onClick={() => {
													// setFiltersHidden(!filtersHidden)
												}}
											>
												Apply
											</Button>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='control'>
												<Button
													w='180px'
													h='50px'
													variant='outline'
													colorScheme='red'
													size='xl'
													onClick={() => {
														// setFiltersHidden(!filtersHidden)
													}}
												>
													Clear
												</Button>
										</div>
									</GridItem>
								</Grid>
							</div>
							<Divider />
							<div className='buttons-block'>
								<div>
									<Button
										w='180px'
										h='50px'
										variant='outline'
										colorScheme='teal'
										size='xl'
										onClick={() => {
											// setFiltersHidden(!filtersHidden)
										}}
									>
										Create
									</Button>
								</div>
								<div>
									<Button
										w='180px'
										h='50px'
										variant='outline'
										colorScheme='teal'
										size='xl'
										onClick={() => {
											// setFiltersHidden(!filtersHidden)
										}}
									>
										Edit
									</Button>
								</div>
								<div>
									<Button
										w='180px'
										h='50px'
										variant='outline'
										colorScheme='teal'
										size='xl'
										onClick={() => {
											// setFiltersHidden(!filtersHidden)
										}}
									>
										Specialities
									</Button>
								</div>
								<div>
									<Button
										w='180px'
										h='50px'
										variant='outline'
										colorScheme='teal'
										size='xl'
										onClick={() => {
											// setFiltersHidden(!filtersHidden)
										}}
									>
										Create schedule
									</Button>
								</div>
								<div>
									<Button
										w='180px'
										h='50px'
										variant='outline'
										colorScheme='teal'
										size='xl'
										onClick={() => {
											// setFiltersHidden(!filtersHidden)
										}}
									>
										Delete
									</Button>
								</div>
							</div>
							<div className='table-profiles'></div>
						</>
					)
				}
				</div>

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

						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>

							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Settings };
