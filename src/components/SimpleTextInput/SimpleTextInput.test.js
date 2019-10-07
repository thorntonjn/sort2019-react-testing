import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  fireEvent, render, wait,  cleanup
} from "@testing-library/react"

import SimpleTextInput from "./SimpleTextInput.js"

describe('SimpleTextInput', () => {
  afterEach( () => {
    cleanup()
  })
  it("Handles Input Changes", async () => {
    const handleChange = jest.fn().mockImplementation( (e) => {
      e.persist()
    })
    const { getByPlaceholderText } = render(
        <SimpleTextInput onChange={handleChange} placeholder="Type Here" />
    );
    const node = getByPlaceholderText("Type Here")
    fireEvent.change(node, { persist:true, target: { value: "New Input Text" } })
    await wait(() => {
      expect(handleChange).toHaveBeenCalled()
      expect(handleChange.mock.calls[0][0].target.value).toBe('New Input Text')
    })
  });
})

