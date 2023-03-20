import React, { useState } from 'react'

const NoHookForm = () => {
  const [name, setName] = useState('')
  console.log(name)
  const [errors, setErrors] = useState({
    name: {
      invalid: false,
      message: '이름이 너무 깁니다.',
    },
  })
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (name.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          invalid: true,
        },
      }))
    }
  }
  return (
    <div>
      <form>
        <input value={name} onChange={handleName} />
        {errors.name.invalid ? (
          <p className="error">{errors.name.message}</p>
        ) : null}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NoHookForm
