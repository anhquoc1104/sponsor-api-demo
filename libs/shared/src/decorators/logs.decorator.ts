import { Logger } from '@nestjs/common';

export const FunctionNameLog = (target, name, descriptor) => {
  try {
    const className = target.constructor.name;
    const original = descriptor.value;

    descriptor.value = function (...args) {
      Logger.log(``, `${className}#${name}`);
      const result = original.apply(this, args);
      return result;
    };
  } catch (error) {
    Logger.debug(error.message);
  }
};

export const FunctionRequestLog = (target, name, descriptor) => {
  try {
    const className = target.constructor.name;
    const original = descriptor.value;

    descriptor.value = function (...args) {
      if (process.env.ENVIRONMENT != 'prod') {
        Logger.debug(
          `Request: ${JSON.stringify(args)}`,
          `${className}#${name}`,
        );
      } else {
        Logger.log(``, `${className}#${name}`);
      }
      const result = original.apply(this, args);
      // if (process.env.ENVIRONMENT != 'prod') {
      //   Logger.debug(`Response: ${JSON.stringify(result)}`, `${className}#${name}`);
      // }
      return result;
    };
  } catch (error) {
    Logger.debug(error.message);
  }
};

export const FunctionResponseLog = (target, methodName, descriptor) => {
  const className = target.constructor.name;
  const original = descriptor.value;

  descriptor.value = new Proxy(original, {
    apply: function (target, thisArg, args) {
      Logger.log(
        `Call with args: ${JSON.stringify(args)}`,
        `${className}#${methodName}`,
      );

      const result = target.apply(thisArg, args);

      Logger.log(
        `Return: ${JSON.stringify(result)}`,
        `${className}#${methodName}`,
      );
      return result;
    },
  });
};
