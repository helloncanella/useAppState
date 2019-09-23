"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dog = Dog;
exports.GET_DOG_QUERY = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _reactHooks = require("@apollo/react-hooks");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  query getDog($name: String) {\n    dog(name: $name) {\n      id\n      name\n      breed\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var GET_DOG_QUERY = (0, _graphqlTag["default"])(_templateObject());
exports.GET_DOG_QUERY = GET_DOG_QUERY;

function Dog(_ref) {
  var name = _ref.name;

  var _useQuery = (0, _reactHooks.useQuery)(GET_DOG_QUERY, {
    variables: {
      name: name
    }
  }),
      loading = _useQuery.loading,
      error = _useQuery.error,
      data = _useQuery.data;

  if (loading) return _react["default"].createElement("p", null, "Loading...");
  if (error) return _react["default"].createElement("p", null, "Error!");
  var lero = "".concat(data.dog.name, " is a ").concat(data.dog.breed);
  return _react["default"].createElement("p", null, lero);
}