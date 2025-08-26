// src/validators/fields/EntitiesField.ts
import { z as z18 } from "zod";

// src/validators/fields/BaseField.ts
import { z as z2 } from "zod";

// src/validators/fields/FieldConfig.ts
import { z } from "zod";
var FieldConfig = z.object({
  spektrDataField: z.string(),
  prefillDefaultValue: z.boolean().optional().default(true),
  prefillSpektrDataField: z.string().optional(),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
  defaultValue: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional()
});
var FieldUiConfig = z.object({
  style: z.object({
    width: z.string().optional()
  })
});

// src/validators/fields/BaseField.ts
var BaseField = z2.object({
  id: z2.string(),
  config: FieldConfig,
  isStructured: z2.boolean().default(false),
  ui: FieldUiConfig.optional(),
  customerFieldId: z2.string().optional()
});

// src/validators/fields/FieldValidation.ts
import { z as z3 } from "zod";
var validationTypes = ["required", "regex"];
var validationTypesEnum = z3.enum(validationTypes);
var RequiredFieldValidation = z3.object({
  type: z3.literal("required"),
  value: z3.literal(true),
  message: z3.string()
});
var RegexFieldValidation = z3.object({
  type: z3.literal("regex"),
  value: z3.any(),
  preset: z3.string().optional(),
  message: z3.string()
});
var DateFieldValidation = z3.object({
  type: z3.literal("date"),
  minimumAge: z3.number().optional(),
  maximumAge: z3.number().optional(),
  message: z3.string()
});
var FieldValidation = z3.union([
  RequiredFieldValidation,
  RegexFieldValidation,
  DateFieldValidation
]);

// src/validators/fields/InputField.ts
import { z as z4 } from "zod";
var InputFieldAttributes = z4.object({
  label: z4.string(),
  name: z4.string().optional(),
  type: z4.string().optional().default("text"),
  placeholder: z4.string().optional(),
  helperText: z4.string().optional(),
  countryField: z4.string().optional(),
  internalId: z4.string().optional()
});
var InputField = BaseField.merge(
  z4.object({
    type: z4.literal("input"),
    value: z4.string().optional(),
    attributes: InputFieldAttributes,
    validation: z4.array(FieldValidation).default([])
  })
);

// src/validators/fields/DropdownField.ts
import { z as z5 } from "zod";
var DropdownFieldAttributes = z5.object({
  label: z5.string(),
  name: z5.string().optional(),
  placeholder: z5.string().optional(),
  options: z5.array(z5.object({ value: z5.string(), label: z5.string() })),
  helperText: z5.string().optional(),
  internalId: z5.string().optional()
});
var DropdownField = BaseField.merge(
  z5.object({
    type: z5.literal("select"),
    attributes: DropdownFieldAttributes,
    validation: z5.array(FieldValidation)
  })
);
function isDropdownField(field) {
  return DropdownField.safeParse(field).success;
}

// src/validators/fields/CheckboxField.ts
import { z as z6 } from "zod";
var CheckboxFieldAttributes = z6.object({
  label: z6.string(),
  name: z6.string().optional(),
  options: z6.array(z6.string()),
  placeholder: z6.string().optional(),
  helperText: z6.string().optional(),
  internalId: z6.string().optional()
});
var CheckboxField = BaseField.merge(
  z6.object({
    type: z6.literal("radio").or(z6.literal("checkbox")).or(z6.literal("optionSwitch")),
    attributes: CheckboxFieldAttributes,
    validation: z6.array(FieldValidation)
  })
);

// src/validators/fields/FileField.ts
import { z as z7 } from "zod";
var FileFieldAttributes = z7.object({
  label: z7.string(),
  name: z7.string().optional(),
  fileType: z7.string(),
  placeholder: z7.string().optional(),
  helperText: z7.string().optional(),
  internalId: z7.string().optional()
});
var FileField = BaseField.merge(
  z7.object({
    type: z7.literal("file"),
    attributes: FileFieldAttributes,
    validation: z7.array(FieldValidation)
  })
);

// src/validators/fields/DateField.ts
import { z as z8 } from "zod";
var DateFieldAttributes = InputFieldAttributes.merge(
  z8.object({
    type: z8.literal("date"),
    format: z8.string().optional(),
    minDate: z8.string().optional(),
    maxDate: z8.string().optional()
  })
);
var DateField = InputField.merge(
  z8.object({
    attributes: DateFieldAttributes
  })
);

// src/validators/fields/CurrencyField.ts
import { z as z9 } from "zod";
var CurrencyFieldAttributes = InputFieldAttributes.merge(
  z9.object({
    type: z9.literal("currency"),
    currency: z9.object({
      symbol: z9.string(),
      code: z9.string()
    }).optional()
  })
);
var CurrencyField = InputField.merge(
  z9.object({
    attributes: CurrencyFieldAttributes
  })
);

// src/validators/fields/TitleField.ts
import { z as z10 } from "zod";
var TitleField = z10.object({
  id: z10.string(),
  ui: FieldUiConfig.optional(),
  type: z10.literal("title"),
  attributes: z10.object({
    content: z10.string()
  })
});

