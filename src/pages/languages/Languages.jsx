import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import clone from 'lodash/clone';
import { Button } from '@chakra-ui/react';
import {
	useFetchLanguagesListQuery,
	useDeleteLanguageMutation,
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
import { CreateDegree } from './components/createLanguage';
import './languages.scss';
import {  } from "react-router-dom";

const Languages = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const { isLoading, isError, data: degrees = []} = useFetchLanguagesListQuery();
	// const { data = [], totalResults } = degrees;
	const [ deleteItem, { isLoading: isItemDeleting, isSuccess: isItemDeleted }] = useDeleteLanguageMutation();

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

	const handlePageSelect = (pageNum) => {
		// setPage(pageNum - 1)
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
													<Th>Code</Th>
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

export { Languages };
