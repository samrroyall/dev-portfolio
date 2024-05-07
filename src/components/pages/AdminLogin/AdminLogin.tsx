import { BasePage } from "../../pages";
import { Form, Input } from "../../shared";

interface AdminLoginProps {
  error: string | undefined;
  success: string | undefined;
}

const AdminLogin = ({ error, success }: AdminLoginProps) => (
  <BasePage>
    <div class="mx-auto mb-6 mt-3 lg:w-1/2">
      <Form
        id="admin-form"
        action="/authenticate"
        submitLabel="Enter"
        {...(!!error ? { error } : {})}
        {...(!!success ? { success: success === "true" } : {})}
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
    </div>
  </BasePage>
);

export default AdminLogin;
