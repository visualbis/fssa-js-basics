const Input = ({ labelName, inputType, onChange, ...otherProps }) => {
    return (
      <>
        <label htmlFor="">{labelName}</label>
        <input type={inputType} onChange={onChange} {...otherProps} required />
      </>
    );
  };
  
  export { Input };
  