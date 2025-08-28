// src/validators/fields/EntitiesField.ts
import { z as m } from "zod";

// src/validators/fields/BaseField.ts
import { z as Q } from "zod";

// src/validators/fields/FieldConfig.ts
import { z as d } from "zod";
var ce = d.object({
  spektrDataField: d.string(),
  prefillDefaultValue: d.boolean().optional().default(!0),
  prefillSpektrDataField: d.string().optional(),
  value: d.union([d.string(), d.number(), d.boolean(), d.null()]).optional(),
  defaultValue: d.union([d.string(), d.number(), d.boolean(), d.null()]).optional()
}), D = d.object({
  style: d.object({
    width: d.string().optional()
  })
});

// src/validators/fields/BaseField.ts
var c = Q.object({
  id: Q.string(),
  config: ce,
  isStructured: Q.boolean().default(!1),
  ui: D.optional(),
  customerFieldId: Q.string().optional()
});

// src/validators/fields/FieldValidation.ts
import { z as g } from "zod";
var Ue = ["required", "regex"], Tt = g.enum(Ue), Me = g.object({
  type: g.literal("required"),
  value: g.literal(!0),
  message: g.string()
}), $e = g.object({
  type: g.literal("regex"),
  value: g.any(),
  preset: g.string().optional(),
  message: g.string()
}), Ye = g.object({
  type: g.literal("date"),
  minimumAge: g.number().optional(),
  maximumAge: g.number().optional(),
  message: g.string()
}), y = g.union([
  Me,
  $e,
  Ye
]);

// src/validators/fields/InputField.ts
import { z as w } from "zod";
var W = w.object({
  label: w.string(),
  name: w.string().optional(),
  type: w.string().optional().default("text"),
  placeholder: w.string().optional(),
  helperText: w.string().optional(),
  countryField: w.string().optional(),
  internalId: w.string().optional()
}), P = c.merge(
  w.object({
    type: w.literal("input"),
    value: w.string().optional(),
    attributes: W,
    validation: w.array(y).default([])
  })
);

// src/validators/fields/DropdownField.ts
import { z as b } from "zod";
var Be = b.object({
  label: b.string(),
  name: b.string().optional(),
  placeholder: b.string().optional(),
  options: b.array(b.object({ value: b.string(), label: b.string() })),
  helperText: b.string().optional(),
  internalId: b.string().optional()
}), R = c.merge(
  b.object({
    type: b.literal("select"),
    attributes: Be,
    validation: b.array(y)
  })
);
function ge(e) {
  return R.safeParse(e).success;
}

// src/validators/fields/CheckboxField.ts
import { z as h } from "zod";
var Ve = h.object({
  label: h.string(),
  name: h.string().optional(),
  options: h.array(h.string()),
  placeholder: h.string().optional(),
  helperText: h.string().optional(),
  internalId: h.string().optional()
}), I = c.merge(
  h.object({
    type: h.literal("radio").or(h.literal("checkbox")).or(h.literal("optionSwitch")),
    attributes: Ve,
    validation: h.array(y)
  })
);

// src/validators/fields/FileField.ts
import { z as T } from "zod";
var Ge = T.object({
  label: T.string(),
  name: T.string().optional(),
  fileType: T.string(),
  placeholder: T.string().optional(),
  helperText: T.string().optional(),
  internalId: T.string().optional()
}), z = c.merge(
  T.object({
    type: T.literal("file"),
    attributes: Ge,
    validation: T.array(y)
  })
);

// src/validators/fields/DateField.ts
import { z as k } from "zod";
var qe = W.merge(
  k.object({
    type: k.literal("date"),
    format: k.string().optional(),
    minDate: k.string().optional(),
    maxDate: k.string().optional()
  })
), N = P.merge(
  k.object({
    attributes: qe
  })
);

// src/validators/fields/CurrencyField.ts
import { z as L } from "zod";
var He = W.merge(
  L.object({
    type: L.literal("currency"),
    currency: L.object({
      symbol: L.string(),
      code: L.string()
    }).optional()
  })
), j = P.merge(
  L.object({
    attributes: He
  })
);

// src/validators/fields/TitleField.ts
import { z as Z } from "zod";
var O = Z.object({
  id: Z.string(),
  ui: D.optional(),
  type: Z.literal("title"),
  attributes: Z.object({
    content: Z.string()
  })
});

