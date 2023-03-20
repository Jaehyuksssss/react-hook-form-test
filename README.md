# practice react-hook-form

## Contents

react-hook-form 을 썼을때 쓰지 않았을 경우 비교

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
