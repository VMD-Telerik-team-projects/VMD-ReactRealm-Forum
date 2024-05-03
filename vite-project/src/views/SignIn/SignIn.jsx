import { Button } from "react-bootstrap"

export default function SignIn() {
  const updateForm = () => {};
  const login = () => {};
  const form = {};
  
  return (
    <div>
        <h1>Login</h1>
        <label htmlFor="email">Email: </label>
        <input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" />
        <label htmlFor="password">Password: </label>
        <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /> <br /> <br /><br />
        <Button onClick={login}>Login</Button>
    </div>
)
}
