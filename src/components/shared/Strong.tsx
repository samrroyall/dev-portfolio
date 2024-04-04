import { type PropsWithChildren } from "beth-stack/jsx";

const Strong = ({ children }: PropsWithChildren) => (
  <strong class="font-bold text-secondary-text">{children}</strong>
);

export default Strong;
