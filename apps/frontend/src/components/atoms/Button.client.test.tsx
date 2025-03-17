import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button.client'

test('renderiza el botón correctamente', () => {
  render(<Button onClick={() => {}}>Click Me</Button>)

  const button = screen.getByText('Click Me')
  expect(button).toBeInTheDocument()
})

test('ejecuta la función onClick cuando se presiona', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)

  fireEvent.click(screen.getByText('Click Me'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
