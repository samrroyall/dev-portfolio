import { type PropsWithChildren } from "beth-stack/jsx";

const Strong = ({ children }: PropsWithChildren) => (
  <strong class="text-secondary-text font-bold">{children}</strong>
);

export default Strong;
