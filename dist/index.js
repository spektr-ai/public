"use strict";
var qe = Object.create;
var ee = Object.defineProperty;
var He = Object.getOwnPropertyDescriptor;
var We = Object.getOwnPropertyNames;
var Ze = Object.getPrototypeOf, Je = Object.prototype.hasOwnProperty;
var Xe = (e, o) => {
  for (var n in o)
    ee(e, n, { get: o[n], enumerable: !0 });
}, ge = (e, o, n, t) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let r of We(o))
      !Je.call(e, r) && r !== n && ee(e, r, { get: () => o[r], enumerable: !(t = He(o, r)) || t.enumerable });
  return e;
};
var Ke = (e, o, n) => (n = e != null ? qe(Ze(e)) : {}, ge(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  o || !e || !e.__esModule ? ee(n, "default", { value: e, enumerable: !0 }) : n,
  e
)), Qe = (e) => ge(ee({}, "__esModule", { value: !0 }), e);

// src/index.ts
var Et = {};
Xe(Et, {
  SpektrSdk: () => Be,
  default: () => Ve
});
module.exports = Qe(Et);

// src/validators/fields/EntitiesField.ts
var f = require("zod");

// src/validators/fields/BaseField.ts
var X = require("zod");

// src/validators/fields/FieldConfig.ts
var d = require("zod"), ye = d.z.object({
  spektrDataField: d.z.string(),
  prefillDefaultValue: d.z.boolean().optional().default(!0),
  prefillSpektrDataField: d.z.string().optional(),
  value: d.z.union([d.z.string(), d.z.number(), d.z.boolean(), d.z.null()]).optional(),
  defaultValue: d.z.union([d.z.string(), d.z.number(), d.z.boolean(), d.z.null()]).optional()
}), w = d.z.object({
  style: d.z.object({
    width: d.z.string().optional()
  })
});

// src/validators/fields/BaseField.ts
var g = X.z.object({
  id: X.z.string(),
  config: ye,
  isStructured: X.z.boolean().default(!1),
  ui: w.optional(),
  customerFieldId: X.z.string().optional()
});

// src/validators/fields/FieldValidation.ts
var c = require("zod"), et = ["required", "regex"], kt = c.z.enum(et), tt = c.z.object({
  type: c.z.literal("required"),
  value: c.z.literal(!0),
  message: c.z.string()
}), rt = c.z.object({
  type: c.z.literal("regex"),
  value: c.z.any(),
  preset: c.z.string().optional(),
  message: c.z.string()
}), ot = c.z.object({
  type: c.z.literal("date"),
  minimumAge: c.z.number().optional(),
  maximumAge: c.z.number().optional(),
  message: c.z.string()
}), y = c.z.union([
  tt,
  rt,
  ot
]);

// src/validators/fields/InputField.ts
var x = require("zod");
var K = x.z.object({
  label: x.z.string(),
  name: x.z.string().optional(),
  type: x.z.string().optional().default("text"),
  placeholder: x.z.string().optional(),
  helperText: x.z.string().optional(),
  countryField: x.z.string().optional(),
  internalId: x.z.string().optional()
}), C = g.merge(
  x.z.object({
    type: x.z.literal("input"),
    value: x.z.string().optional(),
    attributes: K,
    validation: x.z.array(y).default([])
  })
);

// src/validators/fields/DropdownField.ts
var F = require("zod");
var it = F.z.object({
  label: F.z.string(),
  name: F.z.string().optional(),
  placeholder: F.z.string().optional(),
  options: F.z.array(F.z.object({ value: F.z.string(), label: F.z.string() })),
  helperText: F.z.string().optional(),
  internalId: F.z.string().optional()
}), R = g.merge(
  F.z.object({
    type: F.z.literal("select"),
    attributes: it,
    validation: F.z.array(y)
  })
);
function Fe(e) {
  return R.safeParse(e).success;
}