// src/validators/fields/ParagraphField.ts
import { z as J } from "zod";
var U = J.object({
  id: J.string(),
  ui: D.optional(),
  type: J.literal("paragraph"),
  attributes: J.object({
    content: J.string()
  })
});

// src/validators/fields/DividerField.ts
import { z as ae } from "zod";
var M = ae.object({
  id: ae.string(),
  ui: D.optional(),
  type: ae.literal("divider")
});

// src/validators/fields/ConsentField.ts
import { z as A } from "zod";
var We = A.object({
  label: A.string(),
  name: A.string().optional(),
  internalId: A.string().optional()
}), $ = c.merge(
  A.object({
    type: A.literal("consent"),
    attributes: We,
    validation: A.array(y)
  })
);

// src/validators/fields/SmartField.ts
import { z as C } from "zod";
var Ze = C.object({
  label: C.string(),
  name: C.string().optional(),
  placeholder: C.string().optional(),
  helperText: C.string().optional(),
  internalId: C.string().optional()
}), Y = c.merge(
  C.object({
    type: C.literal("smart"),
    value: C.string().optional(),
    attributes: Ze,
    validation: C.array(y).default([])
  })
);

// src/validators/fields/InformationCalloutField.ts
import { z as X } from "zod";
var B = X.object({
  id: X.string(),
  ui: D.optional(),
  type: X.literal("informationCallout"),
  attributes: X.object({
    content: X.string()
  })
});

// src/validators/fields/FieldsGroup.ts
import { z as se } from "zod";
var V = se.object({
  id: se.string(),
  ui: D.optional(),
  type: se.literal("fieldsGroup")
});

// src/validators/fields/ConditionalField.ts
import { z as S } from "zod";
var Je = ["show", "hide"], le = S.enum(Je), ee = c.merge(
  S.object({
    type: S.literal("conditional"),
    validation: S.array(y),
    segment: S.any(),
    // Because "Cannot access 'SegmentSchema' before initialization"
    output: le.optional().default("hide"),
    form: S.object({
      fields: S.record(
        S.string(),
        S.union([
          N,
          j,
          P,
          R,
          I,
          z,
          R,
          O,
          U,
          B,
          V,
          M,
          $,
          Y
        ])
      ),
      order: S.array(S.string())
    })
  })
);

// src/validators/fields/EntitiesField.ts
var pe = c.merge(
  m.object({
    type: m.literal("entity"),
    attributes: m.object({
      label: m.string(),
      name: m.string().optional(),
      helperText: m.string().optional(),
      buttonText: m.string(),
      labelField: m.string().optional(),
      internalId: m.string().optional(),
      category: m.string().optional()
    }),
    validation: m.array(y).default([]),
    form: m.object({
      fields: m.record(
        m.string(),
        m.union([
          N,
          j,
          P,
          R,
          I,
          z,
          R,
          O,
          U,
          B,
          V,
          M,
          $,
          Y,
          ee
        ])
      ),
      order: m.array(m.string())
    }),
    relationType: m.string().optional()
  })
);
function te(e) {
  return pe.safeParse(e).success;
}

// src/validators/fields/Field.ts
import { z as fe } from "zod";
var ye = ee;
function G(e) {
  return ye.safeParse(e).success;
}
var Xe = fe.union([
  O,
  U,
  B,
  V,
  M
]);
var Ke = fe.union([
  N,
  j,
  P,
  R,
  I,
  z,
  pe,
  $,
  Y
]);
var yo = fe.union([Xe, Ke, ye]);

// src/lib/formEvaluation/utils/hasLogicalFields.ts
function ue(e) {
  return Object.values(e).some((i) => G(i) ? !0 : te(i) ? ue(i.form.fields) : !1);
}

// src/utils/orderFields.ts
function re(e, i) {
  let a = [];
  return !Array.isArray(i) || i.length === 0 || !e || Object.keys(e).length === 0 ? Object.values(e) : (i.forEach((t) => {
    e[t] && a.push(e[t]);
  }), a);
}

// src/constants/regex/range.ts
var oe = /^\[\s{0,10}(-?\d+|\w+)?\s{0,10},\s{0,10}(-?\d+|\w+)?\s{0,10}\]$/;

