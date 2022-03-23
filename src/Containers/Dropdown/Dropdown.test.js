import { getElementError, render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";


// render returns object with a container
it("should match form component snapshot", () => {
  const { container } = render(<Dropdown label={"label"} value={"1"} options={["1","2","3"]} />);
  expect(container).toMatchSnapshot();
});
