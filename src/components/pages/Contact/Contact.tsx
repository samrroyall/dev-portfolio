import { type Store } from "../../../index";
import BasePage from "../BasePage";
import ContactForm from "./ContactForm";

interface ContactProps {
  store: Store;
}

const Contact = ({ store }: ContactProps) => (
  <BasePage current="contact">
    <div class="mb-6 mt-3">
      <ContactForm store={store} />
    </div>
  </BasePage>
);

export default Contact;
