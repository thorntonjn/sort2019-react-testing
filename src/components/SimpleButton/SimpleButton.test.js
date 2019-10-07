import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  cleanup,
  fireEvent,
  render
} from "@testing-library/react"

import Button from "./SimpleButton.js"

describe('SimpleButton', () => {
  afterEach( () => {
    cleanup()
  })

  it("Captures clicks", () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>)
    const node = getByText("Click Me")
    fireEvent.click(node);
    expect(handleClick).toHaveBeenCalled()
  });

})

