import React, { useEffect, useState } from 'react'

export const Timer = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1)
        }, 1000)
    })
  return (
    <div>{count}</div>
  )
}
