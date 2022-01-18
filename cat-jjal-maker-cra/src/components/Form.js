import React from "react";

//입력폼 컴포넌트
const Form = ({ updateMainCat }) => {
    //폼 검증
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    //폼 
    const [value, setValue] = React.useState('');
    //에러메세지
    const [errorMessage, setErrorMessage] = React.useState('');

    function handleInputChange(event) {
        const userValue = event.target.value;
        setErrorMessage('');
        if (includesHangul(userValue)) {
            setErrorMessage("한글은 입력할 수 없습니다.");
        }
        setValue(userValue.toUpperCase());
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setErrorMessage('');
        if (value === '') {
            setErrorMessage("빈 값으로 만들 수 없습니다.")
            return;
        }
        updateMainCat(value);
    }


    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="영어 대사를 입력해주세요" onChange={handleInputChange} value={value} />
            <button type="submit">생성</button>
            <p style={{ color: "red" }}>{errorMessage}</p>
        </form>
    );
}

export default Form;