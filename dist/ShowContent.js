'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContextFile = require('./ContextFile');

var _ContextFile2 = _interopRequireDefault(_ContextFile);

var _ContentProvider = require('./ContentProvider');

var _ContentProvider2 = _interopRequireDefault(_ContentProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (WrappedComponent) {
  return function (props) {
    return _react2.default.createElement(
      _ContentProvider2.default,
      null,
      _react2.default.createElement(
        _ContextFile2.default.Consumer,
        null,
        function (_ref) {
          var cmsContent = _ref.cmsContent,
              cmsError = _ref.cmsError,
              setData = _ref.setData,
              loading = _ref.loading;

          return _react2.default.createElement(WrappedComponent, _extends({}, props, {
            cmsContent: cmsContent,
            cmsError: cmsError,
            setData: setData,
            loading: loading
          }));
        }
      )
    );
  };
};