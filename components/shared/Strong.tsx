import type { PropsWithChildren } from "beth-stack/jsx";

const Strong = ({ children }: PropsWithChildren) => (
  <strong class="font-bold text-white">
    {children}
  </strong>
);

export default Strong;
