"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SpektrSdk: () => SpektrSdk,
  default: () => SpektrSdk_default
});
module.exports = __toCommonJS(index_exports);

// src/validators/fields/EntitiesField.ts
var import_zod18 = require("zod");

// src/validators/fields/BaseField.ts
var import_zod2 = require("zod");

// src/validators/fields/FieldConfig.ts
var import_zod = require("zod");
var FieldConfig = import_zod.z.object({
  spektrDataField: import_zod.z.string(),
  prefillDefaultValue: import_zod.z.boolean().optional().default(true),
  prefillSpektrDataField: import_zod.z.string().optional(),
  value: import_zod.z.union([import_zod.z.string(), import_zod.z.number(), import_zod.z.boolean(), import_zod.z.null()]).optional(),
  defaultValue: import_zod.z.union([import_zod.z.string(), import_zod.z.number(), import_zod.z.boolean(), import_zod.z.null()]).optional()
});
var FieldUiConfig = import_zod.z.object({
  style: import_zod.z.object({
    width: import_zod.z.string().optional()
  })
});

// src/validators/fields/BaseField.ts
var BaseField = import_zod2.z.object({
  id: import_zod2.z.string(),
  config: FieldConfig,
  isStructured: import_zod2.z.boolean().default(false),
  ui: FieldUiConfig.optional(),
  customerFieldId: import_zod2.z.string().optional()
});

// src/validators/fields/FieldValidation.ts
var import_zod3 = require("zod");
var validationTypes = ["required", "regex"];
var validationTypesEnum = import_zod3.z.enum(validationTypes);
var RequiredFieldValidation = import_zod3.z.object({
  type: import_zod3.z.literal("required"),
  value: import_zod3.z.literal(true),
  message: import_zod3.z.string()
});
var RegexFieldValidation = import_zod3.z.object({
  type: import_zod3.z.literal("regex"),
  value: import_zod3.z.any(),
  preset: import_zod3.z.string().optional(),
  message: import_zod3.z.string()
});
var DateFieldValidation = import_zod3.z.object({
  type: import_zod3.z.literal("date"),
  minimumAge: import_zod3.z.number().optional(),
  maximumAge: import_zod3.z.number().optional(),
  message: import_zod3.z.string()
});
var FieldValidation = import_zod3.z.union([
  RequiredFieldValidation,
  RegexFieldValidation,
  DateFieldValidation
]);

// src/validators/fields/InputField.ts
var import_zod4 = require("zod");
var InputFieldAttributes = import_zod4.z.object({
  label: import_zod4.z.string(),
  name: import_zod4.z.string().optional(),
  type: import_zod4.z.string().optional().default("text"),
  placeholder: import_zod4.z.string().optional(),
  helperText: import_zod4.z.string().optional(),
  countryField: import_zod4.z.string().optional(),
  internalId: import_zod4.z.string().optional()
});
var InputField = BaseField.merge(
  import_zod4.z.object({
    type: import_zod4.z.literal("input"),
    value: import_zod4.z.string().optional(),
    attributes: InputFieldAttributes,
    validation: import_zod4.z.array(FieldValidation).default([])
  })
);

// src/validators/fields/DropdownField.ts
var import_zod5 = require("zod");
var DropdownFieldAttributes = import_zod5.z.object({
  label: import_zod5.z.string(),
  name: import_zod5.z.string().optional(),
  placeholder: import_zod5.z.string().optional(),
  options: import_zod5.z.array(import_zod5.z.object({ value: import_zod5.z.string(), label: import_zod5.z.string() })),
  helperText: import_zod5.z.string().optional(),
  internalId: import_zod5.z.string().optional()
});
var DropdownField = BaseField.merge(
  import_zod5.z.object({
    type: import_zod5.z.literal("select"),
    attributes: DropdownFieldAttributes,
    validation: import_zod5.z.array(FieldValidation)
  })
);
function isDropdownField(field) {
  return DropdownField.safeParse(field).success;
}

// src/validators/fields/CheckboxField.ts
var import_zod6 = require("zod");
var CheckboxFieldAttributes = import_zod6.z.object({
  label: import_zod6.z.string(),
  name: import_zod6.z.string().optional(),
  options: import_zod6.z.array(import_zod6.z.string()),
  placeholder: import_zod6.z.string().optional(),
  helperText: import_zod6.z.string().optional(),
  internalId: import_zod6.z.string().optional()
});
var CheckboxField = BaseField.merge(
  import_zod6.z.object({
    type: import_zod6.z.literal("radio").or(import_zod6.z.literal("checkbox")).or(import_zod6.z.literal("optionSwitch")),
    attributes: CheckboxFieldAttributes,
    validation: import_zod6.z.array(FieldValidation)
  })
);

