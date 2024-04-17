type InputType = "email" | "text" | "textarea";

const focusClasses =
  "focus:outline-none focus:ring-1 focus:ring-secondary-text focus:invalid:ring-red-400";

const inputClasses =
  "border border-secondary-text rounded placeholder-primary-text invalid:border-red-400";

const requiredClasses = "after:content-['*'] after:ml-1 after:text-red-400";

const labelClasses = "absolute px-1 text-sm leading-3 ";

interface InputProps {
  label: string;
  minlength?: number;
  maxlength?: number;
  noResize?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  type?: InputType;
}

const Input = ({
  label,
  minlength,
  maxlength,
  noResize,
  placeholder,
  required,
  rows,
  type,
}: InputProps) => (
  <label class="*:text-secondary-text *:bg-primary-bg relative inline-block">
    <div
      class={`${labelClasses} -top-2 left-2 ${required ? requiredClasses : ""}`}
    >
      {label}
    </div>
    {maxlength !== undefined ? (
      <div class={`${labelClasses} -bottom-2 right-2`}>{`?/${maxlength}`}</div>
    ) : null}
    {type === "textarea" ? (
      <textarea
        class={`w-full scroll-p-3 p-3 ${inputClasses} ${focusClasses} ${noResize ? "resize-none" : ""}`}
        placeholder={placeholder || ""}
        {...(maxlength !== undefined ? { maxlength: `${maxlength}` } : {})}
        {...(minlength !== undefined ? { minlength: `${minlength}` } : {})}
        {...(required ? { required: "true" } : {})}
        {...(rows !== undefined ? { rows: `${rows}` } : {})}
      />
    ) : (
      <input
        class={`w-full p-3 ${inputClasses} ${focusClasses}`}
        type={type || "text"}
        placeholder={placeholder || ""}
        {...(required ? { required: "true" } : {})}
      />
    )}
  </label>
);

export default Input;
