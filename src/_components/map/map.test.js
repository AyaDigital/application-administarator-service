import { render, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Map from "./map";
 
// afterEach function runs after each test suite is executed
afterEach(() => {
	cleanup(); // Resets the DOM after each test suite
})
 
describe("Loader Component", () => {
	const handleOperation = jest.fn();

	test("Modal Rendering", () => {
		render(
			<Map
				center={{
					lat: 55.555,
					lng: 33.333
				}}
				marker={<></>}
				markers={[]}
				zoom={11}
				className={''}
				onClick={handleOperation}
				overlay={''}
				icon={''}
			/>
		)
	})
});