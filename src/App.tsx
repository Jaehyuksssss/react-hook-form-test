import { useForm } from 'react-hook-form'

export default function App() {
  const { register, handleSubmit } = useForm({ mode: 'onChange' })

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const onError = (error: any) => {
    console.log(error)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          type="text"
          placeholder="username"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 6,
              message: ' 6글자 넘어야해요 ',
            },
          })}
        />
        <input type="submit" />
      </form>
    </div>
  )
}
