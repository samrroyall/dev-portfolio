import { BasePage } from "../../pages";

const NotFound = () => (
  <BasePage>
    <div class="text-secondary-text text-center">
      <div class="text-2xl font-bold">Page Not Found</div>
      {`The page you navigated to could not be found. 
        Please use the navigation bar to get back to safety.`}
    </div>
  </BasePage>
);

export default NotFound;