// src/validators/fields/CheckboxField.ts
var b = require("zod");
var nt = b.z.object({
  label: b.z.string(),
  name: b.z.string().optional(),
  options: b.z.array(b.z.string()),
  placeholder: b.z.string().optional(),
  helperText: b.z.string().optional(),
  internalId: b.z.string().optional()
}), k = g.merge(
  b.z.object({
    type: b.z.literal("radio").or(b.z.literal("checkbox")).or(b.z.literal("optionSwitch")),
    attributes: nt,
    validation: b.z.array(y)
  })
);

// src/validators/fields/FileField.ts
var P = require("zod");
var at = P.z.object({
  label: P.z.string(),
  name: P.z.string().optional(),
  fileType: P.z.string(),
  placeholder: P.z.string().optional(),
  helperText: P.z.string().optional(),
  internalId: P.z.string().optional()
}), N = g.merge(
  P.z.object({
    type: P.z.literal("file"),
    attributes: at,
    validation: P.z.array(y)
  })
);

// src/validators/fields/DateField.ts
var I = require("zod");
var st = K.merge(
  I.z.object({
    type: I.z.literal("date"),
    format: I.z.string().optional(),
    minDate: I.z.string().optional(),
    maxDate: I.z.string().optional()
  })
), L = C.merge(
  I.z.object({
    attributes: st
  })
);

// src/validators/fields/CurrencyField.ts
var z = require("zod");
var lt = K.merge(
  z.z.object({
    type: z.z.literal("currency"),
    currency: z.z.object({
      symbol: z.z.string(),
      code: z.z.string()
    }).optional()
  })
), j = C.merge(
  z.z.object({
    attributes: lt
  })
);

// src/validators/fields/TitleField.ts
var O = require("zod");
var U = O.z.object({
  id: O.z.string(),
  ui: w.optional(),
  type: O.z.literal("title"),
  attributes: O.z.object({
    content: O.z.string()
  })
});

// src/validators/fields/ParagraphField.ts
var M = require("zod");
var $ = M.z.object({
  id: M.z.string(),
  ui: w.optional(),
  type: M.z.literal("paragraph"),
  attributes: M.z.object({
    content: M.z.string()
  })
});

// src/validators/fields/DividerField.ts
var te = require("zod");
var Y = te.z.object({
  id: te.z.string(),
  ui: w.optional(),
  type: te.z.literal("divider")
});

// src/validators/fields/ConsentField.ts
var _ = require("zod");
var pt = _.z.object({
  label: _.z.string(),
  name: _.z.string().optional(),
  internalId: _.z.string().optional()
}), B = g.merge(
  _.z.object({
    type: _.z.literal("consent"),
    attributes: pt,
    validation: _.z.array(y)
  })
);

// src/validators/fields/SmartField.ts
var T = require("zod");
var ft = T.z.object({
  label: T.z.string(),
  name: T.z.string().optional(),
  placeholder: T.z.string().optional(),
  helperText: T.z.string().optional(),
  internalId: T.z.string().optional()
}), V = g.merge(
  T.z.object({
    type: T.z.literal("smart"),
    value: T.z.string().optional(),
    attributes: ft,
    validation: T.z.array(y).default([])
  })
);

// src/validators/fields/InformationCalloutField.ts
var G = require("zod");
var q = G.z.object({
  id: G.z.string(),
  ui: w.optional(),
  type: G.z.literal("informationCallout"),
  attributes: G.z.object({
    content: G.z.string()
  })
});

// src/validators/fields/FieldsGroup.ts
var re = require("zod");
var H = re.z.object({
  id: re.z.string(),
  ui: w.optional(),
  type: re.z.literal("fieldsGroup")
});

// src/validators/fields/ConditionalField.ts
var S = require("zod");
var ut = ["show", "hide"], fe = S.z.enum(ut), oe = g.merge(
  S.z.object({
    type: S.z.literal("conditional"),
    validation: S.z.array(y),
    segment: S.z.any(),
    // Because "Cannot access 'SegmentSchema' before initialization"
    output: fe.optional().default("hide"),
    form: S.z.object({
      fields: S.z.record(
        S.z.string(),
        S.z.union([
          L,
          j,
          C,
          R,
          k,
          N,
          R,
          U,
          $,
          q,
          H,
          Y,
          B,
          V
        ])
      ),
      order: S.z.array(S.z.string())
    })
  })
);

