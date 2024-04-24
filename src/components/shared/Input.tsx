type InputType = "email" | "text" | "textarea";

const focusClasses =
  "focus:outline-none focus:ring-1 focus:ring-secondary-text focus:invalid:ring-red-400";

const standardClasses =
  "border border-secondary-text rounded placeholder-primary-text invalid:border-red-400 invalid:ring-red-400";

const inputClasses = `${standardClasses} ${focusClasses}`;

const requiredClasses = "after:content-['*'] after:ml-1 after:text-red-400";

const labelClasses = "absolute px-1 text-sm leading-3";

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
}: InputProps) => {
  const attrs = {
    ...(id !== undefined ? { id } : {}),
    ...(maxlength !== undefined ? { maxlength: `${maxlength}` } : {}),
    ...(minlength !== undefined ? { minlength: `${minlength}` } : {}),
    ...(required ? { required: "true" } : {}),
  };

  const textareaLengthId = `${name}-${type}-current-length`;

  return (
    <fieldset class="*:text-secondary-text *:bg-primary-bg relative my-3 inline-block">
      <legend
        class={`${labelClasses} -top-2.5 left-2 ${required ? requiredClasses : ""}`}
      >
        {label}
      </legend>
      {type === "textarea" ? (
        <textarea
          class={`h-[15rem] w-full p-3 ${inputClasses} ${noResize ? "resize-none" : ""}`}
          placeholder={placeholder || ""}
          title={title || ""}
          {...attrs}
          hx-on:keyup={`htmx.find("#${textareaLengthId}").innerHTML = this.value.length`}
        />
      ) : (
        <input
          class={`w-full p-3 ${inputClasses}`}
          type={type || "text"}
          placeholder={placeholder || ""}
          title={title || ""}
          {...attrs}
        />
      )}
      {maxlength !== undefined ? (
        <legend class={`${labelClasses} -bottom-2.5 right-2`}>
          <span id={textareaLengthId}>0</span>/{maxlength}
        </legend>
      ) : null}
    </fieldset>
  );
};

export default Input;
