{
  "env": {
    "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "mocha": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "accessor-pairs": "error",
    "array-bracket-spacing": ["warn", "never"],
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "block-spacing": [2, "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": [0, { "properties": "always" }],
    "comma-dangle": "error",
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "comma-style": ["error", "last", {
      "exceptions": {} 
    }],
    "complexity": ["warn", 3],
    "computed-property-spacing": ["error", "never"],
    "consistent-this": "off",
    "consistent-return": "error",
    "curly": "error",
    "default-case": "error",
    "dot-location": ["error", "property"],
    "dot-notation": "off",
    "eol-last": "error",
    "eqeqeq": ["error", "smart"],
    "func-names": "off",
    "func-style": ["off", "expression"],
    "guard-for-in": "error",
    "indent": ["error", 2],
    "init-declarations": "off",
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": ["error", { 
      "before": false,
      "after": true,
      "overrides": {
        "else": { "before": true },
        "throw": { "before": true }
      }
    }],
    "linebreak-style": ["error", "unix"],
    "lines-around-comment": "error",
    "max-depth": ["warn", 4],
    "max-len": ["error", 80, 4, { "ignoreUrls": true }],
    "max-nested-callbacks": ["warn", 3],
    "max-statements-per-line": ["warn", { 
      "max": 3
    }],
    "new-cap": "error",
    "new-parens": "error",
    "newline-after-var": ["error", "always"],
    "newline-before-return": "warn",
    "newline-per-chained-call": ["error", {
      "ignoreChainWithDepth": 3
    }],
    "no-alert": "warn",
    "no-array-constructor": "error",
    "no-bitwise": "warn",
    "no-catch-shadow": "error",
    "no-continue": "warn",
    "no-underscore-dangle": ["error", {
      "allowAfterThis": true
    }],
    "no-inline-comments": "warn",
    "no-extra-semi": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": "error",
    "no-ex-assign": "error",
    "no-fallthrough": "warn",
    "no-floating-decimal": "error",
    "no-func-assign": "error",
    "no-inner-declarations": "warn",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "warn",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": ["warn", {
      "ignoreArrayIndexes": true ,
      "detectObjects": true
    }],
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": ["error", {"max": 2}],
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-negated-condition": "warn",
    "no-negated-in-lhs": "warn",
    "no-native-reassign": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-plusplus": ["warn", {
      "allowForLoopAfterthoughts": true 
    }],
    "no-proto": "error",
    "no-labels": "error",
    "no-obj-calls": "error",
    "no-redeclare": "error",
    "no-restricted-globals": "off",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow":  ["error", { 
      "builtinGlobals": false, 
      "hoist": "functions", 
      "allow": []
    }], 
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-spaced-func": "error",
    "no-ternary": "off",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": ["error", {
      "allowTernary": true,
      "allowShortCircuit": true
    }],
    "no-unreachable": "error",
    "no-unused-labels": "error",
    "no-unused-vars": "warn",
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": false
    }],
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-void": "error",
    "no-warning-comments": "off",
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "object-curly-spacing": ["error", "always"],
    "one-var": "off",
    "one-var-declaration-per-line": ["warn", "always"],
    "operator-assignment": ["warn", "always"],
    "operator-linebreak": ["error", "after"],
    "padded-blocks": ["off", "never"],
    "quote-props": ["error", "consistent-as-needed", {
      "keywords": true 
    }],
    "quotes": ["error", "double"],
    "radix": ["error", "as-needed"],
    "spaced-comment": ["error", "always"],
    "semi": ["error", "always"],
    "semi-spacing": ["warn", {"before": false, "after": true}],
    "sort-vars": ["off", {
      "ignoreCase": true 
    }],
    "space-infix-ops": "error",
    "space-in-parens": ["error", "never"],
    "space-unary-ops": "error",
    "use-isnan": "warn",
    "wrap-iife": ["error", "any"],
    "wrap-regex": "error",
    "valid-typeof": "warn",
    "vars-on-top": "error",
    "yoda": ["error", "never", {
      "exceptRange": true
    }]
  }
}