// src/validators/fields/EntitiesField.ts
var ue = g.merge(
  f.z.object({
    type: f.z.literal("entity"),
    attributes: f.z.object({
      label: f.z.string(),
      name: f.z.string().optional(),
      helperText: f.z.string().optional(),
      buttonText: f.z.string(),
      labelField: f.z.string().optional(),
      internalId: f.z.string().optional(),
      category: f.z.string().optional()
    }),
    validation: f.z.array(y).default([]),
    form: f.z.object({
      fields: f.z.record(
        f.z.string(),
        f.z.union([
          L,
          j,
          C,
          R,
          k,
          N,
          R,
          U,
          $,
          q,
          H,
          Y,
          B,
          V,
          oe
        ])
      ),
      order: f.z.array(f.z.string())
    }),
    relationType: f.z.string().optional()
  })
);
function ie(e) {
  return ue.safeParse(e).success;
}

// src/validators/fields/Field.ts
var ne = require("zod");
var be = oe;
function W(e) {
  return be.safeParse(e).success;
}
var mt = ne.z.union([
  U,
  $,
  q,
  H,
  Y
]);
var dt = ne.z.union([
  L,
  j,
  C,
  R,
  k,
  N,
  ue,
  B,
  V
]);
var lo = ne.z.union([mt, dt, be]);

// src/lib/formEvaluation/utils/hasLogicalFields.ts
function me(e) {
  return Object.values(e).some((o) => W(o) ? !0 : ie(o) ? me(o.form.fields) : !1);
}

// src/utils/orderFields.ts
function ae(e, o) {
  let n = [];
  return !Array.isArray(o) || o.length === 0 || !e || Object.keys(e).length === 0 ? Object.values(e) : (o.forEach((t) => {
    e[t] && n.push(e[t]);
  }), n);
}

// src/constants/regex/range.ts
var se = /^\[\s{0,10}(-?\d+|\w+)?\s{0,10},\s{0,10}(-?\d+|\w+)?\s{0,10}\]$/;

// src/utils/parsers/range.ts
var he = (e) => {
  var r, i;
  let o = e == null ? void 0 : e.match(se);
  if (!o) return ["", ""];
  let n = ((r = o[1]) == null ? void 0 : r.trim()) || "", t = ((i = o[2]) == null ? void 0 : i.trim()) || "";
  return [n, t];
};

// src/utils/parsers/country.ts
var Z = Ke(require("iso-3166-1")), Q = (e) => {
  if (!e || e.length < 2) return;
  let o = e.length === 2 ? "iso2" : e.length === 3 ? "iso3" : "name", n;
  switch (o) {
    case "name":
      n = Z.whereCountry(e);
      break;
    case "iso2":
      n = Z.whereAlpha2(e);
      break;
    case "iso3":
      n = Z.whereAlpha3(e);
      break;
  }
  if (n)
    return {
      isoAlpha2: n.alpha2,
      isoAlpha3: n.alpha3,
      name: n.country
    };
};

// src/utils/parsers/dates/epoch.ts
var xe = (e) => {
  if (/^-?\d+$/.test(e)) {
    let n = Number(e) * 1e3;
    return new Date(n);
  }
};

// src/utils/parsers/dates/ddmmyyyy.ts
var De = (e) => {
  let o = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](\d{4})$/, n = e.match(o);
  if (n) {
    let [t, r, i, s] = n;
    if (!r || !i || !s) return;
    let l = parseInt(r), p = parseInt(i) - 1, D = parseInt(s), h = new Date(Date.UTC(D, p, l));
    if (h.getFullYear() === D && h.getMonth() === p && h.getDate() === l)
      return h;
  }
};

// src/utils/parsers/dates/yyyymmdd.ts
var we = (e) => {
  let o = /^(\d{4})[-/](0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])$/, n = e.match(o);
  if (n) {
    let [t, r, i, s] = n;
    if (!s || !i || !r) return;
    let l = parseInt(r), p = parseInt(i) - 1, D = parseInt(s), h = new Date(l, p, D);
    if (h.getFullYear() === l && h.getMonth() === p && h.getDate() === D)
      return h;
  }
};

