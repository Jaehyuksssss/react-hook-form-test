import { useForm } from 'react-hook-form'
import { FieldError } from 'react-hook-form'

export interface FormValues {
  username: string
}

export interface FormProps {
  onSubmit: (data: FormValues) => void
}

export default function HookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    reset()
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)()
      reset()
    }
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
          onKeyUp={onKeyPress}
        />
        {errors?.username?.message && <p>{errors.username.message}</p>}
        <input type="submit" />
      </form>
    </div>
  )
}