// src/validators/fields/ParagraphField.ts
import { z as z11 } from "zod";
var ParagraphField = z11.object({
  id: z11.string(),
  ui: FieldUiConfig.optional(),
  type: z11.literal("paragraph"),
  attributes: z11.object({
    content: z11.string()
  })
});

// src/validators/fields/DividerField.ts
import { z as z12 } from "zod";
var DividerField = z12.object({
  id: z12.string(),
  ui: FieldUiConfig.optional(),
  type: z12.literal("divider")
});

// src/validators/fields/ConsentField.ts
import { z as z13 } from "zod";
var ConsentFieldAttributes = z13.object({
  label: z13.string(),
  name: z13.string().optional(),
  internalId: z13.string().optional()
});
var ConsentField = BaseField.merge(
  z13.object({
    type: z13.literal("consent"),
    attributes: ConsentFieldAttributes,
    validation: z13.array(FieldValidation)
  })
);

// src/validators/fields/SmartField.ts
import { z as z14 } from "zod";
var SmartFieldAttributes = z14.object({
  label: z14.string(),
  name: z14.string().optional(),
  placeholder: z14.string().optional(),
  helperText: z14.string().optional(),
  internalId: z14.string().optional()
});
var SmartField = BaseField.merge(
  z14.object({
    type: z14.literal("smart"),
    value: z14.string().optional(),
    attributes: SmartFieldAttributes,
    validation: z14.array(FieldValidation).default([])
  })
);

// src/validators/fields/InformationCalloutField.ts
import { z as z15 } from "zod";
var InformationCalloutField = z15.object({
  id: z15.string(),
  ui: FieldUiConfig.optional(),
  type: z15.literal("informationCallout"),
  attributes: z15.object({
    content: z15.string()
  })
});

// src/validators/fields/FieldsGroup.ts
import { z as z16 } from "zod";
var FieldsGroup = z16.object({
  id: z16.string(),
  ui: FieldUiConfig.optional(),
  type: z16.literal("fieldsGroup")
});

// src/validators/fields/ConditionalField.ts
import { z as z17 } from "zod";
var outputTypes = ["show", "hide"];
var ConditionOutput = z17.enum(outputTypes);
var ConditionalField = BaseField.merge(
  z17.object({
    type: z17.literal("conditional"),
    validation: z17.array(FieldValidation),
    segment: z17.any(),
    // Because "Cannot access 'SegmentSchema' before initialization"
    output: ConditionOutput.optional().default("hide"),
    form: z17.object({
      fields: z17.record(
        z17.string(),
        z17.union([
          DateField,
          CurrencyField,
          InputField,
          DropdownField,
          CheckboxField,
          FileField,
          DropdownField,
          TitleField,
          ParagraphField,
          InformationCalloutField,
          FieldsGroup,
          DividerField,
          ConsentField,
          SmartField
        ])
      ),
      order: z17.array(z17.string())
    })
  })
);

// src/validators/fields/EntitiesField.ts
var EntitiesField = BaseField.merge(
  z18.object({
    type: z18.literal("entity"),
    attributes: z18.object({
      label: z18.string(),
      name: z18.string().optional(),
      helperText: z18.string().optional(),
      buttonText: z18.string(),
      labelField: z18.string().optional(),
      internalId: z18.string().optional(),
      category: z18.string().optional()
    }),
    validation: z18.array(FieldValidation).default([]),
    form: z18.object({
      fields: z18.record(
        z18.string(),
        z18.union([
          DateField,
          CurrencyField,
          InputField,
          DropdownField,
          CheckboxField,
          FileField,
          DropdownField,
          TitleField,
          ParagraphField,
          InformationCalloutField,
          FieldsGroup,
          DividerField,
          ConsentField,
          SmartField,
          ConditionalField
        ])
      ),
      order: z18.array(z18.string())
    }),
    relationType: z18.string().optional()
  })
);
function isEntitiesField(field) {
  return EntitiesField.safeParse(field).success;
}

// src/validators/fields/Field.ts
import { z as z19 } from "zod";
var LogicalField = ConditionalField;
function isLogicalField(field) {
  return LogicalField.safeParse(field).success;
}
var ReadOnlyField = z19.union([
  TitleField,
  ParagraphField,
  InformationCalloutField,
  FieldsGroup,
  DividerField
]);
var WritableField = z19.union([
  DateField,
  CurrencyField,
  InputField,
  DropdownField,
  CheckboxField,
  FileField,
  EntitiesField,
  ConsentField,
  SmartField
]);
var Field = z19.union([ReadOnlyField, WritableField, LogicalField]);

// src/lib/formEvaluation/utils/hasLogicalFields.ts
function hasLogicalFields(fields) {
  return Object.values(fields).some((field) => {
    if (isLogicalField(field)) {
      return true;
    }
    if (isEntitiesField(field)) {
      return hasLogicalFields(field.form.fields);
    }
    return false;
  });
}

// src/utils/orderFields.ts
function orderFields(fields, order) {
  const orderedFields = [];
  if (!Array.isArray(order) || order.length === 0 || !fields || Object.keys(fields).length === 0) {
    return Object.values(fields);
  }
  order.forEach((fieldId) => {
    if (fields[fieldId]) {
      orderedFields.push(fields[fieldId]);
    }
  });
  return orderedFields;
}

