import { Button, Input } from "../../shared";

const ContactForm = () => {
  const sendEmailFunc = `
    function sendEmail(recaptchaToken) {
      emailjs.send(
        "${process.env.EMAILJS_SERVICE_ID}", 
        "${process.env.EMAILJS_TEMPLATE_ID}", 
        {
          name: htmx.find("#contact-form-name").value || "Anonymous",
          email: htmx.find("#contact-form-email").value,
          body: htmx.find("#contact-form-body").value,
          "g-recaptcha-response": recaptchaToken,
        },
      ).then(
        (_) => {
          htmx.addClass(htmx.find("#contact-form"), "hidden");
          htmx.find("#contact-form-result").innerHTML = "Form submission succeeded.";
        },
        (_) => {
          htmx.find("#contact-form-result").innerHTML = "Form submission failed. Please try again.";
        },
      )
    }
  `;

  return (
    <div>
      <script>{sendEmailFunc}</script>
      <form
        id="contact-form"
        class="my-4 flex flex-col"
        hx-on:change={`htmx.find("#contact-form-submit-button").disabled = !htmx.find("#contact-form").checkValidity();`}
        hx-on:submit={`event.preventDefault(); htmx.find("#contact-form-submit-button").disabled = true; grecaptcha.execute();`}
      >
        <Input
          id="contact-form-name"
          name="full"
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
        <div
          class="g-recaptcha"
          data-sitekey={process.env.RECAPTCHA_SITE_KEY}
          data-callback="sendEmail"
          data-size="invisible"
        />
        <div class=" my-3 text-right">
          <Button id="contact-form-submit-button" type="submit" disabled={true}>
            Send
          </Button>
        </div>
      </form>
      <p
        id="contact-form-result"
        class="text-secondary-text text-center font-bold"
      ></p>
    </div>
  );
};

export default ContactForm;
