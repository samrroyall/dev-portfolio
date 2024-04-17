import { Button, Input } from "../../shared";

const ContactForm = () => (
  <form class="my-4 flex flex-col space-y-6">
    <div class="text-secondary-text font-bold">Contact</div>
    <Input label="Full name" placeholder="First Last" />
    <Input
      label="Email address"
      placeholder="first.last@example.com"
      required={true}
      type="email"
    />
    <Input
      label="Message"
      maxlength={1000}
      noResize={true}
      placeholder="Hi Sam, I'm reaching out because..."
      required={true}
      rows={18}
      type="textarea"
    />
    <div class="text-right">
      <Button type="submit">Send</Button>
    </div>
  </form>
);

export default ContactForm;
