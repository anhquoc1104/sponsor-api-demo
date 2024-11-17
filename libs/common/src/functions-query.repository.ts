import * as moment from 'moment';
import { ENUM_DATE_TIME, TYPE_MONGODB } from './enums';

const numberTypeInMongoDB = [
  TYPE_MONGODB.INTERGER_32_BIT.KEY,
  TYPE_MONGODB.INTERGER_64_BIT.KEY,
  TYPE_MONGODB.DOUBLE.KEY,
  TYPE_MONGODB.DECIMAL_128.KEY,
];
const dateTypeInMongoDB = TYPE_MONGODB.DATE.KEY;

export class CommonQuery {
  static formatStartTime = (date) => {
    return new Date(
      moment(date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
        ENUM_DATE_TIME.START_OFFSET,
    );
  };

  static formatEndTime = (date) => {
    return new Date(
      moment(date).format(ENUM_DATE_TIME.YYYY_MM_DD) +
        ENUM_DATE_TIME.END_OFFSET,
    );
  };

  static mapFieldArrayInObject = (
    new_field: string,
    array_name: string,
    focus_field: string,
    option?: {
      is_union?: boolean;
    },
  ) => {
    const is_union: boolean = option.is_union || false;
    const action_reduce = is_union ? '$setUnion' : '$concatArrays';
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $isArray: `$${array_name}`,
            },
            {
              $reduce: {
                input: `$${array_name}`,
                initialValue: [],
                in: {
                  [`${action_reduce}`]: ['$$value', [`$$this.${focus_field}`]],
                },
              },
            },
            [],
          ],
        },
      },
    };
  };

  static mapFieldByConditionOfArrayInObject = (
    new_field: string,
    array_name: string,
    focus_field: string,
    condition_object: any, // ex: { $gt: ["$$this", `$$value.${forcus_field}`] }
    option: {
      is_union?: boolean;
    },
  ) => {
    const is_union: boolean = option.is_union || false;
    const action_reduce = is_union ? '$setUnion' : '$concatArrays';
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $isArray: `$${array_name}`,
            },
            {
              $reduce: {
                input: `$${array_name}`,
                initialValue: [],
                in: {
                  $cond: [
                    condition_object,
                    {
                      [`${action_reduce}`]: [
                        '$$value',
                        {
                          $cond: [
                            {
                              $ifNull: [`$$this.${focus_field}`, false],
                            },
                            [`$$this.${focus_field}`],
                            [],
                          ],
                        },
                      ],
                    },
                    '$$value',
                  ],
                },
              },
            },
            [],
          ],
        },
      },
    };
  };

  static flattenMultiArray = (
    new_field: string,
    array_name: string,
    option?: {
      is_union?: boolean;
    },
  ) => {
    const is_union: boolean = option.is_union || false;
    const action_flatten = is_union ? '$setUnion' : '$concatArrays';
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $isArray: `$${array_name}`,
            },
            {
              $reduce: {
                input: `$${array_name}`,
                initialValue: [],
                in: {
                  $cond: [
                    { $isArray: '$$this' },
                    {
                      [`${action_flatten}`]: ['$$value', '$$this'],
                    },
                    '$$value',
                  ],
                },
              },
            },
            [],
          ],
        },
      },
    };
  };

  static lengthOfArray = (array_name: string, new_field: string = '') => {
    const length_stage: any = {
      // $sum: {
      $cond: [
        {
          $isArray: `$${array_name}`,
        },
        {
          $size: `$${array_name}`,
        },
        0,
      ],
      // },
    };

    if (new_field) {
      return {
        $addFields: {
          [`${new_field}`]: length_stage,
        },
      };
    }

    return {
      $sum: length_stage,
    };
  };

  static sumValueFieldOfArrayInObject = (
    array_name: string,
    field_sum: string,
    new_field: string = '',
  ) => {
    const sum_stage: any = {
      $sum: {
        $cond: [
          {
            $isArray: `$${array_name}`,
          },
          `$${array_name}.${field_sum}`,
          0,
        ],
      },
    };

    if (new_field) {
      return {
        $addFields: {
          [`${new_field}`]: sum_stage,
        },
      };
    }

    return sum_stage;
  };

  static findMaxValueOfArrayInObject = (
    new_field: string,
    forcus_field: string,
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $max: `$${forcus_field}`,
        },
      },
    };
  };

  static findMinValueOfArrayInObject = (
    new_field: string,
    forcus_field: string,
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $min: `$${forcus_field}`,
        },
      },
    };
  };

  static sumValueByConditionOfArrayInObject = (
    array_in_object: string,
    new_field: string,
    forcus_field: string,
    init_value: any,
    condition_object: any, // { $gt: ["$$this", `$$value.${forcus_field}`] }
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $reduce: {
            input: `$${array_in_object}`,
            initialValue: init_value,
            in: {
              $cond: [
                condition_object,
                {
                  $sum: [`$$this.${forcus_field}`, '$$value'],
                },
                '$$value',
              ],
            },
          },
        },
      },
    };
  };

  static countByConditionOfArrayInObject = (
    array_in_object: string,
    new_field: string,
    as_field: string,
    condition_object: any, // type expression object
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $size: {
            $cond: [
              {
                $isArray: `$${array_in_object}`,
              },
              {
                $filter: {
                  input: `$${array_in_object}`,
                  as: `${as_field}`,
                  cond: condition_object,
                },
              },
              [],
            ],
          },
        },
      },
    };
  };

  static groupByConditionOfArrayInObject = (
    array_in_object: string,
    new_field: string,
    init_value: any,
    as_field: string = 'map_value', // map_value
    condition_object_reduce: any, //  {$gt: [{$indexOfArray: ["$$value._id", "$$this._id" ]},  -1]},
    condition_object_map: any, //   {$eq: ["$$map_value._id",  "$$this._id"]},
    return_object_map: any, //  {_id: "$$map_value._id",  quantity: { $sum: ["$$prev.quantity", "$$this.quantity" ]}},
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $reduce: {
            input: `$${array_in_object}`,
            initialValue: init_value,
            in: {
              $cond: [
                condition_object_reduce,
                {
                  $map: {
                    input: '$$value',
                    as: `${as_field}`,
                    in: {
                      $cond: [
                        condition_object_map,
                        return_object_map,
                        `$$${as_field}`,
                      ],
                    },
                  },
                },
                {
                  $concatArrays: ['$$value', ['$$this']],
                },
              ],
            },
          },
        },
      },
    };
  };

  static lookupPipelineTemplate = (
    from: string,
    letObject: any = {},
    matchExpressions: any = [],
    matchFields: any = {},
    pipelineAfterMatchs: any = [],
    as_field: string,
  ) => {
    return {
      $lookup: {
        from: `${from}`,
        let: {
          ...letObject,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [...matchExpressions],
              },
              ...matchFields,
            },
          },
          ...pipelineAfterMatchs,
        ],
        as: `${as_field}`,
      },
    };
  };

  static addField = (new_field: string, variable: string) => {
    return {
      $addFields: {
        [`${new_field}`]: `$${variable}`,
      },
    };
  };

  static addFields = (object_fields) => {
    const new_fields_object = {};
    Object.keys(object_fields)?.map((key) => {
      new_fields_object[key] = `$${object_fields[key]}`;
    });
    return {
      $addFields: new_fields_object,
    };
  };

  static addFieldsWithCondition = (object_fields) => {
    const new_fields_object = {};
    Object.keys(object_fields)?.map((key) => {
      new_fields_object[key] = object_fields[key];
    });
    return {
      $addFields: new_fields_object,
    };
  };

  static roundNumber = (
    number_field: string,
    option?: {
      round?: number;
    },
  ) => {
    const round: number = option?.round || 0;
    return {
      $cond: [
        {
          $in: [{ $type: `$${number_field}` }, numberTypeInMongoDB],
        },
        {
          $round: [`$${number_field}`, round],
        },
        `$${number_field}`,
      ],
    };
  };

  static convertNumberWithWeight = (
    convert_value: any,
    weight: number = 1,
    option?: {
      round?: number;
    },
  ) => {
    const round: number | null = option?.round || null;
    return {
      $addFields: {
        [`${convert_value}`]: {
          $cond: [
            {
              $and: [
                {
                  $in: [{ $type: `$${convert_value}` }, numberTypeInMongoDB],
                },
                {
                  $in: [{ $type: weight }, numberTypeInMongoDB],
                },
                { $ifNull: [`$${convert_value}`, false] },
              ],
            },
            {
              $cond: [
                { $ne: [round, null] },
                {
                  $round: [
                    {
                      $multiply: [`$${convert_value}`, weight],
                    },
                    round,
                  ],
                },
                { $multiply: [`$${convert_value}`, weight] },
              ],
            },
            null,
          ],
        },
      },
    };
  };

  static calculateAddTwoField = (
    new_field: string,
    number_1: any,
    number_2: any,
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $and: [
                {
                  $in: [
                    { $type: `$${number_1}` },
                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                  ],
                },
                {
                  $in: [
                    { $type: `$${number_2}` },
                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                  ],
                },
              ],
            },
            {
              $add: [`$${number_1}`, `$${number_2}`],
            },
            null,
          ],
        },
      },
    };
  };

  static calculateSubtractTwoField = (
    new_field: string,
    minus: any, // Số trừ
    subtrahend: any, // Số bị trừ
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $and: [
                {
                  $in: [
                    { $type: `$${minus}` },
                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                  ],
                },
                {
                  $in: [
                    { $type: `$${subtrahend}` },
                    [...numberTypeInMongoDB, dateTypeInMongoDB],
                  ],
                },
              ],
            },
            {
              $subtract: [`$${minus}`, `$${subtrahend}`],
            },
            null,
          ],
        },
      },
    };
  };

  static calculateAverage = (
    new_field: string,
    numerator: any, // Tử Số
    denominator: any, // Mẫu số
    option?: {
      round?: number;
    },
  ) => {
    const round: number | null = option?.round || null;
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $and: [
                {
                  $in: [{ $type: `$${numerator}` }, numberTypeInMongoDB],
                },
                {
                  $in: [{ $type: `$${denominator}` }, numberTypeInMongoDB],
                },
                { $ne: [`$${denominator}`, 0] },
              ],
            },
            {
              $cond: [
                { $ne: [round, null] },
                {
                  $round: [
                    {
                      $divide: [`$${numerator}`, { $abs: `$${denominator}` }],
                    },
                    round,
                  ],
                },
                {
                  $divide: [`$${numerator}`, { $abs: `$${denominator}` }],
                },
              ],
            },
            null,
          ],
        },
      },
    };
  };

  static calculatePercent = (
    new_field: string,
    numerator: any, // Tử Số
    denominator: any, // Mẫu số
    option?: {
      round?: number;
    },
  ) => {
    const round: number | null = option?.round || null;
    return {
      $addFields: {
        [`${new_field}`]: {
          $cond: [
            {
              $and: [
                {
                  $in: [{ $type: `$${numerator}` }, numberTypeInMongoDB],
                },
                {
                  $in: [{ $type: `$${denominator}` }, numberTypeInMongoDB],
                },
                { $ne: [`$${denominator}`, 0] },
              ],
            },
            {
              $cond: [
                { $ne: [round, null] },
                {
                  $round: [
                    {
                      $multiply: [
                        {
                          $divide: [`$${numerator}`, `$${denominator}`],
                        },
                        100,
                      ],
                    },
                    round,
                  ],
                },
                {
                  $multiply: [
                    {
                      $divide: [`$${numerator}`, `$${denominator}`],
                    },
                    100,
                  ],
                },
              ],
            },
            null,
          ],
        },
      },
    };
  };

  static setHoursToDate = (
    new_field: string,
    date_field: string,
    time_field: string,
  ) => {
    if (!date_field) date_field = '$NOW';
    const convert_date_to_string = {
      $dateToString: {
        date: `$${date_field}`,
        format: '%Y-%m-%d',
        timezone: 'Asia/Ho_Chi_Minh',
      },
    };

    return {
      $addFields: {
        [`${new_field}`]: {
          $dateFromString: {
            dateString: {
              $concat: [convert_date_to_string, 'T', `$${time_field}`],
            },
            format: '%Y-%m-%dT%H:%M:%S',
            timezone: 'Asia/Ho_Chi_Minh',
            onError: null,
            // onNull: `$${date_field}`,
          },
        },
      },
    };
  };

  static compareTwoValueToGreaterThan = (
    new_field: string,
    field_one: string,
    field_two: string,
    compare_type: string,
  ) => {
    return {
      $addFields: {
        [`${new_field}`]: {
          $switch: {
            branches: [
              {
                case: { $eq: [`${compare_type}`, 'number'] },
                then: {
                  $cond: [
                    {
                      $and: [
                        {
                          $in: [
                            {
                              $type: `$${field_one}`,
                            },
                            numberTypeInMongoDB,
                          ],
                        },
                        {
                          $in: [
                            {
                              $type: `$${field_two}`,
                            },
                            numberTypeInMongoDB,
                          ],
                        },
                        {
                          $gt: [`$${field_one}`, `$${field_two}`],
                        },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
              {
                case: { $eq: [`${compare_type}`, 'date'] },
                then: {
                  $cond: [
                    {
                      $and: [
                        {
                          $eq: [
                            {
                              $type: `$${field_one}`,
                            },
                            dateTypeInMongoDB,
                          ],
                        },
                        {
                          $eq: [
                            {
                              $type: `$${field_two}`,
                            },
                            dateTypeInMongoDB,
                          ],
                        },
                        {
                          $gt: [`$${field_one}`, `$${field_two}`],
                        },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            ],
            default: 0,
          },
        },
      },
    };
  };

  static handleFieldsEmptyBeforeLookup(handle_fields: string[]) {
    const new_fields_object = {};
    handle_fields?.map((handle_field) => {
      new_fields_object[handle_field] = {
        $cond: [
          {
            $ne: [{ $type: `$${handle_field}` }, TYPE_MONGODB.MISSING.KEY],
          },
          `$${handle_field}`,
          'STRING_PREVENT_MATCH',
        ],
      };
    });

    return {
      $addFields: new_fields_object,
    };
  }
}
