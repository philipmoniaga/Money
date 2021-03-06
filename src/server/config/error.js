import { fetchrHandler } from "../middlewares/fetchr";
import { errorHandler } from "../middlewares/error";

/**
 * Setup error handlers for server application
 * @param {Express} app
 */
export default function(app) {
  app.use(fetchrHandler);
  app.use(errorHandler);
}
