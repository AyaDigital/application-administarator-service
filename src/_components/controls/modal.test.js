
import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import { ModalForm } from "./modal";
 
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
 
describe("Modal Component", () => {
    const handleOperation = jest.fn();
    const isLoading = false;
    const onClose = jest.fn();
    render(
        <ModalForm
            handleOperation={handleOperation}
            onClose={onClose}
            isLoading={isLoading}
        />
    )
    const modal = screen.getByTestId("modal");
    const buttonNo = screen.getByTestId("no-button");
    const buttonYes = screen.getByTestId("yes-button");
 
    test("Modal Rendering", () => {
        expect(modal).toBeInTheDocument();
    })
 
    test("Button Text No", () => {
        expect(buttonNo).toHaveTextContent("No");
    })
 
    test("Button Text Yes", () => {
        expect(buttonYes).toHaveTextContent("Yes");
    })
})