import { useForm } from 'react-hook-form'
import { FieldError } from 'react-hook-form'

export interface FormValues {
  password: string
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
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="email"
        />
        <div>{errors.email && <span>This field is required</span>}</div>

        <input
          type="text"
          placeholder="password"
          {...register('password', {
            required: 'password is required',
            minLength: {
              value: 6,
              message: ' 6글자 넘어야해요 ',
            },
          })}
          onKeyUp={onKeyPress}
        />
        <div>
          {errors?.password?.message && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
