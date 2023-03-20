import { useForm } from 'react-hook-form'

export interface FormValues {
  username: string
  error: string
}
export interface FormProps {
  onSubmit: (data: FormValues) => void
}

export default function HookForm() {
  const { register, handleSubmit } = useForm<FormValues>({ mode: 'onChange' })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
