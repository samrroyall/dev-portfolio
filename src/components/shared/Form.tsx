import { type PropsWithChildren } from "beth-stack/jsx";
import Button from "./Button";

const errorIconContainerClasses =
  "flex items-center justify-center h-3.5 w-3.5 mr-2 rounded-full";

const errorIconStyleClasses =
  "text-primary-bg bg-red-400 text-sm font-bold leading-3";

const errorIcon = (
  <div class={`${errorIconContainerClasses} ${errorIconStyleClasses}`}>
    {"!"}
  </div>
);

const ErrorMsg: Record<string, string> = {
  recaptcha: "Recaptcha challenge failed",
  unauthenticated: "User authentication failed",
  unknown: "Something went wrong",
};

interface FormProps {
  action: string;
  id: string;
  className?: string;
  error?: string;
  failure?: boolean;
  submitLabel?: string;
  success?: boolean;
}

const Form = ({
  action,
  id,
  className,
  error,
  submitLabel,
  success,
  children,
}: FormProps & PropsWithChildren) => {
  const recaptchaFuncs = `
    function onSubmit(token) {
      document.getElementById("${id}").submit();
    }
  `;

  const errorMsg = !!error ? ErrorMsg[error] : null;

  return (
    <>
      <script>{recaptchaFuncs}</script>
      <div
        class={`flex items-center text-red-400 ${success === false ? "" : "hidden"}`}
      >
        {errorIcon}
        <span>{errorMsg || ErrorMsg.unknown}</span>
      </div>
      <div
        class={`text-secondary-text text-center ${success === true ? "" : "hidden"}`}
      >
        <div class="text-2xl font-bold">{"Thank you"}</div>
        <span>{"The form was submitted successfully"}</span>
      </div>
      <form
        id={id}
        class={`flex flex-col ${success === true ? "hidden" : ""} ${className || ""}`}
        action={action}
        method="post"
        hx-on:keyup={`htmx.find("#${id}-submit-button").disabled = !htmx.find("#${id}").checkValidity();`}
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