// src/validators/fields/FileField.ts
var import_zod7 = require("zod");
var FileFieldAttributes = import_zod7.z.object({
  label: import_zod7.z.string(),
  name: import_zod7.z.string().optional(),
  fileType: import_zod7.z.string(),
  placeholder: import_zod7.z.string().optional(),
  helperText: import_zod7.z.string().optional(),
  internalId: import_zod7.z.string().optional()
});
var FileField = BaseField.merge(
  import_zod7.z.object({
    type: import_zod7.z.literal("file"),
    attributes: FileFieldAttributes,
    validation: import_zod7.z.array(FieldValidation)
  })
);

// src/validators/fields/DateField.ts
var import_zod8 = require("zod");
var DateFieldAttributes = InputFieldAttributes.merge(
  import_zod8.z.object({
    type: import_zod8.z.literal("date"),
    format: import_zod8.z.string().optional(),
    minDate: import_zod8.z.string().optional(),
    maxDate: import_zod8.z.string().optional()
  })
);
var DateField = InputField.merge(
  import_zod8.z.object({
    attributes: DateFieldAttributes
  })
);

// src/validators/fields/CurrencyField.ts
var import_zod9 = require("zod");
var CurrencyFieldAttributes = InputFieldAttributes.merge(
  import_zod9.z.object({
    type: import_zod9.z.literal("currency"),
    currency: import_zod9.z.object({
      symbol: import_zod9.z.string(),
      code: import_zod9.z.string()
    }).optional()
  })
);
var CurrencyField = InputField.merge(
  import_zod9.z.object({
    attributes: CurrencyFieldAttributes
  })
);

// src/validators/fields/TitleField.ts
var import_zod10 = require("zod");
var TitleField = import_zod10.z.object({
  id: import_zod10.z.string(),
  ui: FieldUiConfig.optional(),
  type: import_zod10.z.literal("title"),
  attributes: import_zod10.z.object({
    content: import_zod10.z.string()
  })
});

// src/validators/fields/ParagraphField.ts
var import_zod11 = require("zod");
var ParagraphField = import_zod11.z.object({
  id: import_zod11.z.string(),
  ui: FieldUiConfig.optional(),
  type: import_zod11.z.literal("paragraph"),
  attributes: import_zod11.z.object({
    content: import_zod11.z.string()
  })
});

// src/validators/fields/DividerField.ts
var import_zod12 = require("zod");
var DividerField = import_zod12.z.object({
  id: import_zod12.z.string(),
  ui: FieldUiConfig.optional(),
  type: import_zod12.z.literal("divider")
});

// src/validators/fields/ConsentField.ts
var import_zod13 = require("zod");
var ConsentFieldAttributes = import_zod13.z.object({
  label: import_zod13.z.string(),
  name: import_zod13.z.string().optional(),
  internalId: import_zod13.z.string().optional()
});
var ConsentField = BaseField.merge(
  import_zod13.z.object({
    type: import_zod13.z.literal("consent"),
    attributes: ConsentFieldAttributes,
    validation: import_zod13.z.array(FieldValidation)
  })
);

// src/validators/fields/SmartField.ts
var import_zod14 = require("zod");
var SmartFieldAttributes = import_zod14.z.object({
  label: import_zod14.z.string(),
  name: import_zod14.z.string().optional(),
  placeholder: import_zod14.z.string().optional(),
  helperText: import_zod14.z.string().optional(),
  internalId: import_zod14.z.string().optional()
});
var SmartField = BaseField.merge(
  import_zod14.z.object({
    type: import_zod14.z.literal("smart"),
    value: import_zod14.z.string().optional(),
    attributes: SmartFieldAttributes,
    validation: import_zod14.z.array(FieldValidation).default([])
  })
);

// src/validators/fields/InformationCalloutField.ts
var import_zod15 = require("zod");
var InformationCalloutField = import_zod15.z.object({
  id: import_zod15.z.string(),
  ui: FieldUiConfig.optional(),
  type: import_zod15.z.literal("informationCallout"),
  attributes: import_zod15.z.object({
    content: import_zod15.z.string()
  })
});

// src/validators/fields/FieldsGroup.ts
var import_zod16 = require("zod");
var FieldsGroup = import_zod16.z.object({
  id: import_zod16.z.string(),
  ui: FieldUiConfig.optional(),
  type: import_zod16.z.literal("fieldsGroup")
});

