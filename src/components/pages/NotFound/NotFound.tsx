import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Button, Heading, Link } from "../../shared";

const NotFound = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme}>
    <Heading variant={1} text="Page Not Found" className="text-center" />
    <div class="text-secondary-text dark:text-secondary-text-dark mt-3 text-center">
      <div>{`The page you navigated to could not be found. 
        Please use the navigation bar to get back to safety.`}</div>
      <Link href="/" target="_self">
        <div class="mt-4">
          <Button label="Go back to safety" />
        </div>
      </Link>
    </div>
  </BasePage>
);

export default NotFound;
