import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import {
	useFetchAppealsQuery,
	useDeleteAppealMutation
} from '_store';
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
import { CreateDegree } from './components/createAppeal';
import './appeals.scss';
import {  } from "react-router-dom";

const Appeals = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { isLoading, isError, data: degrees = []} = useFetchAppealsQuery();
	// const { data = [], totalResults } = degrees;
	const [ deleteItem, { isLoading: isItemDeleting, isSuccess: isItemDeleted }] = useDeleteAppealMutation();

	const [selectedItems, setSelectedItems] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setSelectedItems([]);
		setOpen(false);
	}

	const handleDelete = () => {
		deleteItem(selectedItems[0]);
	}

	const onChange = ({ target: {value, checked} }) => {
		const selected = clone(selectedItems);

		if (checked) {
			selected.push(value);
			setSelectedItems(selected);
		} else {
			const dropped = selected.filter(item => item!==value)
			setSelectedItems(dropped);
		}
	}

	useEffect(() => {
		if (isItemDeleted) {
			setSelectedItems([]);
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
								setSelectedItems([]);
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
							isDisabled={selectedItems.length !== 1}
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
							isDisabled={selectedItems.length !== 1}
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
												</Tr>
											</Thead>
										<Tbody>
										{
											degrees.map(({id, name}) => {

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
								selectedItems.length === 1 ? 'Edit medical degree' : 'New medical degree'
							}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<div>
								<CreateDegree
									id={selectedItems[0]}
									onClose={() => handleClose()}
								/>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			</div>
	)
};

export { Appeals };
