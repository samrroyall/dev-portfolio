import { BasePage } from "../../pages";
import { Form, Input } from "../../shared";

interface ContactProps {
  error: string | undefined;
  success: string | undefined;
}
const Contact = ({ error, success }: ContactProps) => (
  <BasePage current="contact">
    <div>
      <Form
        id="contact-form"
        action="/send"
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
