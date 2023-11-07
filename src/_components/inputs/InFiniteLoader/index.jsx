import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Input as TextField,
} from '@chakra-ui/react';

const InfiniteLoaderWrapper =({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  wrapperClassName,
  getOptionProps,
  groupedOptions,
  listboxProps,
  fieldname = 'name',
  search,
  onChange,
  onFocus,
  onBlur,
  handleSelect,
  listOpen
}) => {

	const itemCount = hasNextPage ? items.length + 1 : items.length;

	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
	const isItemLoaded = (index) => !hasNextPage || index < items.length;

	const Item = ({ index, style }) => {

	if (!isItemLoaded(index)) {
		return <li style={style}>Loading...</li>;
	} else {
		const option = groupedOptions[index];
		const name = option.name || "no name";

		return (
			<li
				style={style}
				onClick={(e) => {
					handleSelect(Number(option.id))
				}}
			>
				{name}
			</li>
		);
	}
  };

  return (
		<Popover placement='bottom-start' isOpen={listOpen}>
			<PopoverTrigger>
				<TextField
					required
					h='50px'
					placeholder=" "
					id="outlined-controlled"
					value={search}
					onFocus={onFocus}
					onChange={onChange}
				/>
			</PopoverTrigger>
			<PopoverContent w='500px'>
				<PopoverBody>
				<InfiniteLoader
					isItemLoaded={isItemLoaded}
					itemCount={itemCount}
					loadMoreItems={loadMoreItems}
				>
					{({ onItemsRendered, ref }) => (
						<div>
							<List
								className={wrapperClassName}
								height={150}
								itemCount={itemCount}
								itemSize={30}

								onItemsRendered={onItemsRendered}
								ref={ref}
								width={508}
								
								innerElementType="ul"
							>
								{Item}
							</List>
						</div>
					)}
				</InfiniteLoader>
				</PopoverBody>
			</PopoverContent>
		</Popover>
  );
}

export default InfiniteLoaderWrapper;
