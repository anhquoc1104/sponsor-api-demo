import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'atLeastUpperCase', async: false })
export class AtLeastUpperCase implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return text?.toString().match(/[A-Z]/) ? true : false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'contain at least 1 upper case letter';
  }
}

@ValidatorConstraint({ name: 'atLeastLowerCase', async: false })
export class AtLeastLowerCase implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return text?.toString().match(/[a-z]/) ? true : false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'contain at least 1 lowser case letter';
  }
}

@ValidatorConstraint({ name: 'atLeastSpecialCharater', async: false })
export class AtLeastSpecialCharater implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return text?.toString().match(/\W/) ? true : false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'contain at least 1 special letter';
  }
}

@ValidatorConstraint({ name: 'atLeastNumber', async: false })
export class AtLeastNumber implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return text?.toString().match(/[0-9]/) ? true : false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'contain at least 1 number';
  }
}

@ValidatorConstraint({ name: 'verifyConfirmPassword', async: false })
export class VerifyConfirmPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return password !== (args.object as any)[args.constraints[0]]
      ? false
      : true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match!';
  }
}

@ValidatorConstraint({ name: 'verifyConfirmPassword', async: false })
export class VerifyForgotField implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return password !== (args.object as any)[args.constraints[0]]
      ? false
      : true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match!';
  }
}