// src/utils/parsers/dates/iso8601.ts
var Se = require("date-fns"), Pe = (e) => {
  let n = /[+-]\d\d:\d\d$|Z$/.test(e) ? e : `${e}Z`, t = (0, Se.parseISO)(n);
  if (!isNaN(t.getTime()))
    return t;
};

// src/utils/parsers/dates/timestampString.ts
var Te = (e) => {
  if (/^\d{10}$/.test(e))
    return new Date(parseInt(e, 10) * 1e3);
  if (/^\d{13}$/.test(e))
    return new Date(parseInt(e, 10));
};

// src/utils/parsers/dates/parser.ts
var Ce = (e) => {
  let o = [
    Te,
    De,
    we,
    Pe,
    xe
  ];
  for (let n of o) {
    let t = n(e);
    if (t) return t;
  }
};
function le(e) {
  if (typeof e == "boolean")
    throw new Error(`Value ${e} can not be parsed to a date`);
  if (typeof e == "number") {
    let n = new Date(e);
    if (isNaN(n.getTime()))
      throw new Error(`Value ${e} can not be parsed to a date`);
    return ct(e);
  }
  let o = Ce(e);
  if (o === void 0)
    throw new Error(`Value ${e} can not be parsed to a date`);
  return o.getTime();
}
function ct(e) {
  return e < 1e10 ? e * 1e3 : e;
}

// src/utils/errors/RuleExecutionError.ts
var u = class extends Error {
  constructor(o) {
    super(o), this.name = "RuleExecutionError";
  }
};

// src/lib/predicate/utils/assertIsMatrix.ts
function ve(e) {
  if (!Array.isArray(e))
    throw new u(
      `Rule Execution failed. Expected matrix to be of type 'array' but received '${e}' of type '${typeof e}'`
    );
  for (let o of e) {
    if (!Array.isArray(o))
      throw new u(
        `Rule Execution failed. Expected row in matrix to be of type 'array' but received '${o}' of type '${typeof o}'`
      );
    for (let n of o)
      if (typeof n != "string")
        throw new u(
          `Rule Execution failed. Expected cell in matrix row to be of type 'string' but received '${n}' of type '${typeof n}'`
        );
  }
}

// src/utils/epochOrTodayToEpoch.ts
function J(e) {
  return e === "@today" ? (/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0) : new Date(Number(e)).setUTCHours(0, 0, 0, 0);
}

// src/validators/rules/predicate.ts
var a = require("zod");

// src/validators/fieldType.ts
var Re = require("zod"), v = Re.z.enum([
  "string",
  "number",
  "date",
  "country",
  "boolean",
  "file",
  "matrix"
]);

