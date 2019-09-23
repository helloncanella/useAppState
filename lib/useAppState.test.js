"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _reactTesting = require("@apollo/react-testing");

var _react = _interopRequireDefault(require("react"));

var _useAppState9 = _interopRequireDefault(require("./useAppState"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _enzymeMounting = require("./test-utils/enzymeMounting");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  query Any($label: String) {\n    hello(label: $label) @client\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var QUERY = (0, _graphqlTag["default"])(_templateObject());
describe("useAppState", function () {
  test("it allows communication between two isolated components",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var ComponentA, ComponentB, el, elemB, setValueInB, elemA, valueA;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ComponentB = function _ref3() {
              var _useAppState3 = (0, _useAppState9["default"])({
                query: QUERY
              }),
                  _useAppState4 = (0, _slicedToArray2["default"])(_useAppState3, 2),
                  __ = _useAppState4[0],
                  setValue = _useAppState4[1];

              return _react["default"].createElement("input", {
                type: "text",
                onChange: function onChange(e) {
                  setValue(e.target.value);
                }
              });
            };

            ComponentA = function _ref2() {
              var _useAppState = (0, _useAppState9["default"])({
                query: QUERY
              }),
                  _useAppState2 = (0, _slicedToArray2["default"])(_useAppState, 1),
                  value = _useAppState2[0];

              return _react["default"].createElement("div", {
                "data-value": value
              });
            };

            el = (0, _enzymeMounting.mount)(_react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(ComponentA, null), _react["default"].createElement(ComponentB, null)));
            elemB = el.find(ComponentB);
            setValueInB = Math.random() + "";
            elemB.find("input").prop("onChange")({
              target: {
                value: setValueInB
              }
            });
            _context.next = 8;
            return (0, _reactTesting.wait)(0);

          case 8:
            el.update();
            elemA = el.find(ComponentA);
            valueA = elemA.find("div").prop("data-value");
            expect(valueA).toBe(setValueInB);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test("different variables controls different states",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var Component, component, getEl, valueA, valueB;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Component = function _ref5() {
              var _useAppState5 = (0, _useAppState9["default"])({
                query: QUERY,
                variables: {
                  label: "A"
                }
              }),
                  _useAppState6 = (0, _slicedToArray2["default"])(_useAppState5, 2),
                  valueA = _useAppState6[0],
                  setValueA = _useAppState6[1];

              var _useAppState7 = (0, _useAppState9["default"])({
                query: QUERY,
                variables: {
                  label: "B"
                }
              }),
                  _useAppState8 = (0, _slicedToArray2["default"])(_useAppState7, 2),
                  valueB = _useAppState8[0],
                  setValueB = _useAppState8[1];

              var onChange = function onChange(fn) {
                return function (e) {
                  fn(e.target.value);
                };
              };

              return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("input", {
                "data-label": "A",
                value: valueA,
                onChange: onChange(setValueA)
              }), _react["default"].createElement("input", {
                "data-label": "B",
                value: valueB,
                onChange: onChange(setValueB)
              }));
            };

            component = (0, _enzymeMounting.mount)(_react["default"].createElement(Component, null));

            getEl = function getEl(label) {
              return component.find("[data-label='".concat(label, "']"));
            };

            ["A", "B"].forEach(function (label) {
              return getEl(label).prop("onChange")({
                target: {
                  value: Math.random() + ""
                }
              });
            });
            _context2.next = 6;
            return (0, _reactTesting.wait)(0);

          case 6:
            component.update();
            valueA = getEl("A").prop("value");
            valueB = getEl("B").prop("value");
            expect(valueB).not.toBe(valueA);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});