// src/utils/parsers/range.ts
var Fe = (e) => {
  var r, o;
  let i = e == null ? void 0 : e.match(oe);
  if (!i) return ["", ""];
  let a = ((r = i[1]) == null ? void 0 : r.trim()) || "", t = ((o = i[2]) == null ? void 0 : o.trim()) || "";
  return [a, t];
};

// src/utils/parsers/country.ts
import * as q from "iso-3166-1";
var K = (e) => {
  if (!e || e.length < 2) return;
  let i = e.length === 2 ? "iso2" : e.length === 3 ? "iso3" : "name", a;
  switch (i) {
    case "name":
      a = q.whereCountry(e);
      break;
    case "iso2":
      a = q.whereAlpha2(e);
      break;
    case "iso3":
      a = q.whereAlpha3(e);
      break;
  }
  if (a)
    return {
      isoAlpha2: a.alpha2,
      isoAlpha3: a.alpha3,
      name: a.country
    };
};

// src/utils/parsers/dates/epoch.ts
var be = (e) => {
  if (/^-?\d+$/.test(e)) {
    let a = Number(e) * 1e3;
    return new Date(a);
  }
};

// src/utils/parsers/dates/ddmmyyyy.ts
var he = (e) => {
  let i = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](\d{4})$/, a = e.match(i);
  if (a) {
    let [t, r, o, s] = a;
    if (!r || !o || !s) return;
    let l = parseInt(r), p = parseInt(o) - 1, x = parseInt(s), F = new Date(Date.UTC(x, p, l));
    if (F.getFullYear() === x && F.getMonth() === p && F.getDate() === l)
      return F;
  }
};

// src/utils/parsers/dates/yyyymmdd.ts
var xe = (e) => {
  let i = /^(\d{4})[-/](0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])$/, a = e.match(i);
  if (a) {
    let [t, r, o, s] = a;
    if (!s || !o || !r) return;
    let l = parseInt(r), p = parseInt(o) - 1, x = parseInt(s), F = new Date(l, p, x);
    if (F.getFullYear() === l && F.getMonth() === p && F.getDate() === x)
      return F;
  }
};

// src/utils/parsers/dates/iso8601.ts
import { parseISO as Qe } from "date-fns";
var De = (e) => {
  let a = /[+-]\d\d:\d\d$|Z$/.test(e) ? e : `${e}Z`, t = Qe(a);
  if (!isNaN(t.getTime()))
    return t;
};

// src/utils/parsers/dates/timestampString.ts
var we = (e) => {
  if (/^\d{10}$/.test(e))
    return new Date(parseInt(e, 10) * 1e3);
  if (/^\d{13}$/.test(e))
    return new Date(parseInt(e, 10));
};

// src/utils/parsers/dates/parser.ts
var Se = (e) => {
  let i = [
    we,
    he,
    xe,
    De,
    be
  ];
  for (let a of i) {
    let t = a(e);
    if (t) return t;
  }
};
function ie(e) {
  if (typeof e == "boolean")
    throw new Error(`Value ${e} can not be parsed to a date`);
  if (typeof e == "number") {
    let a = new Date(e);
    if (isNaN(a.getTime()))
      throw new Error(`Value ${e} can not be parsed to a date`);
    return et(e);
  }
  let i = Se(e);
  if (i === void 0)
    throw new Error(`Value ${e} can not be parsed to a date`);
  return i.getTime();
}
function et(e) {
  return e < 1e10 ? e * 1e3 : e;
}

// src/utils/errors/RuleExecutionError.ts
var f = class extends Error {
  constructor(i) {
    super(i), this.name = "RuleExecutionError";
  }
};

// src/lib/predicate/utils/assertIsMatrix.ts
function Pe(e) {
  if (!Array.isArray(e))
    throw new f(
      `Rule Execution failed. Expected matrix to be of type 'array' but received '${e}' of type '${typeof e}'`
    );
  for (let i of e) {
    if (!Array.isArray(i))
      throw new f(
        `Rule Execution failed. Expected row in matrix to be of type 'array' but received '${i}' of type '${typeof i}'`
      );
    for (let a of i)
      if (typeof a != "string")
        throw new f(
          `Rule Execution failed. Expected cell in matrix row to be of type 'string' but received '${a}' of type '${typeof a}'`
        );
  }
}