// src/validators/rules/predicate.ts
var gt = a.z.object({
  operator: a.z.enum(["and", "or"]),
  groupRoot: a.z.boolean().optional(),
  type: v,
  left: a.z.lazy(() => Ee),
  right: a.z.lazy(() => Ee),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional()
});
var yt = a.z.object({
  operator: a.z.enum(["equals", "not_equals"]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.union([a.z.string(), a.z.number(), a.z.boolean()]),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional()
});
var Ft = a.z.object({
  operator: a.z.enum(["greater_than", "less_than"]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.string().or(a.z.number()),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional()
});
var bt = a.z.object({
  operator: a.z.enum(["between", "outside"]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.string().regex(se),
  rightLowerboundMode: a.z.enum(["literal", "variable"]).default("literal").optional(),
  rightUpperboundMode: a.z.enum(["literal", "variable"]).default("literal").optional()
});
var m = {
  THIS: "this",
  NEXT: "next",
  PAST: "past"
}, E = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year"
}, ht = a.z.enum([
  m.THIS,
  m.NEXT,
  m.PAST
]), xt = a.z.enum([
  E.DAY,
  E.WEEK,
  E.MONTH,
  E.YEAR
]), Dt = a.z.object({
  operator: a.z.enum([
    "is_after",
    "is_before",
    "is_on_or_after",
    "is_on_or_before"
  ]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.string().or(a.z.number()),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional()
}), wt = a.z.object({
  operator: a.z.literal("is_relative_to_today"),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.string().or(a.z.number()).optional(),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional(),
  isRelativeConfig: a.z.object({
    position: ht,
    scope: xt,
    quantity: a.z.number()
  })
}), St = a.z.discriminatedUnion("operator", [
  Dt,
  wt
]);
var Pt = a.z.object({
  operator: a.z.enum(["is_empty", "is_not_empty"]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.undefined().optional()
}), Tt = a.z.object({
  operator: a.z.enum(["is_in", "is_not_in"]),
  type: a.z.literal("matrix"),
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.array(a.z.array(a.z.string()))
}), Ct = a.z.object({
  operator: a.z.literal("noOp"),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.undefined(),
  right: a.z.undefined()
}), vt = a.z.object({
  operator: a.z.enum(["contains", "not_contains"]),
  type: v,
  groupRoot: a.z.boolean().optional(),
  left: a.z.string(),
  right: a.z.union([a.z.string(), a.z.array(a.z.string())]),
  rightMode: a.z.enum(["literal", "variable"]).default("literal").optional()
});
var Ee = a.z.union([
  gt,
  yt,
  Ft,
  bt,
  St,
  Pt,
  Tt,
  Ct,
  vt
]);

// src/lib/predicate/utils/calculateDayPeriod.ts
var _e = (e, o, n = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), i = e.getDate();
  if (o === m.THIS)
    return {
      start: e.getTime(),
      end: e.getTime()
    };
  if (o === m.PAST) {
    let s = new Date(
      Date.UTC(t, r, i - n)
    ), l = new Date(Date.UTC(t, r, i - 1));
    return {
      start: s.getTime(),
      end: l.getTime()
    };
  } else if (o === m.NEXT) {
    let s = new Date(
      Date.UTC(t, r, i + 1)
    ), l = new Date(
      Date.UTC(t, r, i + n)
    );
    return {
      start: s.getTime(),
      end: l.getTime()
    };
  }
  throw new Error(`Unsupported position: ${o}`);
};

// src/lib/predicate/utils/calculateMonthPeriod.ts
var Ae = (e, o, n = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), i = 0, s = 0, l = 1, p = 0;
  if (o === m.THIS)
    i = 0, s = 1;
  else if (o === m.PAST)
    i = -n, s = 0;
  else if (o === m.NEXT)
    i = 1, s = n + 1;
  else
    throw new Error(`Unsupported position: ${o}`);
  let D = new Date(
    Date.UTC(t, r + i, l)
  ).getTime(), h = new Date(
    Date.UTC(t, r + s, p)
  ).getTime();
  return { start: D, end: h };
};

// src/lib/predicate/utils/calculateWeekPeriod.ts
var Ie = (e, o, n = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), i = e.getDate(), s = e.getDay(), l = i - s, p = 0, D = 0;
  if (o === m.THIS)
    p = 0, D = 6;
  else if (o === m.PAST)
    p = -7 * n, D = -1;
  else if (o === m.NEXT)
    p = 7, D = 7 * n + 6;
  else
    throw new Error(`Unsupported position: ${o}`);
  let h = new Date(
    Date.UTC(t, r, l + p)
  ).getTime(), Ge = new Date(
    Date.UTC(t, r, l + D)
  ).getTime();
  return { start: h, end: Ge };
};

// src/lib/predicate/utils/calculateYearPeriod.ts
var ze = (e, o, n = 1) => {
  let t = e.getFullYear(), r = 0, i = 0;
  if (o === m.THIS)
    r = 0, i = 0;
  else if (o === m.PAST)
    r = -n, i = -1;
  else if (o === m.NEXT)
    r = 1, i = n;
  else
    throw new Error(`Unsupported position: ${o}`);
  let s = new Date(
    Date.UTC(t + r, 0, 1)
  ).getTime(), l = new Date(Date.UTC(t + i, 11, 31)).getTime();
  return { start: s, end: l };
};

// src/lib/predicate/utils/calculateRelativePeriod.ts
var ke = (e, o, n = 1) => {
  n <= 0 && (n = 1);
  let t = /* @__PURE__ */ new Date(), r = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())
  );
  switch (o) {
    case E.DAY:
      return _e(r, e, n);
    case E.WEEK:
      return Ie(r, e, n);
    case E.MONTH:
      return Ae(r, e, n);
    case E.YEAR:
      return ze(r, e, n);
    default:
      throw new Error(`Unsupported time scope: ${o}`);
  }
};

