import {Home} from "../Home";
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe("Home Component", () => {

    afterEach(() => {
        cleanup();
    })

    test("Home Component", async () => {
        const { getByTestId } = render(<Home />);
        const mainComponent = getByTestId("mainComponent");
        expect(mainComponent).toBeTruthy();
    })

    test("Check Child Length", () => {
        const { getByTestId } = render(<Home />);
        const candidateFormList = getByTestId('candidateForm');
        const formLength = getByTestId('formLength');
        expect(candidateFormList.children.length).toBe(2);
        expect(formLength.children.length).toBe(4);
    })

    test("Heading Test", () => {
        const { getByTestId } = render(<Home />);
        const heading = getByTestId('heading');
        expect(heading.innerHTML).toBe('Candidate Form');
    })

    test("Input TextField", async () => {
        await act(async () => {
            const { getByTestId, getAllByTestId } = render(<Home />);
            const inputField = getByTestId("inputField");
            const selectInputField = getAllByTestId("selectInputField");
            expect(inputField).toBeTruthy();
            expect(selectInputField).toBeTruthy();
        })
    })

    test("Button Test", () => {
        const home = render(<Home />);
        const buttonTest = home.getByTestId("buttonTest");
        expect(buttonTest).toBeTruthy();
    })

    test("Matches SnapShot", () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
