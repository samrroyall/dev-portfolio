import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { Form, Input, SectionDivider } from "../../shared";

interface ContactProps extends DefaultPageProps {
  error: string | undefined;
  success: string | undefined;
}
const Contact = ({ error, success, theme }: ContactProps): JSX.Element => (
  <BasePage current="contact" theme={theme} title="Contact Me">
    <SectionDivider />
    <div class="mx-auto mb-6 mt-3 max-w-screen-sm">
      <Form
        id="contact-form"
        action="/sendemail"
        submitLabel="Send"
        {...(!!error ? { error } : {})}
        {...(!!success ? { success: success === "true" } : {})}
      >
        <Input
          id="contact-form-name"
          name="name"
          label="Full name"
          placeholder="First Last"
        />
        <Input
          id="contact-form-email"
          name="email"
          label="Email address"
          placeholder="first.last@example.com"
          required={true}
          type="email"
        />
        <Input
          id="contact-form-body"
          name="body"
          label="Message"
          maxlength={1000}
          noResize={true}
          placeholder="Hi Sam, I'm reaching out because..."
          required={true}
          type="textarea"
        />
      </Form>
    </div>
  </BasePage>
);

export default Contact;