// src/lib/predicate/utils/isDateInRelativePeriod.ts
var Ne = (e, o) => {
  let { position: n, scope: t, quantity: r = 1 } = o, { start: i, end: s } = ke(n, t, r), l = new Date(e), p = Date.UTC(
    l.getFullYear(),
    l.getMonth(),
    l.getDate()
  );
  return p >= i && p <= s;
};

// src/lib/predicate/utils/dateCompareAgainst.ts
var de = (e) => (e = new Date(e).setUTCHours(0, 0, 0, 0), {
  isSameDate: (l) => {
    let p = J(l);
    return e === p;
  },
  isAfterDate: (l) => {
    let p = J(l);
    return e > p;
  },
  isBeforeDate: (l) => {
    let p = J(l);
    return e < p;
  },
  isOnOrBeforeDate: (l) => {
    let p = J(l);
    return e <= p;
  },
  isOnOrAfterDate: (l) => {
    let p = J(l);
    return e >= p;
  },
  isInRelativePeriod: (l) => Ne(e, l)
});

// src/lib/predicate/utils/getRights.ts
var Le = (e, o) => {
  var n;
  switch (e.operator) {
    case "noOp":
      return;
    case "is_empty":
    case "is_not_empty":
      return;
    case "between":
    case "outside": {
      let [t, r] = he(
        e.right
      );
      return e.rightLowerboundMode === "variable" && (t = Number(o[String(t)])), e.rightUpperboundMode === "variable" && (r = Number(o[String(r)])), [Number(t), Number(r)];
    }
    case "is_in":
    case "is_not_in":
      return e.right;
    case "is_relative_to_today":
      return;
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
      if (typeof e.right == "object")
        throw new u(
          `Rule Execution failed for operator '${e.operator}' with right-hand value: ${JSON.stringify(e.right)}`
        );
      let t = e.rightMode === "variable" ? o[String(e.right)] : e.right;
      return t != null ? t : void 0;
    }
    case "contains":
    case "not_contains":
      return Array.isArray(e.right) ? e.right : e.rightMode === "variable" ? (n = o[String(e.right)]) != null ? n : void 0 : e.right;
  }
};

