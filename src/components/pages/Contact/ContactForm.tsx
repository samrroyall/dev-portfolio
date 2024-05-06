import { Form, Input } from "../../shared";

const ContactForm = () => (
  <Form action="/send" id="contact-form" submitLabel="Send">
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
);

export default ContactForm;
