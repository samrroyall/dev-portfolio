import { BasePage } from "../../pages";

const NotFound = () => (
  <BasePage>
    <div class="text-center">
      <div class="text-secondary-text text-6xl font-bold">
        404: Page Not Found
      </div>
      <p class="text-lg">
        {
          "The page you navigated to could not be found. Please use the navigation bar to get back to safety."
        }
      </p>
    </div>
  </BasePage>
);

export default NotFound;
