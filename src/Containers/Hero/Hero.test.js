import { getElementError, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "./Hero";

// render returns object with a container
it("should match form component snapshot", () => {
  const { container } = render(<Hero />);
  expect(container).toMatchSnapshot();
});
