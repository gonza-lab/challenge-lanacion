import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button.client'

describe('Button component tests', () => {
  test('button should rendered correctly', () => {
    render(<Button onClick={() => {}}>Click Me</Button>)

    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  test('when button is pressed, onClick function is executed', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
