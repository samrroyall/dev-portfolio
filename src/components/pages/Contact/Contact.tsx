import { BasePage } from "../../pages";
import ContactForm from "./ContactForm";

const Contact = () => (
  <BasePage current="contact">
    <div class="mb-6 mt-3">
      <ContactForm />
    </div>
  </BasePage>
);

export default Contact;
