'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ContextFile = require('./ContextFile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import fetch from 'axios'


var ContentProvider = function (_React$Component) {
  _inherits(ContentProvider, _React$Component);

  function ContentProvider(props) {
    var _this2 = this;

    _classCallCheck(this, ContentProvider);

    var _this = _possibleConstructorReturn(this, (ContentProvider.__proto__ || Object.getPrototypeOf(ContentProvider)).call(this, props));

    _this.getdata = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var language, routeCode, collection, er, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('------- data-----------', data);
                language = data.language, routeCode = data.routeCode, collection = data.collection;

                if (language && language === '' && language === undefined || routeCode && routeCode === '' && routeCode === undefined) {
                  er = 'Specify the correct route and language key';

                  _this.setState({ cmsError: er });
                } else {
                  response = fetch('http://localhost:1337/' + collection + 's?routeCode=' + routeCode).then(function (data) {
                    data.json().then(function (array) {
                      var x = array;
                      var obj = {};
                      x.map(function (element) {
                        obj[element.code] = element[language];
                      });
                      _this.setState({ cmsContent: obj });
                    }).catch(function (err) {
                      return _this.setState({ cmsError: err });
                    });
                  }).catch(function (err) {
                    return _this.setState({ cmsError: err });
                  });
                }

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.state = {
      cmsContent: {},
      cmsError: ''
    };
    return _this;
  }

  //*********  Function to fetch data from collection on the basis of routeCode **************** 


  _createClass(ContentProvider, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          cmsContent = _state.cmsContent,
          cmsError = _state.cmsError;

      var value = {
        cmsContent: cmsContent,
        cmsError: cmsError,
        setData: this.getdata
      };
      console.log("value------------------", value);
      return _react2.default.createElement(
        _ContextFile.Provider,
        {
          value: value },
        this.props.children
      );
    }
  }]);

  return ContentProvider;
}(_react2.default.Component);

ContentProvider.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = ContentProvider;