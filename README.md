# practice react-hook-form

## Contents

- react-hook-form 을 썼을때 쓰지 않았을 경우 비교
- react-hook-form 기능들 써보고 정리

---

### 쓰지 않은 경우 - NoHookForm.tsx

---

- 제어 컴포넌트로 폼을 다루기 위해서 하나하나 state 를 선언해주고, 해당 state 를 다루기 위해서 또 핸들링 함수를 만들어야 하고, 에러를 위한 state, 또 검증을 위한 함수.. 지금은 아주 단순한 validation check 만 했기 때문에 코드가 간소화 되었지만, 모든 유효성 검증을 한다면 코드는 더더욱 길어질 것입니다.

- 코드의 길이도 문제지만, 또 다른 문제점이 있습니다. React 에서 컴포넌트 리랜더링이 발생하는 조건 중 하나는 state 의 값이 변했을 때 입니다. 현재 폼에선 모든 값이 state 로 연결되어 있으며 하나의 값이 변할때 마다 여러개의 자식 컴포넌트 들에서 무수히 많은 리랜더링이 발생합니다. 이는 개발자가 예측한 랜더링이 아닌, 불필요한 랜더링으로서 불필요한 연산으로 생각할 수 있습니다

---

### 썼을 경우 - HookForm.tsx

---

- value와 onChange로 각 입력 필드에 대한 처리를 추가할 필요없음

- state를 직접 관리할 필요가 없음

* [register]

  ref로 사용되는 함수로 입력 필드를 React Hook Form에 등록하고 변경 사항에 대해 값을 추적합니다.

```jsx
<input type="text" name="email" ref={register} />
```

- [handleSubmit]

form을 서버로 제출할 때 사용하는 함수입니다.

```jsx
<form onSubmit={handleSubmit(onSubmit)}>

const onSubmit = (data) => {
 console.log(data);
};
```

[errors]
유효성 검사를 포함하는 객체입니다.

```jsx
<input type="text" name="email" ref={register({ required: true})} />

<input
  type="password"
  name="password"
  ref={register({ required: true, minLength: 6 })}
/>
```

1. validation 기본 구현
   validation를 추가하기 위해서는 각 입력 필드 ref로 전달되는 레지스터 함수에 유효성 검사를 매개변수를 전달합니다.

```jsx
<input type="text" name="email" ref={register({ required: true})} />
<input
  type="password"
  name="password"
  ref={register({ required: true, minLength: 6 })}
/>

```

- 자주 사용되는 유효성 검사 속성들 입니다.

* required : 입력 필드에 대한 필수 여부 검사

* minlength maxlength : 문자열 입력 값의 최소, 최대 길이 설정

* min max : 숫자 입력 값의 최소값, 최대값 설정

* type : 입력 필드에 대한 유형 (이메일, 숫자, 텍스트 등)

* pattern : 정규식을 이용한 입력 필드에 대한 패턴 정의

- 정규식 썼을때

- 이렇게 정의된 속성들에 따라 form이 제출될 때 errors 로 유효성 검사 성공여부를 확인 할 수 있습니다.

```
<input
  type="text"
  name="email"
  ref={register({
    required: 'Email is required.',
    pattern: {
      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      message: 'Email is not valid.',
    },
  })}
/>

{
  errors.email && errors.email.type === 'required' && (
    <p className="errorMsg">Email is required.</p>
  )
}
```

- 6글자가 넘어가면 유효성 검사로 6글자가 넘어야 한다는 메세지를 주고 싶었다.
- 그치만 errors부분에 자꾸 에러가 났다. 타입이 지정이 안됐다고 한다.

  ### 처음 시도

  ```jsx
  export default function HookForm() {
    const { register, handleSubmit, reset, errors } =
      useForm <
      FormValues >
      {
        mode: 'onChange',
      }
      ~~~~
  }
  ```

- chat gpt한테 물어봤는데 자꾸 이렇게 알려준다.

```jsx
 {errors?.username && <p>{(errors.username as FieldErrors)?.message}</p>}
      <input type="submit" />
```

```jsx

export default function HookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  })
  ~~~~
}
```

- 결국 공식문서에서 찾은 정답 역시 아직 chat gpt보단 사람인것 같다.

# watch 와 getValues 의 차이

watch는 지정된 필드 또는 필드 배열을 구독하고 해당 필드의 최신 값을 반환하는 함수입니다. watch 함수는 폼 필드 값이 업데이트될 때마다 자동으로 호출되므로, 사용자가 입력하는 값을 실시간으로 추적할 수 있습니다. 예를 들어, watch('firstName')를 호출하면 'firstName' 필드의 현재 값을 가져올 수 있습니다.

반면, getValues 함수는 모든 필드 값을 가져오는 데 사용됩니다. 이 함수는 폼 데이터를 한 번에 가져오기 때문에 watch보다 더 무거울 수 있습니다. getValues 함수는 매개변수를 지원하지 않으므로, 필드 이름을 명시적으로 지정하지 않으면 모든 필드 값을 가져옵니다.

즉, watch는 특정 필드의 값을 추적하고 필드 값이 변경될 때마다 호출되며, getValues는 폼 내 모든 필드 값을 한 번에 가져오는 함수입니다. 사용에 따라 두 함수 중 하나를 선택하면 됩니다.

- watch 는 값 변화에 대해 컴포넌트가 re-render가 이루어지고 getValues는 그렇지 않다.

- watch는 input의 변화를 subscribe해서 변화에 따라 re-render가 이루어진다.

- getValues는 RHF 내에 render와 관계없이 저장된 value를 가져올 때에 사용된다. re-render가 이루어지지 않는다. 따라서 빠르고 cheap한 메소드이다.

```jsx
const firstName = watch('email') // watch 함수를 사용하여 'email' 필드의 값을 추적합니다.
const allValues = getValues() // getValues 함수를 사용하여 모든 필드의 값을 가져옵니다.
console.log(firstName)
```
