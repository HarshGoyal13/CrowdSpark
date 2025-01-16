const CustomButton = ({ btnType, title,className, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`${styles} ${className} px-6 py-3 rounded-xl`}
      onClick={handleClick} // Ensure `handleClick` is passed and invoked correctly
    >
      {title}
    </button>
  );
};

export default CustomButton;
