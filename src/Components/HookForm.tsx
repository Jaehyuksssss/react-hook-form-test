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
    watch,
    getValues,
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
  const firstName = watch('email') // watch 함수를 사용하여 'email' 필드의 값을 추적합니다.
  const allValues = getValues() // getValues 함수를 사용하여 모든 필드의 값을 가져옵니다.
  console.log(firstName)
  console.log(allValues)

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