// src/validators/fields/ConditionalField.ts
var import_zod17 = require("zod");
var outputTypes = ["show", "hide"];
var ConditionOutput = import_zod17.z.enum(outputTypes);
var ConditionalField = BaseField.merge(
  import_zod17.z.object({
    type: import_zod17.z.literal("conditional"),
    validation: import_zod17.z.array(FieldValidation),
    segment: import_zod17.z.any(),
    // Because "Cannot access 'SegmentSchema' before initialization"
    output: ConditionOutput.optional().default("hide"),
    form: import_zod17.z.object({
      fields: import_zod17.z.record(
        import_zod17.z.string(),
        import_zod17.z.union([
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
      order: import_zod17.z.array(import_zod17.z.string())
    })
  })
);

// src/validators/fields/EntitiesField.ts
var EntitiesField = BaseField.merge(
  import_zod18.z.object({
    type: import_zod18.z.literal("entity"),
    attributes: import_zod18.z.object({
      label: import_zod18.z.string(),
      name: import_zod18.z.string().optional(),
      helperText: import_zod18.z.string().optional(),
      buttonText: import_zod18.z.string(),
      labelField: import_zod18.z.string().optional(),
      internalId: import_zod18.z.string().optional(),
      category: import_zod18.z.string().optional()
    }),
    validation: import_zod18.z.array(FieldValidation).default([]),
    form: import_zod18.z.object({
      fields: import_zod18.z.record(
        import_zod18.z.string(),
        import_zod18.z.union([
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
      order: import_zod18.z.array(import_zod18.z.string())
    }),
    relationType: import_zod18.z.string().optional()
  })
);
function isEntitiesField(field) {
  return EntitiesField.safeParse(field).success;
}

// src/validators/fields/Field.ts
var import_zod19 = require("zod");
var LogicalField = ConditionalField;
function isLogicalField(field) {
  return LogicalField.safeParse(field).success;
}
var ReadOnlyField = import_zod19.z.union([
  TitleField,
  ParagraphField,
  InformationCalloutField,
  FieldsGroup,
  DividerField
]);
var WritableField = import_zod19.z.union([
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
var Field = import_zod19.z.union([ReadOnlyField, WritableField, LogicalField]);

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
var iso = __toESM(require("iso-3166-1"));
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
var import_date_fns = require("date-fns");
var parseIso8601Date = (date) => {
  const hasTimezone = /[+-]\d\d:\d\d$|Z$/.test(date);
  const dateInUtc = hasTimezone ? date : `${date}Z`;
  const parsed = (0, import_date_fns.parseISO)(dateInUtc);
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
var import_zod21 = require("zod");

// src/validators/fieldType.ts
var import_zod20 = require("zod");
var SpektrFieldType = import_zod20.z.enum([
  "string",
  "number",
  "date",
  "country",
  "boolean",
  "file",
  "matrix"
]);

// src/validators/rules/predicate.ts
var booleanPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["and", "or"]),
  groupRoot: import_zod21.z.boolean().optional(),
  type: SpektrFieldType,
  left: import_zod21.z.lazy(() => predicateSchema),
  right: import_zod21.z.lazy(() => predicateSchema),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
});
var equalityPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["equals", "not_equals"]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.union([import_zod21.z.string(), import_zod21.z.number(), import_zod21.z.boolean()]),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
});
var inequalityPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["greater_than", "less_than"]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.string().or(import_zod21.z.number()),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
});
var rangePredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["between", "outside"]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.string().regex(rangeRegex),
  rightLowerboundMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional(),
  rightUpperboundMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
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
var datePositionSchema = import_zod21.z.enum([
  IsRelativeToDatePositions.THIS,
  IsRelativeToDatePositions.NEXT,
  IsRelativeToDatePositions.PAST
]);
var dateScopeSchema = import_zod21.z.enum([
  IsRelativeToDateScopes.DAY,
  IsRelativeToDateScopes.WEEK,
  IsRelativeToDateScopes.MONTH,
  IsRelativeToDateScopes.YEAR
]);
var dateAfterBeforeSchema = import_zod21.z.object({
  operator: import_zod21.z.enum([
    "is_after",
    "is_before",
    "is_on_or_after",
    "is_on_or_before"
  ]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.string().or(import_zod21.z.number()),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
});
var dateRelativeToTodaySchema = import_zod21.z.object({
  operator: import_zod21.z.literal("is_relative_to_today"),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.string().or(import_zod21.z.number()).optional(),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional(),
  isRelativeConfig: import_zod21.z.object({
    position: datePositionSchema,
    scope: dateScopeSchema,
    quantity: import_zod21.z.number()
  })
});
var dateComparisonPredicateSchema = import_zod21.z.discriminatedUnion("operator", [
  dateAfterBeforeSchema,
  dateRelativeToTodaySchema
]);
var existencePredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["is_empty", "is_not_empty"]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.undefined().optional()
});
var matrixPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["is_in", "is_not_in"]),
  type: import_zod21.z.literal("matrix"),
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.array(import_zod21.z.array(import_zod21.z.string()))
});
var noOpPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.literal("noOp"),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.undefined(),
  right: import_zod21.z.undefined()
});
var containsPredicateSchema = import_zod21.z.object({
  operator: import_zod21.z.enum(["contains", "not_contains"]),
  type: SpektrFieldType,
  groupRoot: import_zod21.z.boolean().optional(),
  left: import_zod21.z.string(),
  right: import_zod21.z.union([import_zod21.z.string(), import_zod21.z.array(import_zod21.z.string())]),
  rightMode: import_zod21.z.enum(["literal", "variable"]).default("literal").optional()
});
var predicateSchema = import_zod21.z.union([
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
var import_immer = require("immer");

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
  return (0, import_immer.produce)(field, (draft) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpektrSdk
});
//# sourceMappingURL=index.js.map