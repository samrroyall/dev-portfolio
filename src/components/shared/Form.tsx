import { type PropsWithChildren } from "beth-stack/jsx";
import Button from "./Button";

interface FormProps {
  action: string;
  id: string;
  className?: string;
  failure?: boolean;
  submitLabel?: string;
  success?: boolean;
}

const Form = ({
  action,
  id,
  className,
  submitLabel,
  children,
}: FormProps & PropsWithChildren) => {
  const recaptchaFuncs = `
    function onSubmit(token) {
      document.getElementById("${id}").submit();
    }
  `;

  return (
    <>
      <script>{recaptchaFuncs}</script>
      <form
        id={id}
        class={`my-4 flex flex-col ${className || ""}`}
        action={action}
        method="post"
        hx-on:change={`htmx.find("#${id}-submit-button").disabled = !htmx.find("#${id}").checkValidity();`}
        hx-on:submit={`event.preventDefault(); grecaptcha.execute();`}
      >
        {children}
        <div
          class="g-recaptcha"
          data-sitekey={process.env.RECAPTCHA_SITE_KEY}
          data-callback="onSubmit"
          data-size="invisible"
        />
        <div class="my-3 text-right">
          <Button id={`${id}-submit-button`} type="submit" disabled={true}>
            {submitLabel || "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
