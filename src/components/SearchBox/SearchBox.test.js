import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

it("should render the search box", () => {
  render(<SearchBox  label ={"string"} searchTerm={"string"}/>);

  const searchBox = screen.getByRole("form");

  expect(searchBox).toBeInTheDocument();
});
