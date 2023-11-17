import { render, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Loader from "./";
 
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
 
describe("Loader Component", () => {
    const handleOperation = jest.fn();

    test("Modal Rendering", () => {
        render(
            <Loader
                type={'balls'}
                color={'rgb(44, 121, 206, 0.4)'}
                className='loader-style'
                width={'300px'}
                height={'300px'}
            />
        )
    })
});
