import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../shared/store";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IUser } from "../shared/store/slices/UserSlice";
import { auth } from "../firebase/firebas";

const SignUpPage = () => {
    const [createUser] = useCreateUserMutation();
    
        const doCreateUserWithEmailAndPassword = async (
          email: string,
          password: string
        ) => {
          return createUserWithEmailAndPassword(auth, email, password).then(
            (user) => {
              let newUser = {
                id: user.user.uid,
                uid: user.user.uid,
                userName: email,
                folders: []}
              createUser(newUser).then(()=>{
                navigate('/login')
              });
            }
          );
        };
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit: (values) => {
          doCreateUserWithEmailAndPassword(values.email, values.password);
        },
      });

    return(
    <div>
            Register
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

export default SignUpPage;