// src/constants/regex/range.ts
var rangeRegex = /^\[\s{0,10}(-?\d+|\w+)?\s{0,10},\s{0,10}(-?\d+|\w+)?\s{0,10}\]$/;

// src/utils/parsers/range.ts
var parseRange = (range) => {
  var _a, _b;
  const match = range == null ? void 0 : range.match(rangeRegex);
  if (!match) return ["", ""];
  const min = ((_a = match[1]) == null ? void 0 : _a.trim()) || "";
  const max = ((_b = match[2]) == null ? void 0 : _b.trim()) || "";
  return [min, max];
};

// src/utils/parsers/country.ts
import * as iso from "iso-3166-1";
var parseCountry = (countryIdentifier) => {
  if (!countryIdentifier || countryIdentifier.length < 2) return void 0;
  const identifierType = countryIdentifier.length === 2 ? "iso2" : countryIdentifier.length === 3 ? "iso3" : "name";
  let countryInfo = void 0;
  switch (identifierType) {
    case "name":
      countryInfo = iso.whereCountry(countryIdentifier);
      break;
    case "iso2":
      countryInfo = iso.whereAlpha2(countryIdentifier);
      break;
    case "iso3":
      countryInfo = iso.whereAlpha3(countryIdentifier);
      break;
  }
  if (!countryInfo) return void 0;
  return {
    isoAlpha2: countryInfo.alpha2,
    isoAlpha3: countryInfo.alpha3,
    name: countryInfo.country
  };
};

// src/utils/parsers/dates/epoch.ts
var parseEpochDate = (date) => {
  const regex = /^-?\d+$/;
  if (regex.test(date)) {
    const ms = Number(date) * 1e3;
    return new Date(ms);
  }
  return void 0;
};

// src/utils/parsers/dates/ddmmyyyy.ts
var parseDdMmYyyyDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](\d{4})$/;
  const match = date.match(regex);
  if (match) {
    const [_, dayString, monthString, yearString] = match;
    if (!dayString || !monthString || !yearString) return void 0;
    const day = parseInt(dayString);
    const month = parseInt(monthString) - 1;
    const year = parseInt(yearString);
    const utcDate = new Date(Date.UTC(year, month, day));
    if (utcDate.getFullYear() === year && utcDate.getMonth() === month && utcDate.getDate() === day) {
      return utcDate;
    }
  }
  return void 0;
};

// src/utils/parsers/dates/yyyymmdd.ts
var parseYyyyMmDdDate = (date) => {
  const regex = /^(\d{4})[-/](0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])$/;
  const match = date.match(regex);
  if (match) {
    const [_, yearString, monthString, dayString] = match;
    if (!dayString || !monthString || !yearString) return void 0;
    const year = parseInt(yearString);
    const month = parseInt(monthString) - 1;
    const day = parseInt(dayString);
    const date2 = new Date(year, month, day);
    if (date2.getFullYear() === year && date2.getMonth() === month && date2.getDate() === day) {
      return date2;
    }
  }
  return void 0;
};

// src/utils/parsers/dates/iso8601.ts
import { parseISO } from "date-fns";
var parseIso8601Date = (date) => {
  const hasTimezone = /[+-]\d\d:\d\d$|Z$/.test(date);
  const dateInUtc = hasTimezone ? date : `${date}Z`;
  const parsed = parseISO(dateInUtc);
  if (isNaN(parsed.getTime())) return void 0;
  return parsed;
};

// src/utils/parsers/dates/timestampString.ts
var parseTimestampString = (date) => {
  if (/^\d{10}$/.test(date)) {
    return new Date(parseInt(date, 10) * 1e3);
  } else if (/^\d{13}$/.test(date)) {
    return new Date(parseInt(date, 10));
  }
  return void 0;
};

