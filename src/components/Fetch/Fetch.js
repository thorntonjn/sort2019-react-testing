import React, { useState } from 'react'
import axios from 'axios'

export default function Fetch({ url }) {
  const [greeting, setGreeting] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async () => {
    const response = await axios.get(url)
    const data = response.data
    const { greeting } = data
    setGreeting(greeting)
    setButtonClicked(true)
  }

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
      <div>
        <button
            onClick={fetchGreeting}
            data-testid="ok-button"
            disabled={buttonClicked}
        >
          {buttonText}
        </button>
        {greeting ? <h1 data-testid="greeting-text">{greeting}</h1> : null}
      </div>
  )
}