// src/utils/epochOrTodayToEpoch.ts
function H(e) {
  return e === "@today" ? (/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0) : new Date(Number(e)).setUTCHours(0, 0, 0, 0);
}

// src/validators/rules/predicate.ts
import { z as n } from "zod";

// src/validators/fieldType.ts
import { z as tt } from "zod";
var v = tt.enum([
  "string",
  "number",
  "date",
  "country",
  "boolean",
  "file",
  "matrix"
]);

// src/validators/rules/predicate.ts
var rt = n.object({
  operator: n.enum(["and", "or"]),
  groupRoot: n.boolean().optional(),
  type: v,
  left: n.lazy(() => Te),
  right: n.lazy(() => Te),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional()
});
var ot = n.object({
  operator: n.enum(["equals", "not_equals"]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.union([n.string(), n.number(), n.boolean()]),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional()
});
var it = n.object({
  operator: n.enum(["greater_than", "less_than"]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.string().or(n.number()),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional()
});
var nt = n.object({
  operator: n.enum(["between", "outside"]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.string().regex(oe),
  rightLowerboundMode: n.enum(["literal", "variable"]).default("literal").optional(),
  rightUpperboundMode: n.enum(["literal", "variable"]).default("literal").optional()
});
var u = {
  THIS: "this",
  NEXT: "next",
  PAST: "past"
}, E = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year"
}, at = n.enum([
  u.THIS,
  u.NEXT,
  u.PAST
]), st = n.enum([
  E.DAY,
  E.WEEK,
  E.MONTH,
  E.YEAR
]), lt = n.object({
  operator: n.enum([
    "is_after",
    "is_before",
    "is_on_or_after",
    "is_on_or_before"
  ]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.string().or(n.number()),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional()
}), pt = n.object({
  operator: n.literal("is_relative_to_today"),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.string().or(n.number()).optional(),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional(),
  isRelativeConfig: n.object({
    position: at,
    scope: st,
    quantity: n.number()
  })
}), ft = n.discriminatedUnion("operator", [
  lt,
  pt
]);
var ut = n.object({
  operator: n.enum(["is_empty", "is_not_empty"]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.undefined().optional()
}), mt = n.object({
  operator: n.enum(["is_in", "is_not_in"]),
  type: n.literal("matrix"),
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.array(n.array(n.string()))
}), dt = n.object({
  operator: n.literal("noOp"),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.undefined(),
  right: n.undefined()
}), ct = n.object({
  operator: n.enum(["contains", "not_contains"]),
  type: v,
  groupRoot: n.boolean().optional(),
  left: n.string(),
  right: n.union([n.string(), n.array(n.string())]),
  rightMode: n.enum(["literal", "variable"]).default("literal").optional()
});
var Te = n.union([
  rt,
  ot,
  it,
  nt,
  ft,
  ut,
  mt,
  dt,
  ct
]);

// src/lib/predicate/utils/calculateDayPeriod.ts
var Ce = (e, i, a = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), o = e.getDate();
  if (i === u.THIS)
    return {
      start: e.getTime(),
      end: e.getTime()
    };
  if (i === u.PAST) {
    let s = new Date(
      Date.UTC(t, r, o - a)
    ), l = new Date(Date.UTC(t, r, o - 1));
    return {
      start: s.getTime(),
      end: l.getTime()
    };
  } else if (i === u.NEXT) {
    let s = new Date(
      Date.UTC(t, r, o + 1)
    ), l = new Date(
      Date.UTC(t, r, o + a)
    );
    return {
      start: s.getTime(),
      end: l.getTime()
    };
  }
  throw new Error(`Unsupported position: ${i}`);
};

// src/lib/predicate/utils/calculateMonthPeriod.ts
var ve = (e, i, a = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), o = 0, s = 0, l = 1, p = 0;
  if (i === u.THIS)
    o = 0, s = 1;
  else if (i === u.PAST)
    o = -a, s = 0;
  else if (i === u.NEXT)
    o = 1, s = a + 1;
  else
    throw new Error(`Unsupported position: ${i}`);
  let x = new Date(
    Date.UTC(t, r + o, l)
  ).getTime(), F = new Date(
    Date.UTC(t, r + s, p)
  ).getTime();
  return { start: x, end: F };
};

// src/lib/predicate/utils/calculateWeekPeriod.ts
var Re = (e, i, a = 1) => {
  let t = e.getFullYear(), r = e.getMonth(), o = e.getDate(), s = e.getDay(), l = o - s, p = 0, x = 0;
  if (i === u.THIS)
    p = 0, x = 6;
  else if (i === u.PAST)
    p = -7 * a, x = -1;
  else if (i === u.NEXT)
    p = 7, x = 7 * a + 6;
  else
    throw new Error(`Unsupported position: ${i}`);
  let F = new Date(
    Date.UTC(t, r, l + p)
  ).getTime(), Oe = new Date(
    Date.UTC(t, r, l + x)
  ).getTime();
  return { start: F, end: Oe };
};

// src/lib/predicate/utils/calculateYearPeriod.ts
var Ee = (e, i, a = 1) => {
  let t = e.getFullYear(), r = 0, o = 0;
  if (i === u.THIS)
    r = 0, o = 0;
  else if (i === u.PAST)
    r = -a, o = -1;
  else if (i === u.NEXT)
    r = 1, o = a;
  else
    throw new Error(`Unsupported position: ${i}`);
  let s = new Date(
    Date.UTC(t + r, 0, 1)
  ).getTime(), l = new Date(Date.UTC(t + o, 11, 31)).getTime();
  return { start: s, end: l };
};

// src/lib/predicate/utils/calculateRelativePeriod.ts
var _e = (e, i, a = 1) => {
  a <= 0 && (a = 1);
  let t = /* @__PURE__ */ new Date(), r = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())
  );
  switch (i) {
    case E.DAY:
      return Ce(r, e, a);
    case E.WEEK:
      return Re(r, e, a);
    case E.MONTH:
      return ve(r, e, a);
    case E.YEAR:
      return Ee(r, e, a);
    default:
      throw new Error(`Unsupported time scope: ${i}`);
  }
};

