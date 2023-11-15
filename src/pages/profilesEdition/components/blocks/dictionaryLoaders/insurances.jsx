import React, { useState, useEffect } from 'react';
import { uniq, isEqual } from 'lodash';
import {
	Spinner,
} from '@chakra-ui/react';

import {
	useFetchInsurancesQuery,
} from '_store';
import InfiniteLoaderBlock from '_components/inputs/InFiniteLoader';
import '../../../profilesEdition.scss';

const InsurancesLoader = ({
    handleAddInsurance,
    handleListOpen
}) => {
	const [search, setSearch] = useState('');
	const [currentScrollToken, setCurrentScrollToken] = useState(null);
	const [currentList, setCurrentList] = useState([]);
	const [page, setPage] = useState(0);

	const { isLoading, isSuccess, data: insurances = {}} = useFetchInsurancesQuery({
		scrollId: currentScrollToken,
		page: page,
		search: search
	});
	const { data = [], scrollToken, isLastPage } = insurances;

	useEffect(() => {
		const list = currentScrollToken === null ? data : uniq([...data, ...currentList]);
		if (!isEqual(currentList, list)) {
			setCurrentList(list);
		}
	}, [isSuccess, data, currentScrollToken, currentList]);

	const _loadNextPage = () => {
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
			setPage(0)
			setCurrentScrollToken(null);
			setCurrentList([])
		}
	  }, [search])

	return (
		<div className='speciality-layout'>
			<>
			{
				isLoading  ? (
					
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
                        items={currentList}
                        // listOpen={search}
                        loadNextPage={_loadNextPage}
                        wrapperClassName='listbox'
                        groupedOptions={currentList || []}
                        handleSelect={handleAddInsurance}
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

export { InsurancesLoader };
