"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAppState;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactHooks = require("@apollo/react-hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useAppState() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      query = _ref.query,
      variables = _ref.variables;

  if (_lodash["default"].isEmpty(query)) throw new Error("Missing query");

  var _useQuery = (0, _reactHooks.useQuery)(query, _objectSpread({
    fetchPolicy: "cache-only"
  }, variables ? {
    variables: variables
  } : {})),
      data = _useQuery.data;

  var queryField = getQueryField(query);

  var appState = _lodash["default"].get(data, queryField);

  var setAppState = useWriteQuery({
    query: query,
    variables: variables
  });
  return [appState, setAppState];
}

function useWriteQuery(_ref2) {
  var query = _ref2.query,
      variables = _ref2.variables;
  var client = (0, _reactHooks.useApolloClient)();
  var queryField = getQueryField(query);
  return function writeQuery(data) {
    client.writeQuery(_objectSpread({
      query: query
    }, variables ? {
      variables: variables
    } : {}, {
      data: (0, _defineProperty2["default"])({}, queryField, data)
    }));
  };
}

function getQueryField(query) {
  var operation = _lodash["default"].get(query, "definitions").find(function (q) {
    return q.operation === "query";
  });

  if (!operation) throw new Error("You should pass an query operation");

  var queryField = _lodash["default"].get(operation, "selectionSet.selections.0.name.value");

  return queryField;
}