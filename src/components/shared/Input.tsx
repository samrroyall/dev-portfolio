type InputType = "email" | "text" | "textarea";

const standardBorderClasses = "border border-secondary-text rounded";

const focusBorderClasses =
  "has-[:focus]:outline-none has-[:focus]:ring-1 has-[:focus]:ring-secondary-text";

const invalidBorderClasses =
  "has-[:invalid]:border-red-400 has-[:invalid]:ring-red-400 has-[:focus:invalid]:ring-red-400";

const borderClasses = `${standardBorderClasses} ${focusBorderClasses} ${invalidBorderClasses}`;

const fieldClasses = `*:text-secondary-text *:bg-primary-bg my-3 inline-block p-1 ${borderClasses}`;

const noBorderClasses = `border-0 ring-0 outline-none`;

const inputClasses = `placeholder-primary-text w-full p-1 ${noBorderClasses}`;

const legendClasses = "px-1 text-sm";

const requiredClasses = "after:content-['*'] after:ml-1 after:text-red-400";

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

  const bottomLegendClasses = maxlength ? "relative pb-3" : "";

  return (
    <fieldset class={`${fieldClasses} ${bottomLegendClasses}`}>
      <legend class={`${legendClasses} ${required ? requiredClasses : ""}`}>
        {label}
      </legend>
      {type === "textarea" ? (
        <textarea
          class={`h-[15rem] ${inputClasses} ${noResize ? "resize-none" : ""}`}
          placeholder={placeholder || ""}
          title={title || ""}
          {...attrs}
          hx-on:keyup={`htmx.find("#${textareaLengthId}").innerHTML = this.value.length`}
        />
      ) : (
        <input
          class={inputClasses}
          type={type || "text"}
          placeholder={placeholder || ""}
          title={title || ""}
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
