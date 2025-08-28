# spektr - public client sdk

### evaluateLogicalField(field, context)

- If all rules are `true` and output is show => returns `true`
- If all rules are `true` and output is hide => return `false`
- If not all rules are `true` and output is show => return false
- If not all rules are `true` and output is hide => return `true`

```typescript
import { spektrSdk } from "@spektr-ai/client-sdk";

// Example conditional field
const conditionalField = {
  id: "0d1f3c6a-dc06-40f5-b8bf-3393e6cdd0f0",
  config: {
    spektrDataField: "conditional_field",
    prefillDefaultValue: true,
  },
  isStructured: true,
  type: "conditional",
  validation: [],
  segment: {
    title: "Conditions",
    weight: 100,
    groups: [
      {
        id: "1",
        title: "Rule #1",
        score: 100,
        rule: {
          operator: "contains",
          type: "country",
          groupRoot: true,
          left: "country_residence",
          right: ["DK", "FR"],
        },
      },
    ],
    id: "67b3154320e53146839a6e74",
  },
  output: "show",
  form: {
    fields: {
      "51b9f9c3-b590-408b-afff-5eb70e041b5a": {
        id: "51b9f9c3-b590-408b-afff-5eb70e041b5a",
        config: {
          spektrDataField: "state",
          prefillDefaultValue: true,
        },
        isStructured: true,
        type: "input",
        attributes: {
          label: "State/Region",
          name: "state",
          type: "state",
          placeholder: "",
          countryField: "country_residence",
          internalId: "",
        },
        validation: [
          {
            type: "required",
            value: true,
            message: "This field is required",
          },
        ],
      },
    },
    order: ["51b9f9c3-b590-408b-afff-5eb70e041b5a"],
  },
};

// Context data for evaluation
const context = {
  phone: "1234567890",
  country_residence: "DK",
};

// Evaluate if the conditional field should be shown
const shouldShow = spektrSdk.evaluateConditionalField(
  conditionalField,
  context
);
console.log(shouldShow); // true (field should be displayed)

// Example with "hide" output
const hideConditionalField = {
  ...conditionalField,
  output: "hide",
};

const shouldHide = spektrSdk.evaluateConditionalField(
  hideConditionalField,
  context
);
console.log(shouldHide); // false (field should be hidden)
```