// src/lib/predicate/executePredicate.ts
function A(e, o, n) {
  if (e.operator === "noOp")
    return !0;
  if (e.operator === "and") {
    let i = A(e.left, o, n), s = A(
      e.right,
      o,
      n
    );
    return i && s;
  }
  if (e.operator === "or") {
    let i = A(e.left, o, n), s = A(
      e.right,
      o,
      n
    );
    return i || s;
  }
  if (typeof e.left != "string")
    throw new u(
      `Rule Execution failed. Left operand of leaf rule must be of type string but received left operand '${e.left}' of type '${typeof e.left}'`
    );
  let t = o[e.left];
  if (t === void 0 && e.operator !== "is_empty") return !1;
  let r = Le(e, n);
  if (e.type === "date" && e.operator !== "is_empty" && e.operator !== "is_not_empty" && (typeof r == "number" || typeof r == "string")) {
    if (!t)
      throw new u(
        `Rule Execution failed. Left operand of a date-rule with operator '${e.operator}' cannot be empty.'`
      );
    let i = le(t), s = de(i);
    if (e.operator === "is_after")
      return s.isAfterDate(r);
    if (e.operator === "is_before")
      return s.isBeforeDate(r);
    if (e.operator === "equals")
      return s.isSameDate(r);
    if (e.operator === "not_equals")
      return !s.isSameDate(r);
    if (e.operator === "is_on_or_before")
      return s.isOnOrBeforeDate(r);
    if (e.operator === "is_on_or_after")
      return s.isOnOrAfterDate(r);
  }
  if (e.operator === "is_empty")
    return t == null;
  if (e.operator === "is_not_empty")
    return t !== null || t === void 0;
  if (e.type === "date" && e.operator === "is_relative_to_today") {
    if (!t || !e.isRelativeConfig)
      throw new u(
        "Rule Execution failed. Left operand and/or isRelativeConfig cannot be empty."
      );
    let i = le(t);
    return de(i).isInRelativePeriod(e.isRelativeConfig);
  }
  if (e.type === "country" && Array.isArray(r)) {
    let i = Q(String(t));
    if (i) {
      let s = r.some((l) => {
        let p = Q(String(l));
        return i.isoAlpha2 === (p == null ? void 0 : p.isoAlpha2) || i.name === (p == null ? void 0 : p.name);
      });
      if (e.operator === "contains") return s;
      if (e.operator === "not_contains") return !s;
    }
  }
  if (e.operator === "contains" && Array.isArray(r)) {
    let i;
    try {
      i = JSON.parse(String(t));
    } catch (s) {
      i = [t];
    }
    if (Array.isArray(i)) {
      if (i.length === 0) return !1;
      let s = new Set(
        r.map(
          (l) => typeof l == "string" ? l.toLowerCase() : l
        )
      );
      return i.some((l) => {
        if (typeof l != "string")
          throw new u(
            `Rule Execution failed. Left operand of a contains-rule must be of type string but received '${l}' of type '${typeof l}'`
          );
        return s.has(l.toLowerCase());
      });
    }
  }
  if (e.operator === "not_contains" && Array.isArray(r)) {
    let i;
    try {
      i = JSON.parse(String(t));
    } catch (s) {
      i = [t];
    }
    if (Array.isArray(i)) {
      if (i.length === 0) return !0;
      let s = new Set(
        r.map(
          (l) => typeof l == "string" ? l.toLowerCase() : l
        )
      );
      return i.every((l) => {
        if (typeof l != "string")
          throw new u(
            `Rule Execution failed. Left operand of a not_contains-rule must be of type string but received '${l}' of type '${typeof l}'`
          );
        return !s.has(l.toLowerCase());
      });
    }
  }
  if (e.operator === "contains" && typeof r == "string") {
    try {
      let i = JSON.parse(String(t));
      if (Array.isArray(i))
        throw new u(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
    } catch (i) {
    }
    return !!(t != null && t.toLocaleString().toLowerCase().includes(r.toLowerCase()));
  }
  if (e.operator === "not_contains" && typeof r == "string") {
    try {
      let i = JSON.parse(String(t));
      if (Array.isArray(i))
        throw new u(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
    } catch (i) {
    }
    return !(t != null && t.toLocaleString().toLowerCase().includes(r.toLowerCase()));
  }
  if (e.type === "country" && typeof r == "string") {
    let i = Q(r), s = Q(String(t));
    if (s && i) {
      let l = s.isoAlpha2 === i.isoAlpha2;
      if (e.operator === "equals") return l;
      if (e.operator === "not_equals") return !l;
    }
  }
  if (e.operator === "equals") {
    if (typeof t == "string" && typeof r == "string")
      return t.toLowerCase() === r.toLowerCase();
    let i = typeof t == "string" && e.type === "boolean" ? t.toLowerCase() === "true" : t, s = typeof r == "string" && e.type === "boolean" ? r.toLowerCase() === "true" : r;
    return i == s && !Number.isNaN(i);
  }
  if (e.operator === "not_equals") {
    if (typeof t == "string" && typeof r == "string")
      return t.toLowerCase() !== r.toLowerCase();
    let i = typeof t == "string" && e.type === "boolean" ? t.toLowerCase() === "true" : t, s = typeof r == "string" && e.type === "boolean" ? r.toLowerCase() === "true" : r;
    return i != s && !Number.isNaN(i);
  }
  if (e.operator === "less_than")
    return !Number.isNaN(Number(t)) && Number(t) < Number(r);
  if (e.operator === "greater_than")
    return Number(t) > Number(r) && !Number.isNaN(Number(t));
  if (e.operator === "between") {
    if (!Array.isArray(r))
      throw new u(
        `Rule Execution failed. Failed to extract bounds of rule ${e.right}`
      );
    let i = r[0], s = r[1];
    return Number(t) >= Number(i) && Number(t) <= Number(s);
  }
  if (e.operator === "outside") {
    if (!Array.isArray(r))
      throw new u(
        `Rule Execution failed. Failed to extract bounds of rule ${e.right}`
      );
    let i = r[0], s = r[1];
    return Number(t) < Number(i) || Number(t) > Number(s);
  }
  if (e.type === "matrix") {
    ve(r);
    let i = typeof t == "string" ? t.toLowerCase() : t, s = r.some(
      (l) => l.some((p) => p.trim().toLowerCase() === i)
    );
    if (e.operator === "is_in") return s;
    if (e.operator === "is_not_in") return !s;
  }
  throw new u(
    `Rule Execution failed for predicate ${JSON.stringify(e)}.`
  );
}

// src/lib/formEvaluation/utils/evaluateLogicalField.ts
function pe(e, o) {
  var r;
  if (!(e != null && e.segment) || !Array.isArray((r = e.segment) == null ? void 0 : r.groups) || e.segment.groups.length === 0)
    return !1;
  let n = e.segment.groups.map(
    (i) => A(i.rule, o, o)
  ).every((i) => !!i);
  return e.output === fe.Enum.show ? n : !n;
}

// src/lib/formEvaluation/formEvaluation.ts
function je(e, o) {
  if (!me(e.fields))
    return ae(e.fields, e.order);
  let n = [];
  return ae(e.fields, e.order).forEach((t) => {
    if (W(t)) {
      pe(t, o) && n.push(
        ...ae(t.form.fields, t.form.order)
      );
      return;
    }
    n.push(t);
  }), n;
}

// src/constants/supportedLanguages.ts
var Oe = [
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
function Ue(e) {
  return Oe.includes(
    e
  );
}

// src/lib/translations/utils/translateNaceCodes.ts
var $e = require("immer");

// src/utils/cdn.ts
var Rt = "https://platform.spektr.com/";
function Me(e) {
  return new URL(`assets/data/${e}/nace-codes.json`, Rt).toString();
}

// src/lib/translations/utils/translateNaceCodes.ts
async function Ye(e, o) {
  let n = await fetch(Me(o)).then(
    (r) => r.json()
  );
  if (!Array.isArray(n))
    throw new Error(`NACE codes not found for language: ${o}`);
  let t = n.map((r) => {
    let i = `${r.section}${r.code}`, s = `${i} - ${r.name}`;
    return r.level && Number(r.level) > 1 && (s += ` (${r.level})`), { value: i, label: s };
  });
  return (0, $e.produce)(e, (r) => {
    r.attributes.options = t;
  });
}

// src/lib/translations/translateFields.ts
async function ce(e, o) {
  let n = "en-US";
  o && Ue(o) && (n = o);
  let t = {};
  for (let [r, i] of Object.entries(e))
    if (ie(i) || W(i)) {
      let s = await ce(
        i.form.fields,
        n
      );
      t[r] = {
        ...i,
        form: {
          ...i.form,
          // Because the `fields` property is defined separate of Field,
          // we need to cast it to `any` to avoid TypeScript errors.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: s
        }
      };
    } else if (Fe(i) && i.config.spektrDataField === "nace_code") {
      let s = await Ye(i, n);
      t[r] = s;
    } else
      t[r] = i;
  return t;
}

// src/SpektrSdk.ts
var Be = {
  executePredicate: A,
  formEvaluation: je,
  translateFields: ce,
  evaluateConditionalField: pe
}, Ve = Be;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpektrSdk
});
//# sourceMappingURL=index.js.map