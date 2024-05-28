import { getHxAttrsFromProps } from "../../models/components";
import { type HtmxAttributes } from "../../types";

type InputType =
  | "email"
  | "hidden"
  | "number"
  | "password"
  | "text"
  | "textarea";

const standardBorderClasses =
  "border border-secondary-text dark:border-secondary-text-dark rounded";

const focusBorderClasses =
  "has-[:focus]:outline-none has-[:focus]:ring-1 has-[:focus]:ring-secondary-text has-[:focus]:dark:ring-secondary-text";

const invalidBorderClasses =
  "has-[:invalid]:border-error-text has-[:invalid]:ring-error-text has-[:focus:invalid]:ring-error-text";

const bgClasses = "*:bg-primary-bg *:dark:bg-primary-bg-dark";

const borderClasses = `${standardBorderClasses} ${focusBorderClasses} ${invalidBorderClasses}`;

const textClasses = "*:text-secondary-text dark:*:text-secondary-text-dark";

const fieldClasses = `my-3 p-1 ${bgClasses} ${borderClasses} ${textClasses}`;

const noBorderClasses = `border-0 ring-0 outline-none`;

const placeholderClasses = `placeholder-primary-text dark:placeholder-primary-text-dark text`;

const disabledClasses =
  "disabled:text-secondary-bg disabled:dark:text-secondary-bg-dark";

const inputClasses = `bg-transparent w-full p-1 ${noBorderClasses} ${placeholderClasses} ${disabledClasses}`;

const legendClasses = "px-1 text-sm";

const requiredClasses = "after:content-['*'] after:ml-1 after:text-error-text";

interface InputProps extends HtmxAttributes {
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  minlength?: number;
  maxlength?: number;
  noResize?: boolean;
  placeholder?: string;
  required?: boolean;
  title?: string;
  type?: InputType;
  value?: string;
}

const Input = (props: InputProps): JSX.Element => {
  const {
    className,
    disabled,
    id,
    label,
    minlength,
    maxlength,
    name,
    noResize,
    placeholder,
    required,
    title,
    type,
    value,
  } = props;

  const attrs = {
    ...(!!id ? { id } : {}),
    ...(!!required ? { required: true } : {}),
    ...(maxlength !== undefined ? { maxlength: `${maxlength}` } : {}),
    ...(minlength !== undefined ? { minlength: `${minlength}` } : {}),
    ...(placeholder !== undefined ? { placeholder } : {}),
    ...(title !== undefined ? { title } : {}),
  };

  const textareaLengthId = `${name}-${type}-current-length`;

  const updateCharCountFunc = `htmx.find("#${textareaLengthId}").innerHTML = this.value.length`;

  const hxAttrs = getHxAttrsFromProps(props);

  if (maxlength !== undefined) {
    const hxOnKeyupVal = hxAttrs["hx-on-keyup"];

    if (!!hxOnKeyupVal) {
      hxAttrs["hx-on-keyup"] +=
        `${hxOnKeyupVal.endsWith(";") ? "" : ";"} ${updateCharCountFunc})`;
    } else {
      hxAttrs["hx-on-keyup"] = updateCharCountFunc;
    }
  }

  const bottomLegendClasses = maxlength ? "relative pb-3" : "";

  const hiddenClasses = type === "hidden" ? "hidden" : "";

  return (
    <fieldset
      class={`${fieldClasses} ${bottomLegendClasses} ${hiddenClasses} ${className ?? ""}`}
    >
      <legend class={`${legendClasses} ${required ? requiredClasses : ""}`}>
        {label}
      </legend>
      {type === "textarea" ? (
        <textarea
          class={`h-[15rem] ${inputClasses} ${noResize ? "resize-none" : ""}`}
          name={name}
          {...attrs}
          {...hxAttrs}
        >
          {value ?? ""}
        </textarea>
      ) : (
        <input
          class={inputClasses}
          type={type ?? "text"}
          name={name}
          value={value ?? ""}
          disabled={disabled ?? false}
          {...attrs}
          {...hxAttrs}
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
