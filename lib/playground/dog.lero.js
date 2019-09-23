"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _reactTesting = require("@apollo/react-testing");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _dog = require("./dog");

// The component AND the query need to be exported
var wait = require("waait");

it("renders without error",
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var dogMock, component, p;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dogMock = {
            request: {
              query: _dog.GET_DOG_QUERY,
              variables: {
                name: "Buck"
              }
            },
            result: {
              data: {
                dog: {
                  id: 1,
                  name: "Buck",
                  breed: "poodle"
                }
              }
            }
          };
          component = _reactTestRenderer["default"].create(_react["default"].createElement(_reactTesting.MockedProvider, {
            mocks: [dogMock],
            addTypename: false
          }, _react["default"].createElement(_dog.Dog, {
            name: "Buck"
          })));
          _context.next = 4;
          return wait(0);

        case 4:
          p = component.root.findByType("p");
          expect(p.children).toContain("Buck is a poodle");

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
it("renders without error",
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee2() {
  var dogMock, component, p;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dogMock = {
            request: {
              query: _dog.GET_DOG_QUERY,
              variables: {
                name: "Buck"
              }
            },
            result: {
              data: {
                dog: {
                  id: 1,
                  name: "Buck",
                  breed: "poodle"
                }
              }
            }
          };
          component = _reactTestRenderer["default"].create(_react["default"].createElement(_reactTesting.MockedProvider, {
            mocks: [dogMock],
            addTypename: false
          }, _react["default"].createElement(_dog.Dog, {
            name: "Buck"
          })));
          _context2.next = 4;
          return wait(0);

        case 4:
          p = component.root.findByType("p");
          expect(p.children).toContain("Buck is a poodle");

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));