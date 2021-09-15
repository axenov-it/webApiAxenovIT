import routes from "config/routes";
import { validate, ValidationError } from "express-validation";

export default async function (Router) {
  for (const route of routes) {
    const controller = await import(`controllers/${route.name}`);

    if (!controller)
      console.log("\x1b[31m", `CONTROLLER ${route.name} IS NOT EXISTS`);

    for (const action of route.actions) {
      if (!controller[action.name])
        console.log(
          "\x1b[31m",
          `ACTION ${action.name} IS NOT EXISTS IN CONTROLLER ${route.name}`
        );

      if (action.validator) {
        const validator = await import(`validators/${action.validator}`);

        Router[action.type](
          action.path,
          validate(validator["default"], {}, {}),
          controller[action.name]
        );
      } else {
        Router[action.type](action.path, controller[action.name]);
      }
    }
  }

  Router.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      console.log(err);
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  });

  return Router;
}
