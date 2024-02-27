import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";

export default function SignupForm() {
    const userRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: userRef.current.value,
          email: emailRef.current.value,
          password: pwdRef.current.value,
        };
    
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup/`,
          user,
          {
            headers: { "Content-Type": "application/json" },
          },
          {
            withCredentials: true,
          }
        );
        window.location.href = "/login"
      }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={userRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={pwdRef} required />
      </Form.Group>
      <div className="mt-2">
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
    </Form>
  )
}


// import axios from "axios";
// import { useState } from "react";

// export const SignUpForm = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState(""); 
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");

//   // async function handleSubmit(e) {
//   //   e.preventDefault()
//   //   const user = (  

//   //   )  }

//   const submit = async (e) => {
//     e.preventDefault();
//     const newUser = {
//       username: username,
//       email: email,
//       password1: password1,
//       password2: password2,
//     };
  
//     try {
//       const { data } = await axios.post('http://localhost:8000/login-signup/', newUser, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('User signed up successfully:', data);
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <div className="Auth-form-container">
//       <form className="Auth-form" onSubmit={submit}>
//         <div className="Auth-form-content">
//           <h3 className="Auth-form-title">Sign Up</h3>
//           <div className="form-group mt-3">
//             <label>Username</label>
//             <input
//               className="form-control mt-1"
//               placeholder="Enter Username"
//               name="username"
//               type="text"
//               value={username}
//               required
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Email Address</label> 
//             <input
//               className="form-control mt-1"
//               placeholder="Enter Email"
//               name="email"
//               type="email"
//               value={email}
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Password</label>
//             <input
//               name="password1"
//               type="password"
//               className="form-control mt-1"
//               placeholder="Enter password"
//               value={password1}
//               required
//               onChange={(e) => setPassword1(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Confirm Password</label>
//             <input
//               name="password2"
//               type="password"
//               className="form-control mt-1"
//               placeholder="Confirm password"
//               value={password2}
//               required
//               onChange={(e) => setPassword2(e.target.value)}
//             />
//           </div>
//           <div className="d-grid gap-2 mt-3">
//             <button type="submit" className="btn btn-primary">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;