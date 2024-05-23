type InputType = "email" | "password" | "text" | "textarea";

const standardBorderClasses =
  "border border-secondary-text dark:border-secondary-text-dark rounded";

const focusBorderClasses =
  "has-[:focus]:outline-none has-[:focus]:ring-1 has-[:focus]:ring-secondary-text has-[:focus]:dark:ring-secondary-text";

const invalidBorderClasses =
  "has-[:invalid]:border-error-text has-[:invalid]:ring-error-text has-[:focus:invalid]:ring-error-text";

const bgClasses = "*:bg-primary-bg *:dark:bg-primary-bg-dark";

const borderClasses = `${standardBorderClasses} ${focusBorderClasses} ${invalidBorderClasses}`;

const textClasses = "*:text-secondary-text dark:*:text-secondary-text-dark";

const fieldClasses = `my-3 inline-block p-1 ${bgClasses} ${borderClasses} ${textClasses}`;

const noBorderClasses = `border-0 ring-0 outline-none`;

const placeholderClasses = `placeholder-primary-text dark:placeholder-primary-text-dark text`;

const inputClasses = `bg-transparent w-full p-1 ${noBorderClasses} ${placeholderClasses}`;

const legendClasses = "px-1 text-sm";

const requiredClasses = "after:content-['*'] after:ml-1 after:text-error-text";

interface InputProps {
  label: string;
  name: string;
  id?: string;
  minlength?: number;
  maxlength?: number;
  noResize?: boolean;
  placeholder?: string;
  required?: boolean;
  title?: string;
  type?: InputType;
}

const Input = ({
  label,
  name,
  id,
  minlength,
  maxlength,
  noResize,
  placeholder,
  required,
  title,
  type,
}: InputProps): JSX.Element => {
  const attrs = {
    ...(!!id ? { id } : {}),
    ...(!!required ? { required: "true" } : {}),
    ...(maxlength !== undefined ? { maxlength: `${maxlength}` } : {}),
    ...(minlength !== undefined ? { minlength: `${minlength}` } : {}),
    ...(placeholder !== undefined ? { placeholder } : {}),
    ...(title !== undefined ? { title } : {}),
  };

  const textareaLengthId = `${name}-${type}-current-length`;

  const bottomLegendClasses = maxlength ? "relative pb-3" : "";

  return (
    <fieldset class={`${fieldClasses} ${bottomLegendClasses}`}>
      <legend class={`${legendClasses} ${required ? requiredClasses : ""}`}>
        {label}
      </legend>
      {type === "textarea" ? (
        <textarea
          class={`h-[15rem] ${inputClasses} ${noResize ? "resize-none" : ""}`}
          name={name}
          {...attrs}
          hx-on:keyup={`htmx.find("#${textareaLengthId}").innerHTML = this.value.length`}
        />
      ) : (
        <input
          class={inputClasses}
          type={type ?? "text"}
          name={name}
          {...attrs}
        />
      )}
      {maxlength !== undefined ? (
        <legend class={`${legendClasses} absolute -bottom-2.5 right-[4px]`}>
          <span id={textareaLengthId}>0</span>/{maxlength}
        </legend>
      ) : null}
    </fieldset>
  );
};

export default Input;
