import { Form, Input } from "../../shared";

const AdminLoginForm = () => (
  <Form
    id="admin-form"
    action="/authenticate"
    className="mx-auto lg:w-1/2"
    submitLabel="Enter"
  >
    <Input
      id="admin-form-username"
      name="username"
      label="Username"
      placeholder="Username"
      required={true}
    />
    <Input
      id="admin-form-password"
      name="password"
      label="Password"
      placeholder="Password"
      type="password"
      required={true}
    />
  </Form>
);

export default AdminLoginForm;
