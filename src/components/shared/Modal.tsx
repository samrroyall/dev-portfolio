import Icon from "./Icon";

const containerClasses = `
  fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center
  backdrop-blur hidden
`;

const alertClasses = `
  relative border border-secondary-text dark:border-secondary-text-dark
  bg-primary-bg dark:bg-primary-bg-dark min-h-[300px] min-w-[600px] rounded
`;

const closeModalIconClasses = `
  text-secondary-text dark:text-secondary-text-dark text-xl absolute right-3 
  top-3
`;

interface ModalProps {
  children: Html.Children;
  id: string;
  className?: string;
}

const Modal = ({ children, className, id }: ModalProps) => {
  return (
    <div id={id} class={containerClasses}>
      <div class={`${alertClasses} ${className ?? ""}`}>
        <button hx-on-click={`htmx.toggleClass("#${id}", "hidden");`}>
          <Icon className={closeModalIconClasses} icon={"\udb80\udd56"} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
