import { useForm } from 'react-hook-form'
import { FieldError } from 'react-hook-form'

export interface FormValues {
  username: string
  email: string
}

export interface FormProps {
  onSubmit: (data: FormValues) => void
}

export default function HookForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
        <label>Email</label>
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}

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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
