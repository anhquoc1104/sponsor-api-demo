export const TYPE_MONGODB = {
  MISSING: {
    KEY: 'missing',
    NUMBER: 0,
  },
  STRING: {
    KEY: 'string',
    NUMBER: 2,
  },
  DOUBLE: {
    KEY: 'double',
    NUMBER: 1,
  },
  INTERGER_32_BIT: {
    KEY: 'int',
    NUMBER: 16,
  },
  INTERGER_64_BIT: {
    KEY: 'long',
    NUMBER: 18,
  },
  DECIMAL_128: {
    KEY: 'decimal',
    NUMBER: 10,
  },
  BOOLEAN: {
    KEY: 'bool',
    NUMBER: 8,
  },
  DATE: {
    KEY: 'date',
    NUMBER: 9,
  },
  TIMESTAMP: {
    KEY: 'timestamp',
    NUMBER: 17,
  },
  OBJECT: {
    KEY: 'object',
    NUMBER: 3,
  },
  ARRAY: {
    KEY: 'array',
    NUMBER: 4,
  },
  OBJECTID: {
    KEY: 'objectId',
    NUMBER: 7,
  },
  NULL: {
    KEY: 'null',
    NUMBER: 10,
  },
  REGULAR_EXPRESSION: {
    KEY: 'regex',
    NUMBER: 11,
  },
  BINARY_DATA: {
    KEY: 'binData',
    NUMBER: 5,
  },
  JAVASCRIPT: {
    KEY: 'javascript',
    NUMBER: 13,
  },
  MIN_KEY: {
    KEY: 'minKey',
    NUMBER: -1,
  },
  MAX_KEY: {
    KEY: 'maxKey',
    NUMBER: 127,
  },
  // UNDEFINED: {  // Deprecated
  //   KEY: "undefined",
  //   NUMBER: 6,
  // },
  // DBPOINTER: {// Deprecated
  //   KEY: "dbPointer",
  //   NUMBER: 12,
  // },
  // SYMBOL: { // Deprecated
  //   KEY: "symbol",
  //   NUMBER: 14,
  // },
  // JAVASCRIPT_CODE_WITH_SCOPE: { // Deprecated in MongoDB 4.4
  //   KEY: "javascriptWithScope",
  //   NUMBER: 15,
  // },
};
