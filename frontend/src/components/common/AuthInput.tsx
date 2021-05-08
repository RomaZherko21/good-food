const AuthInput = ({
  text,
  type,
  name,
  formik,
}: {
  text: string;
  type: string;
  name: string;
  formik: any;
}) => {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        value={formik.values[name]}
        onBlur={formik.handleBlur}
      />
      <span className="inputErr">
        {formik.touched[name] && formik.errors[name] ? (
          <div>{formik.errors[name]}</div>
        ) : null}
      </span>
    </>
  );
};

export default AuthInput;