// src/lib/predicate/utils/isDateInRelativePeriod.ts
var Ae = (e, i) => {
  let { position: a, scope: t, quantity: r = 1 } = i, { start: o, end: s } = _e(a, t, r), l = new Date(e), p = Date.UTC(
    l.getFullYear(),
    l.getMonth(),
    l.getDate()
  );
  return p >= o && p <= s;
};

// src/lib/predicate/utils/dateCompareAgainst.ts
var me = (e) => (e = new Date(e).setUTCHours(0, 0, 0, 0), {
  isSameDate: (l) => {
    let p = H(l);
    return e === p;
  },
  isAfterDate: (l) => {
    let p = H(l);
    return e > p;
  },
  isBeforeDate: (l) => {
    let p = H(l);
    return e < p;
  },
  isOnOrBeforeDate: (l) => {
    let p = H(l);
    return e <= p;
  },
  isOnOrAfterDate: (l) => {
    let p = H(l);
    return e >= p;
  },
  isInRelativePeriod: (l) => Ae(e, l)
});

// src/lib/predicate/utils/getRights.ts
var Ie = (e, i) => {
  var a;
  switch (e.operator) {
    case "noOp":
      return;
    case "is_empty":
    case "is_not_empty":
      return;
    case "between":
    case "outside": {
      let [t, r] = Fe(
        e.right
      );
      return e.rightLowerboundMode === "variable" && (t = Number(i[String(t)])), e.rightUpperboundMode === "variable" && (r = Number(i[String(r)])), [Number(t), Number(r)];
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
        throw new f(
          `Rule Execution failed for operator '${e.operator}' with right-hand value: ${JSON.stringify(e.right)}`
        );
      let t = e.rightMode === "variable" ? i[String(e.right)] : e.right;
      return t != null ? t : void 0;
    }
    case "contains":
    case "not_contains":
      return Array.isArray(e.right) ? e.right : e.rightMode === "variable" ? (a = i[String(e.right)]) != null ? a : void 0 : e.right;
  }
};

