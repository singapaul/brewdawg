import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

// render returns object with a container
// Cheap and quick testing method
it("should match form component snapshot", () => {
  const { container } = render(
    <Checkbox label={"label"} checked={"true"} id={"1"} />
  );
  expect(container).toMatchSnapshot();
});
