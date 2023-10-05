import React, { useEffect, useId, useState } from "react";
import { Container } from "react-bootstrap";
import { checkIfobjEmpty, validateForm } from "../../utils/validation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const SignupForm = () => {
  const navigate = useNavigate();
  const { userList } = useLocalStorage();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // const [user, setUser] = useState({
  //   name: "Niamudeen",
  //   email: "test@gmail.com",
  //   phone: "8547854788",
  //   password: "123",
  // });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors(validateForm(user));
    }
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(user);
    setErrors(formErrors);

    console.log(formErrors, Object.keys(formErrors).length);

    let updatedUserList = [];
    let existUser = false;

    updatedUserList = [
      ...userList,
      {
        ...user,
        id: new Date().getTime(),
      },
    ];

    // userList?.forEach((e) => {
    //   if (e.email === user.email && e.password === user.password) {
    //     return (existUser = true);
    //   } else {
    //     return (existUser = false);
    //   }
    // });

    let noErrors = checkIfobjEmpty(formErrors);
    console.log(updatedUserList, "updatedUserList", noErrors, !existUser);

    if (existUser) {
      console.log("1111111");
      sendNotification("warning", "User Already Existed");
    } else if (noErrors) {
      localStorage.setItem("users", JSON.stringify(updatedUserList));
      console.log("222222");
      sendNotification("success", "User Created Successfully");
      navigate("/login");
    } else {
      console.log("33333333");
    }
  };

  return (
    <section className="common_section">
      <Container>
        <div className="flexCenter">
          <form className=" p-5 soft_theme">
            <h1 className="mb-4 text-center">Signup Form</h1>
            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                value={user.name}
                name="name"
                onChange={handleChange}
                placeholder=" Name ........."
              />
            </div>
            <p className="text-danger">{errors?.name ? errors.name : ""}</p>
            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder=" Email .........."
              />
            </div>
            <p className="text-danger">{errors?.email ? errors.email : ""}</p>
            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder=" Mobile Number .........."
              />
            </div>
            <p className="text-danger">{errors?.phone ? errors.phone : ""}</p>

            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder=" Password .........."
              />
            </div>
            <p className="text-danger">
              {errors?.password ? errors.password : ""}
            </p>
            <button className="btn btn-dark w-100 mb-3" onClick={handleSubmit}>
              SUBMIT
            </button>
            <Link to="/login">
              <button className="btn btn-outline-dark w-100">LOGIN</button>
            </Link>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default SignupForm;