// src/lib/predicate/executePredicate.ts
function _(e, i, a) {
  if (e.operator === "noOp")
    return !0;
  if (e.operator === "and") {
    let o = _(e.left, i, a), s = _(
      e.right,
      i,
      a
    );
    return o && s;
  }
  if (e.operator === "or") {
    let o = _(e.left, i, a), s = _(
      e.right,
      i,
      a
    );
    return o || s;
  }
  if (typeof e.left != "string")
    throw new f(
      `Rule Execution failed. Left operand of leaf rule must be of type string but received left operand '${e.left}' of type '${typeof e.left}'`
    );
  let t = i[e.left];
  if (t === void 0 && e.operator !== "is_empty") return !1;
  let r = Ie(e, a);
  if (e.type === "date" && e.operator !== "is_empty" && e.operator !== "is_not_empty" && (typeof r == "number" || typeof r == "string")) {
    if (!t)
      throw new f(
        `Rule Execution failed. Left operand of a date-rule with operator '${e.operator}' cannot be empty.'`
      );
    let o = ie(t), s = me(o);
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
      throw new f(
        "Rule Execution failed. Left operand and/or isRelativeConfig cannot be empty."
      );
    let o = ie(t);
    return me(o).isInRelativePeriod(e.isRelativeConfig);
  }
  if (e.type === "country" && Array.isArray(r)) {
    let o = K(String(t));
    if (o) {
      let s = r.some((l) => {
        let p = K(String(l));
        return o.isoAlpha2 === (p == null ? void 0 : p.isoAlpha2) || o.name === (p == null ? void 0 : p.name);
      });
      if (e.operator === "contains") return s;
      if (e.operator === "not_contains") return !s;
    }
  }
  if (e.operator === "contains" && Array.isArray(r)) {
    let o;
    try {
      o = JSON.parse(String(t));
    } catch (s) {
      o = [t];
    }
    if (Array.isArray(o)) {
      if (o.length === 0) return !1;
      let s = new Set(
        r.map(
          (l) => typeof l == "string" ? l.toLowerCase() : l
        )
      );
      return o.some((l) => {
        if (typeof l != "string")
          throw new f(
            `Rule Execution failed. Left operand of a contains-rule must be of type string but received '${l}' of type '${typeof l}'`
          );
        return s.has(l.toLowerCase());
      });
    }
  }
  if (e.operator === "not_contains" && Array.isArray(r)) {
    let o;
    try {
      o = JSON.parse(String(t));
    } catch (s) {
      o = [t];
    }
    if (Array.isArray(o)) {
      if (o.length === 0) return !0;
      let s = new Set(
        r.map(
          (l) => typeof l == "string" ? l.toLowerCase() : l
        )
      );
      return o.every((l) => {
        if (typeof l != "string")
          throw new f(
            `Rule Execution failed. Left operand of a not_contains-rule must be of type string but received '${l}' of type '${typeof l}'`
          );
        return !s.has(l.toLowerCase());
      });
    }
  }
  if (e.operator === "contains" && typeof r == "string") {
    try {
      let o = JSON.parse(String(t));
      if (Array.isArray(o))
        throw new f(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
    } catch (o) {
    }
    return !!(t != null && t.toLocaleString().toLowerCase().includes(r.toLowerCase()));
  }
  if (e.operator === "not_contains" && typeof r == "string") {
    try {
      let o = JSON.parse(String(t));
      if (Array.isArray(o))
        throw new f(
          "Rule Execution failed. Expected left to be of type string for a contains rule with rights of type string, but received an array"
        );
    } catch (o) {
    }
    return !(t != null && t.toLocaleString().toLowerCase().includes(r.toLowerCase()));
  }
  if (e.type === "country" && typeof r == "string") {
    let o = K(r), s = K(String(t));
    if (s && o) {
      let l = s.isoAlpha2 === o.isoAlpha2;
      if (e.operator === "equals") return l;
      if (e.operator === "not_equals") return !l;
    }
  }
  if (e.operator === "equals") {
    if (typeof t == "string" && typeof r == "string")
      return t.toLowerCase() === r.toLowerCase();
    let o = typeof t == "string" && e.type === "boolean" ? t.toLowerCase() === "true" : t, s = typeof r == "string" && e.type === "boolean" ? r.toLowerCase() === "true" : r;
    return o == s && !Number.isNaN(o);
  }
  if (e.operator === "not_equals") {
    if (typeof t == "string" && typeof r == "string")
      return t.toLowerCase() !== r.toLowerCase();
    let o = typeof t == "string" && e.type === "boolean" ? t.toLowerCase() === "true" : t, s = typeof r == "string" && e.type === "boolean" ? r.toLowerCase() === "true" : r;
    return o != s && !Number.isNaN(o);
  }
  if (e.operator === "less_than")
    return !Number.isNaN(Number(t)) && Number(t) < Number(r);
  if (e.operator === "greater_than")
    return Number(t) > Number(r) && !Number.isNaN(Number(t));
  if (e.operator === "between") {
    if (!Array.isArray(r))
      throw new f(
        `Rule Execution failed. Failed to extract bounds of rule ${e.right}`
      );
    let o = r[0], s = r[1];
    return Number(t) >= Number(o) && Number(t) <= Number(s);
  }
  if (e.operator === "outside") {
    if (!Array.isArray(r))
      throw new f(
        `Rule Execution failed. Failed to extract bounds of rule ${e.right}`
      );
    let o = r[0], s = r[1];
    return Number(t) < Number(o) || Number(t) > Number(s);
  }
  if (e.type === "matrix") {
    Pe(r);
    let o = typeof t == "string" ? t.toLowerCase() : t, s = r.some(
      (l) => l.some((p) => p.trim().toLowerCase() === o)
    );
    if (e.operator === "is_in") return s;
    if (e.operator === "is_not_in") return !s;
  }
  throw new f(
    `Rule Execution failed for predicate ${JSON.stringify(e)}.`
  );
}

// src/lib/formEvaluation/utils/evaluateLogicalField.ts
function ne(e, i) {
  var r;
  if (!(e != null && e.segment) || !Array.isArray((r = e.segment) == null ? void 0 : r.groups) || e.segment.groups.length === 0)
    return !1;
  let a = e.segment.groups.map(
    (o) => _(o.rule, i, i)
  ).every((o) => !!o);
  return e.output === le.Enum.show ? a : !a;
}

// src/lib/formEvaluation/formEvaluation.ts
function ze(e, i) {
  if (!ue(e.fields))
    return re(e.fields, e.order);
  let a = [];
  return re(e.fields, e.order).forEach((t) => {
    if (G(t)) {
      ne(t, i) && a.push(
        ...re(t.form.fields, t.form.order)
      );
      return;
    }
    a.push(t);
  }), a;
}

// src/constants/supportedLanguages.ts
var ke = [
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
function Ne(e) {
  return ke.includes(
    e
  );
}

// src/lib/translations/utils/translateNaceCodes.ts
import { produce as yt } from "immer";

// src/utils/cdn.ts
var gt = "https://platform.spektr.com/";
function Le(e) {
  return new URL(`assets/data/${e}/nace-codes.json`, gt).toString();
}

// src/lib/translations/utils/translateNaceCodes.ts
async function je(e, i) {
  let a = await fetch(Le(i)).then(
    (r) => r.json()
  );
  if (!Array.isArray(a))
    throw new Error(`NACE codes not found for language: ${i}`);
  let t = a.map((r) => {
    let o = `${r.section}${r.code}`, s = `${o} - ${r.name}`;
    return r.level && Number(r.level) > 1 && (s += ` (${r.level})`), { value: o, label: s };
  });
  return yt(e, (r) => {
    r.attributes.options = t;
  });
}

// src/lib/translations/translateFields.ts
async function de(e, i) {
  let a = "en-US";
  i && Ne(i) && (a = i);
  let t = {};
  for (let [r, o] of Object.entries(e))
    if (te(o) || G(o)) {
      let s = await de(
        o.form.fields,
        a
      );
      t[r] = {
        ...o,
        form: {
          ...o.form,
          // Because the `fields` property is defined separate of Field,
          // we need to cast it to `any` to avoid TypeScript errors.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: s
        }
      };
    } else if (ge(o) && o.config.spektrDataField === "nace_code") {
      let s = await je(o, a);
      t[r] = s;
    } else
      t[r] = o;
  return t;
}

// src/SpektrSdk.ts
var Ft = {
  executePredicate: _,
  formEvaluation: ze,
  translateFields: de,
  evaluateConditionalField: ne
}, bt = Ft;
export {
  Ft as SpektrSdk,
  bt as default
};
//# sourceMappingURL=index.mjs.map