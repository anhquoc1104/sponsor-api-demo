// Removes 'readonly' attributes from a type's properties
export type TMutable<Type> = {
  [Property in keyof Type]: Type[Property];
};
// Removes 'optional' attributes from a type's properties
type TOptionalException<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
