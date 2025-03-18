import React, { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(50)

  const handleClick = () => {
    setCount((prev) => prev + 1)
  }

  return <button onClick={handleClick}>button {count}</button>
}
