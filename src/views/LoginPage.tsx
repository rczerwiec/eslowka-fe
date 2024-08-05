import { useFormik } from "formik";
import {doSignInWithEmailAndPassword } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit: (values) => {
          doSignInWithEmailAndPassword(values.email, values.password);
          //CREATE USER IN MONGODB
          navigate("/app")
        },
      });

    return(
    <div>
          Login
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <button type="submit">Submit</button>
          </form>
        </div>)
}

export default LoginPage;