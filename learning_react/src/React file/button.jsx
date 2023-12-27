import "../CSS file/button.css"
const Button = ({ type, value }) => {
    return (
      <>
        <button type={type}> {value} </button>
      </>
    );
  };
  
  export { Button };
  