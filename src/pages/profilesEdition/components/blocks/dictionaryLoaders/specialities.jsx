import React, { useState, useEffect } from 'react';
import { uniq, isEqual } from 'lodash';
import {
	Spinner,
} from '@chakra-ui/react';

import {
	useFetchSpecialitiesQuery,
} from '_store';
import InfiniteLoaderBlock from '_components/inputs/InFiniteLoader';
import '../../../profilesEdition.scss';

const SpecialitiesLoader = ({
    handleAddSpeciality,
    handleListOpen
}) => {
	const [search, setSearch] = useState('');
	const [currentScrollToken, setCurrentScrollToken] = useState(null);
	const [currentList, setCurrentList] = useState([]);
	const [page, setPage] = useState(0);

	const { isLoading: isSpecialitiesLoading, isSuccess, data: specialities = {}}
		= useFetchSpecialitiesQuery({
			scrollId: currentScrollToken,
			page,
			search
		});
	const { data = [], scrollToken, isLastPage } = specialities;

	useEffect(() => {
		const list = currentScrollToken === null ? data : uniq([...data, ...currentList]);
		if (!isEqual(list, currentList)) {
			setCurrentList(list);
		}
	}, [isSuccess, data, currentScrollToken, currentList]);

	const _loadNextPage = () => {
		console.log('loadnextPage')
		return new Promise(resolve =>
			setTimeout(() => {
				setPage(page + 1)
				setCurrentScrollToken(scrollToken);
			  	resolve();
			}, 0)
		  );
	};

	  useEffect(() => {
		if (search) {
			console.log('search')
			setPage(0)
			setCurrentScrollToken(null);
			setCurrentList([])
		}
	  }, [search])
	console.log('8888')
	return (
		<div className='speciality-layout'>
			<>
			{
				isSpecialitiesLoading  ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
                    <InfiniteLoaderBlock
                        hasNextPage={!isLastPage}
                        isNextPageLoading={false}
                        items={currentList || []}
						fieldname='spec'
                        // listOpen={search}
                        loadNextPage={_loadNextPage}
                        wrapperClassName='listbox'
                        handleSelect={handleAddSpeciality}
                        search={search}
                        onFocus={handleListOpen}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
				)
			}
			</>
		</div>
	)
};

export { SpecialitiesLoader };
