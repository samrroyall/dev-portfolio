import BasePage from "../BasePage";
import ContactForm from "./ContactForm";

const Contact = () => (
  <BasePage current="contact">
    <h1>Contact</h1>
    <ContactForm />
  </BasePage>
);

export default Contact;
