"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallow = exports.mount = void 0;

var _enzyme = require("enzyme");

var _reactTesting = require("@apollo/react-testing");

var apolloOptions = {
  wrappingComponent: _reactTesting.MockedProvider,
  wrappingComponentProps: {
    mocks: []
  }
};

var mount = function mount(a) {
  return (0, _enzyme.mount)(a, apolloOptions);
};

exports.mount = mount;

var shallow = function shallow(a) {
  return (0, _enzyme.shallow)(a, apolloOptions);
};

exports.shallow = shallow;