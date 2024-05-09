import { BasePage } from "../../pages";
import { Button, Link } from "../../shared";

const NotFound = () => (
  <BasePage>
    <div class="text-secondary-text mt-3 text-center">
      <div class="text-2xl font-bold">Page Not Found</div>
      <div>{`The page you navigated to could not be found. 
        Please use the navigation bar to get back to safety.`}</div>
      <Link href="/">
        <div class="mt-4">
          <Button>{"Go back to safety"}</Button>
        </div>
      </Link>
    </div>
  </BasePage>
);

export default NotFound;
