import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { Form, Input, SectionDivider } from "../../shared";

interface AdminLoginProps extends DefaultPageProps {
  error: string | undefined;
  success: string | undefined;
}

const AdminLogin = ({
  error,
  success,
  theme,
}: AdminLoginProps): JSX.Element => {
  const attrs = {
    ...(!!error ? { error } : {}),
    ...(!!success ? { success: success === "true" } : {}),
  };

  return (
    <BasePage theme={theme} title="Admin Login">
      <SectionDivider />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm">
        <Form
          id="admin-form"
          action="/authenticate"
          submitLabel="Enter"
          {...attrs}
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
};

export default AdminLogin;
