import { render, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import InfiniteLoaderWrapper from "./";
 
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
 
describe("InfiniteLoader Component", () => {
    const handleOperation = jest.fn();

    test("Modal Rendering", () => {
        render(
            <InfiniteLoaderWrapper
                hasNextPage={true}
                isNextPageLoading={false}
                items={[]}
                loadNextPage={handleOperation}
                wrapperClassName={null}
                search={''}
                onChange={handleOperation}
                onFocus={handleOperation}
                handleSelect={handleOperation}
                listOpen={true}
            />
        )
    })
})