// src/utils/parsers/dates/parser.ts
var parseDate = (date) => {
  const parsers = [
    parseTimestampString,
    parseDdMmYyyyDate,
    parseYyyyMmDdDate,
    parseIso8601Date,
    parseEpochDate
  ];
  for (const parser of parsers) {
    const parsed = parser(date);
    if (parsed) return parsed;
  }
  return void 0;
};
function parseDateToTimestamp(value) {
  if (typeof value === "boolean") {
    throw new Error(`Value ${value} can not be parsed to a date`);
  }
  if (typeof value === "number") {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Value ${value} can not be parsed to a date`);
    }
    return ensureMilliseconds(value);
  }
  const parsedDate = parseDate(value);
  if (parsedDate === void 0) {
    throw new Error(`Value ${value} can not be parsed to a date`);
  }
  return parsedDate.getTime();
}
function ensureMilliseconds(timestamp) {
  if (timestamp < 1e10) {
    return timestamp * 1e3;
  }
  return timestamp;
}

// src/utils/errors/RuleExecutionError.ts
var RuleExecutionError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "RuleExecutionError";
  }
};

// src/lib/predicate/utils/assertIsMatrix.ts
function assertIsMatrix(matrix) {
  if (!Array.isArray(matrix))
    throw new RuleExecutionError(
      `Rule Execution failed. Expected matrix to be of type 'array' but received '${matrix}' of type '${typeof matrix}'`
    );
  for (const row of matrix) {
    if (!Array.isArray(row))
      throw new RuleExecutionError(
        `Rule Execution failed. Expected row in matrix to be of type 'array' but received '${row}' of type '${typeof row}'`
      );
    for (const cell of row) {
      if (typeof cell !== "string")
        throw new RuleExecutionError(
          `Rule Execution failed. Expected cell in matrix row to be of type 'string' but received '${cell}' of type '${typeof cell}'`
        );
    }
  }
}

// src/utils/epochOrTodayToEpoch.ts
function epochOrTodayToEpoch(epochOrToday) {
  if (epochOrToday === "@today") {
    return (/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0);
  } else {
    return new Date(Number(epochOrToday)).setUTCHours(0, 0, 0, 0);
  }
}

// src/validators/rules/predicate.ts
import { z as z21 } from "zod";

// src/validators/fieldType.ts
import { z as z20 } from "zod";
var SpektrFieldType = z20.enum([
  "string",
  "number",
  "date",
  "country",
  "boolean",
  "file",
  "matrix"
]);

// src/validators/rules/predicate.ts
var booleanPredicateSchema = z21.object({
  operator: z21.enum(["and", "or"]),
  groupRoot: z21.boolean().optional(),
  type: SpektrFieldType,
  left: z21.lazy(() => predicateSchema),
  right: z21.lazy(() => predicateSchema),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var equalityPredicateSchema = z21.object({
  operator: z21.enum(["equals", "not_equals"]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.union([z21.string(), z21.number(), z21.boolean()]),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var inequalityPredicateSchema = z21.object({
  operator: z21.enum(["greater_than", "less_than"]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.string().or(z21.number()),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var rangePredicateSchema = z21.object({
  operator: z21.enum(["between", "outside"]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.string().regex(rangeRegex),
  rightLowerboundMode: z21.enum(["literal", "variable"]).default("literal").optional(),
  rightUpperboundMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var IsRelativeToDatePositions = {
  THIS: "this",
  NEXT: "next",
  PAST: "past"
};
var IsRelativeToDateScopes = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year"
};
var datePositionSchema = z21.enum([
  IsRelativeToDatePositions.THIS,
  IsRelativeToDatePositions.NEXT,
  IsRelativeToDatePositions.PAST
]);
var dateScopeSchema = z21.enum([
  IsRelativeToDateScopes.DAY,
  IsRelativeToDateScopes.WEEK,
  IsRelativeToDateScopes.MONTH,
  IsRelativeToDateScopes.YEAR
]);
var dateAfterBeforeSchema = z21.object({
  operator: z21.enum([
    "is_after",
    "is_before",
    "is_on_or_after",
    "is_on_or_before"
  ]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.string().or(z21.number()),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var dateRelativeToTodaySchema = z21.object({
  operator: z21.literal("is_relative_to_today"),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.string().or(z21.number()).optional(),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional(),
  isRelativeConfig: z21.object({
    position: datePositionSchema,
    scope: dateScopeSchema,
    quantity: z21.number()
  })
});
var dateComparisonPredicateSchema = z21.discriminatedUnion("operator", [
  dateAfterBeforeSchema,
  dateRelativeToTodaySchema
]);
var existencePredicateSchema = z21.object({
  operator: z21.enum(["is_empty", "is_not_empty"]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.undefined().optional()
});
var matrixPredicateSchema = z21.object({
  operator: z21.enum(["is_in", "is_not_in"]),
  type: z21.literal("matrix"),
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.array(z21.array(z21.string()))
});
var noOpPredicateSchema = z21.object({
  operator: z21.literal("noOp"),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.undefined(),
  right: z21.undefined()
});
var containsPredicateSchema = z21.object({
  operator: z21.enum(["contains", "not_contains"]),
  type: SpektrFieldType,
  groupRoot: z21.boolean().optional(),
  left: z21.string(),
  right: z21.union([z21.string(), z21.array(z21.string())]),
  rightMode: z21.enum(["literal", "variable"]).default("literal").optional()
});
var predicateSchema = z21.union([
  booleanPredicateSchema,
  equalityPredicateSchema,
  inequalityPredicateSchema,
  rangePredicateSchema,
  dateComparisonPredicateSchema,
  existencePredicateSchema,
  matrixPredicateSchema,
  noOpPredicateSchema,
  containsPredicateSchema
]);

// src/lib/predicate/utils/calculateDayPeriod.ts
var calculateDayPeriod = (today, position, quantity = 1) => {
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  if (position === IsRelativeToDatePositions.THIS) {
    return {
      start: today.getTime(),
      end: today.getTime()
    };
  } else if (position === IsRelativeToDatePositions.PAST) {
    const pastDayStart = new Date(
      Date.UTC(todayYear, todayMonth, todayDate - quantity)
    );
    const pastDayEnd = new Date(Date.UTC(todayYear, todayMonth, todayDate - 1));
    return {
      start: pastDayStart.getTime(),
      end: pastDayEnd.getTime()
    };
  } else if (position === IsRelativeToDatePositions.NEXT) {
    const nextDayStart = new Date(
      Date.UTC(todayYear, todayMonth, todayDate + 1)
    );
    const nextDayEnd = new Date(
      Date.UTC(todayYear, todayMonth, todayDate + quantity)
    );
    return {
      start: nextDayStart.getTime(),
      end: nextDayEnd.getTime()
    };
  }
  throw new Error(`Unsupported position: ${position}`);
};

// src/lib/predicate/utils/calculateMonthPeriod.ts
var calculateMonthPeriod = (today, position, quantity = 1) => {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  let startMonthOffset = 0;
  let endMonthOffset = 0;
  const startDay = 1;
  const endDay = 0;
  if (position === IsRelativeToDatePositions.THIS) {
    startMonthOffset = 0;
    endMonthOffset = 1;
  } else if (position === IsRelativeToDatePositions.PAST) {
    startMonthOffset = -quantity;
    endMonthOffset = 0;
  } else if (position === IsRelativeToDatePositions.NEXT) {
    startMonthOffset = 1;
    endMonthOffset = quantity + 1;
  } else {
    throw new Error(`Unsupported position: ${position}`);
  }
  const start = new Date(
    Date.UTC(currentYear, currentMonth + startMonthOffset, startDay)
  ).getTime();
  const end = new Date(
    Date.UTC(currentYear, currentMonth + endMonthOffset, endDay)
  ).getTime();
  return { start, end };
};

// src/lib/predicate/utils/calculateWeekPeriod.ts
var calculateWeekPeriod = (today, position, quantity = 1) => {
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const currentDay = today.getDay();
  const sunOfWeek = todayDate - currentDay;
  let startOffset = 0;
  let endOffset = 0;
  if (position === IsRelativeToDatePositions.THIS) {
    startOffset = 0;
    endOffset = 6;
  } else if (position === IsRelativeToDatePositions.PAST) {
    startOffset = -7 * quantity;
    endOffset = -1;
  } else if (position === IsRelativeToDatePositions.NEXT) {
    startOffset = 7;
    endOffset = 7 * quantity + 6;
  } else {
    throw new Error(`Unsupported position: ${position}`);
  }
  const start = new Date(
    Date.UTC(todayYear, todayMonth, sunOfWeek + startOffset)
  ).getTime();
  const end = new Date(
    Date.UTC(todayYear, todayMonth, sunOfWeek + endOffset)
  ).getTime();
  return { start, end };
};

// src/lib/predicate/utils/calculateYearPeriod.ts
var calculateYearPeriod = (today, position, quantity = 1) => {
  const currentYear = today.getFullYear();
  let startYearOffset = 0;
  let endYearOffset = 0;
  if (position === IsRelativeToDatePositions.THIS) {
    startYearOffset = 0;
    endYearOffset = 0;
  } else if (position === IsRelativeToDatePositions.PAST) {
    startYearOffset = -quantity;
    endYearOffset = -1;
  } else if (position === IsRelativeToDatePositions.NEXT) {
    startYearOffset = 1;
    endYearOffset = quantity;
  } else {
    throw new Error(`Unsupported position: ${position}`);
  }
  const start = new Date(
    Date.UTC(currentYear + startYearOffset, 0, 1)
  ).getTime();
  const end = new Date(Date.UTC(currentYear + endYearOffset, 11, 31)).getTime();
  return { start, end };
};

// src/lib/predicate/utils/calculateRelativePeriod.ts
var calculateRelativePeriod = (position, scope, quantity = 1) => {
  if (quantity <= 0) {
    quantity = 1;
  }
  const now = /* @__PURE__ */ new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  switch (scope) {
    case IsRelativeToDateScopes.DAY:
      return calculateDayPeriod(today, position, quantity);
    case IsRelativeToDateScopes.WEEK:
      return calculateWeekPeriod(today, position, quantity);
    case IsRelativeToDateScopes.MONTH:
      return calculateMonthPeriod(today, position, quantity);
    case IsRelativeToDateScopes.YEAR:
      return calculateYearPeriod(today, position, quantity);
    default:
      throw new Error(`Unsupported time scope: ${scope}`);
  }
};

// src/lib/predicate/utils/isDateInRelativePeriod.ts
var isDateInRelativePeriod = (dateEpoch, config) => {
  const { position, scope, quantity = 1 } = config;
  const { start, end } = calculateRelativePeriod(position, scope, quantity);
  const date = new Date(dateEpoch);
  const normalizedDate = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return normalizedDate >= start && normalizedDate <= end;
};

// src/lib/predicate/utils/dateCompareAgainst.ts
var dateCompareAgainst = (leftEpoch) => {
  leftEpoch = new Date(leftEpoch).setUTCHours(0, 0, 0, 0);
  const isSameDate = (rightEpochOrToday) => {
    const rightEpoch = epochOrTodayToEpoch(rightEpochOrToday);
    return leftEpoch === rightEpoch;
  };
  const isAfterDate = (rightEpochOrToday) => {
    const rightEpoch = epochOrTodayToEpoch(rightEpochOrToday);
    return leftEpoch > rightEpoch;
  };
  const isBeforeDate = (rightEpochOrToday) => {
    const rightEpoch = epochOrTodayToEpoch(rightEpochOrToday);
    return leftEpoch < rightEpoch;
  };
  const isOnOrBeforeDate = (rightEpochOrToday) => {
    const rightEpoch = epochOrTodayToEpoch(rightEpochOrToday);
    return leftEpoch <= rightEpoch;
  };
  const isOnOrAfterDate = (rightEpochOrToday) => {
    const rightEpoch = epochOrTodayToEpoch(rightEpochOrToday);
    return leftEpoch >= rightEpoch;
  };
  const isInRelativePeriod = (isRelativeConfig) => {
    return isDateInRelativePeriod(leftEpoch, isRelativeConfig);
  };
  return {
    isSameDate,
    isAfterDate,
    isBeforeDate,
    isOnOrBeforeDate,
    isOnOrAfterDate,
    isInRelativePeriod
  };
};

// src/lib/predicate/utils/getRights.ts
var getRights = (predicate, subs) => {
  var _a;
  switch (predicate.operator) {
    case "noOp":
      return void 0;
    case "is_empty":
    case "is_not_empty":
      return void 0;
    case "between":
    case "outside": {
      let [min, max] = parseRange(
        predicate.right
      );
      if (predicate.rightLowerboundMode === "variable") {
        min = Number(subs[String(min)]);
      }
      if (predicate.rightUpperboundMode === "variable") {
        max = Number(subs[String(max)]);
      }
      return [Number(min), Number(max)];
    }
    case "is_in":
    case "is_not_in":
      return predicate.right;
    case "is_relative_to_today":
      return void 0;
    case "is_after":
    case "is_before":
    case "is_on_or_after":
    case "is_on_or_before":
    case "equals":
    case "not_equals":
    case "less_than":
    case "greater_than":
    case "and":
    case "or": {
      if (typeof predicate.right === "object")
        throw new RuleExecutionError(
          `Rule Execution failed for operator '${predicate.operator}' with right-hand value: ${JSON.stringify(predicate.right)}`
        );
      const right = predicate.rightMode === "variable" ? subs[String(predicate.right)] : predicate.right;
      return right != null ? right : void 0;
    }
    case "contains":
    case "not_contains":
      if (Array.isArray(predicate.right)) {
        return predicate.right;
      }
      if (predicate.rightMode === "variable") {
        return (_a = subs[String(predicate.right)]) != null ? _a : void 0;
      }
      return predicate.right;
  }
};

// src/lib/predicate/executePredicate.ts
function executePredicate(predicate, leftSubs, rightSubs) {
  if (predicate.operator === "noOp") {
    return true;
  }
  if (predicate.operator === "and") {
    const leftEvaluated = executePredicate(predicate.left, leftSubs, rightSubs);
    const rightEvaluated = executePredicate(
      predicate.right,
      leftSubs,
      rightSubs
    );
    return leftEvaluated && rightEvaluated;
  }
  if (predicate.operator === "or") {
    const leftEvaluated = executePredicate(predicate.left, leftSubs, rightSubs);
    const rightEvaluated = executePredicate(
      predicate.right,
      leftSubs,
      rightSubs
    );
    return leftEvaluated || rightEvaluated;
  }
  if (typeof predicate.left !== "string")
    throw new RuleExecutionError(
      `Rule Execution failed. Left operand of leaf rule must be of type string but received left operand '${predicate.left}' of type '${typeof predicate.left}'`
    );
  const left = leftSubs[predicate.left];
  if (left === void 0 && predicate.operator !== "is_empty") return false;
  const rights = getRights(predicate, rightSubs);
  if (predicate.type === "date" && predicate.operator !== "is_empty" && predicate.operator !== "is_not_empty" && (typeof rights === "number" || typeof rights === "string")) {
    if (!left)
      throw new RuleExecutionError(
        `Rule Execution failed. Left operand of a date-rule with operator '${predicate.operator}' cannot be empty.'`
      );
    const leftEpoch = parseDateToTimestamp(left);
    const spektrFieldDate = dateCompareAgainst(leftEpoch);
    if (predicate.operator === "is_after") {
      return spektrFieldDate.isAfterDate(rights);
    }
    if (predicate.operator === "is_before") {
      return spektrFieldDate.isBeforeDate(rights);
    }
    if (predicate.operator === "equals") {
      return spektrFieldDate.isSameDate(rights);
    }
    if (predicate.operator === "not_equals") {
      return !spektrFieldDate.isSameDate(rights);
    }
    if (predicate.operator === "is_on_or_before") {
      return spektrFieldDate.isOnOrBeforeDate(rights);
    }
    if (predicate.operator === "is_on_or_after") {
      return spektrFieldDate.isOnOrAfterDate(rights);
    }
  }
  if (predicate.operator === "is_empty") {
    return left === null || left === void 0;
  }
  if (predicate.operator === "is_not_empty") {
    return left !== null || left === void 0;
  }
  if (predicate.type === "date" && predicate.operator === "is_relative_to_today") {
    if (!left || !predicate.isRelativeConfig)
      throw new RuleExecutionError(
        `Rule Execution failed. Left operand and/or isRelativeConfig cannot be empty.`
      );
    const leftEpoch = parseDateToTimestamp(left);
    const spektrFieldDate = dateCompareAgainst(leftEpoch);
    return spektrFieldDate.isInRelativePeriod(predicate.isRelativeConfig);
  }
  if (predicate.type === "country" && Array.isArray(rights)) {
    const leftCountry = parseCountry(String(left));
    if (leftCountry) {
      const match = rights.some((right) => {
        const rightCountry = parseCountry(String(right));
        return leftCountry.isoAlpha2 === (rightCountry == null ? void 0 : rightCountry.isoAlpha2) || leftCountry.name === (rightCountry == null ? void 0 : rightCountry.name);
      });
      if (predicate.operator === "contains") return match;
      if (predicate.operator === "not_contains") return !match;
    }
  }
  if (predicate.operator === "contains" && Array.isArray(rights)) {
    let arrayLeft;
    try {
      arrayLeft = JSON.parse(String(left));
    } catch (_e) {
      arrayLeft = [left];
    }
    if (Array.isArray(arrayLeft)) {
      if (arrayLeft.length === 0) return false;
      const rightsSet = new Set(
        rights.map(
          (right) => typeof right === "string" ? right.toLowerCase() : right
        )
      );
      return arrayLeft.some((leftItem) => {
        if (typeof leftItem !== "string") {
          throw new RuleExecutionError(
            `Rule Execution failed. Left operand of a contains-rule must be of type string but received '${leftItem}' of type '${typeof leftItem}'`
          );
        }
        return rightsSet.has(leftItem.toLowerCase());
      });
    }
  }
  if (predicate.operator === "not_contains" && Array.isArray(rights)) {
    let arrayLeft;
    try {
      arrayLeft = JSON.parse(String(left));
    } catch (_e) {
      arrayLeft = [left];
    }
    if (Array.isArray(arrayLeft)) {
      if (arrayLeft.length === 0) return true;
      const rightsSet = new Set(
        rights.map(
          (right) => typeof right === "string" ? right.toLowerCase() : right
        )
      );
      return arrayLeft.every((leftItem) => {
        if (typeof leftItem !== "string") {
          throw new RuleExecutionError(
            `Rule Execution failed. Left operand of a not_contains-rule must be of type string but received '${leftItem}' of type '${typeof leftItem}'`
          );
        }
        return !rightsSet.has(leftItem.toLowerCase());
      });
    }
  }
  if (predicate.operator === "contains" && typeof rights === "string") {
    try {
      const parsedLeft = JSON.parse(String(left));
      if (Array.isArray(parsedLeft)) {
        throw new RuleExecutionError(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
      }
    } catch (_e) {
    }
    return !!(left == null ? void 0 : left.toLocaleString().toLowerCase().includes(rights.toLowerCase()));
  }
  if (predicate.operator === "not_contains" && typeof rights === "string") {
    try {
      const parsedLeft = JSON.parse(String(left));
      if (Array.isArray(parsedLeft)) {
        throw new RuleExecutionError(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
      }
    } catch (_e) {
    }
    return !(left == null ? void 0 : left.toLocaleString().toLowerCase().includes(rights.toLowerCase()));
  }
  if (predicate.type === "country" && typeof rights === "string") {
    const rightCountry = parseCountry(rights);
    const leftCountry = parseCountry(String(left));
    if (leftCountry && rightCountry) {
      const match = leftCountry.isoAlpha2 === rightCountry.isoAlpha2;
      if (predicate.operator === "equals") return match;
      if (predicate.operator === "not_equals") return !match;
    }
  }
  if (predicate.operator === "equals") {
    if (typeof left === "string" && typeof rights === "string") {
      return left.toLowerCase() === rights.toLowerCase();
    }
    const normalizedLeft = typeof left === "string" && predicate.type === "boolean" ? left.toLowerCase() === "true" : left;
    const normalizedRights = typeof rights === "string" && predicate.type === "boolean" ? rights.toLowerCase() === "true" : rights;
    return normalizedLeft == normalizedRights && !Number.isNaN(normalizedLeft);
  }
  if (predicate.operator === "not_equals") {
    if (typeof left === "string" && typeof rights === "string") {
      return left.toLowerCase() !== rights.toLowerCase();
    }
    const normalizedLeft = typeof left === "string" && predicate.type === "boolean" ? left.toLowerCase() === "true" : left;
    const normalizedRights = typeof rights === "string" && predicate.type === "boolean" ? rights.toLowerCase() === "true" : rights;
    return normalizedLeft != normalizedRights && !Number.isNaN(normalizedLeft);
  }
  if (predicate.operator === "less_than") {
    return !Number.isNaN(Number(left)) && Number(left) < Number(rights);
  }
  if (predicate.operator === "greater_than") {
    return Number(left) > Number(rights) && !Number.isNaN(Number(left));
  }
  if (predicate.operator === "between") {
    if (!Array.isArray(rights))
      throw new RuleExecutionError(
        `Rule Execution failed. Failed to extract bounds of rule ${predicate.right}`
      );
    const min = rights[0];
    const max = rights[1];
    return Number(left) >= Number(min) && Number(left) <= Number(max);
  }
  if (predicate.operator === "outside") {
    if (!Array.isArray(rights))
      throw new RuleExecutionError(
        `Rule Execution failed. Failed to extract bounds of rule ${predicate.right}`
      );
    const min = rights[0];
    const max = rights[1];
    return Number(left) < Number(min) || Number(left) > Number(max);
  }
  if (predicate.type === "matrix") {
    assertIsMatrix(rights);
    const leftLower = typeof left === "string" ? left.toLowerCase() : left;
    const match = rights.some(
      (row) => row.some((cell) => cell.trim().toLowerCase() === leftLower)
    );
    if (predicate.operator === "is_in") return match;
    if (predicate.operator === "is_not_in") return !match;
  }
  throw new RuleExecutionError(
    `Rule Execution failed for predicate ${JSON.stringify(predicate)}.`
  );
}

// src/lib/formEvaluation/utils/evaluateLogicalField.ts
function evaluateLogicalField(field, context) {
  var _a;
  if (!(field == null ? void 0 : field.segment)) {
    return false;
  }
  if (!Array.isArray((_a = field.segment) == null ? void 0 : _a.groups) || field.segment.groups.length === 0) {
    return false;
  }
  const evaluation = field.segment.groups.map(
    (group) => executePredicate(group.rule, context, context)
  ).every((result) => !!result);
  const shouldShow = field.output === ConditionOutput.Enum.show ? evaluation : !evaluation;
  return shouldShow;
}

// src/lib/formEvaluation/formEvaluation.ts
function formEvaluation(field, context) {
  if (!hasLogicalFields(field.fields)) {
    return orderFields(field.fields, field.order);
  }
  const evaluatedFields = [];
  orderFields(field.fields, field.order).forEach((field2) => {
    if (isLogicalField(field2)) {
      const shouldShow = evaluateLogicalField(field2, context);
      if (shouldShow) {
        evaluatedFields.push(
          ...orderFields(field2.form.fields, field2.form.order)
        );
      }
      return;
    }
    evaluatedFields.push(field2);
  });
  return evaluatedFields;
}

// src/constants/supportedLanguages.ts
var SUPPORTED_LANGUAGES = [
  "en-US",
  // English (United States)
  "da-DK",
  // Danish (Denmark)
  "sv-SE",
  // Swedish (Sweden)
  "no-NO",
  // Norwegian (Norway)
  "fi-FI",
  // Finnish (Finland)
  "de-DE",
  // German (Germany)
  "fr-FR",
  // French (France)
  "es-ES",
  // Spanish (Spain)
  "it-IT",
  // Italian (Italy)
  "pt-PT",
  // Portuguese (Portugal)
  "nl-NL",
  // Dutch (Netherlands)
  "pl-PL"
  // Polish (Poland)
];

// src/utils/isLocaleSupported.ts
function isLocaleSupported(locale) {
  return SUPPORTED_LANGUAGES.includes(
    locale
  );
}

// src/lib/translations/utils/translateNaceCodes.ts
import { produce } from "immer";

// src/utils/cdn.ts
var ORIGIN = "https://platform.spektr.com/";
function getNaceCodesUrl(language) {
  const url = new URL(`assets/data/${language}/nace-codes.json`, ORIGIN);
  return url.toString();
}

// src/lib/translations/utils/translateNaceCodes.ts
async function translateNaceCodes(field, language) {
  const naceCodes = await fetch(getNaceCodesUrl(language)).then(
    (res) => res.json()
  );
  if (!Array.isArray(naceCodes)) {
    throw new Error(`NACE codes not found for language: ${language}`);
  }
  const updatedOptions = naceCodes.map((code) => {
    const value = `${code.section}${code.code}`;
    let label = `${value} - ${code.name}`;
    if (code.level && Number(code.level) > 1) {
      label += ` (${code.level})`;
    }
    return { value, label };
  });
  return produce(field, (draft) => {
    draft.attributes.options = updatedOptions;
  });
}

// src/lib/translations/translateFields.ts
async function translateFields(fields, language) {
  let typedLanguage = "en-US";
  if (language && isLocaleSupported(language)) {
    typedLanguage = language;
  }
  const result = {};
  for (const [key, field] of Object.entries(fields)) {
    if (isEntitiesField(field) || isLogicalField(field)) {
      const translatedFields = await translateFields(
        field.form.fields,
        typedLanguage
      );
      result[key] = {
        ...field,
        form: {
          ...field.form,
          // Because the `fields` property is defined separate of Field,
          // we need to cast it to `any` to avoid TypeScript errors.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: translatedFields
        }
      };
    } else if (isDropdownField(field) && field.config.spektrDataField === "nace_code") {
      const newField = await translateNaceCodes(field, typedLanguage);
      result[key] = newField;
    } else {
      result[key] = field;
    }
  }
  return result;
}

// src/SpektrSdk.ts
var SpektrSdk = {
  executePredicate,
  formEvaluation,
  translateFields
};
var SpektrSdk_default = SpektrSdk;
export {
  SpektrSdk,
  SpektrSdk_default as default
};
//# sourceMappingURL=index.mjs.map