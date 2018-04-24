'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _diffState = require('./utils/diff-state');

var _diffState2 = _interopRequireDefault(_diffState);

var _reduxDevtools = require('redux-devtools');

var _aphrodite = require('aphrodite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reset = _reduxDevtools.ActionCreators.reset,
    rollback = _reduxDevtools.ActionCreators.rollback,
    commit = _reduxDevtools.ActionCreators.commit,
    toggleAction = _reduxDevtools.ActionCreators.toggleAction,
    jumpToState = _reduxDevtools.ActionCreators.jumpToState;

var ManifestComponent = function (_React$Component) {
  _inherits(ManifestComponent, _React$Component);

  function ManifestComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ManifestComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ManifestComponent.__proto__ || Object.getPrototypeOf(ManifestComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleJumpTo = function (id) {
      _this.props.dispatch(jumpToState(id));
    }, _this.handleToggleAction = function (id) {
      _this.props.dispatch(toggleAction(id));
    }, _this.renderAction = function (id) {
      var action = _this.props.actionsById[id];
      var diffedStates = (0, _diffState2.default)(_this.props.computedStates, id);
      var skippingAction = _this.props.skippedActionIds.indexOf(id) !== -1;

      return _react2.default.createElement(_action2.default, {
        action: action,
        index: id,
        key: id,
        diff: diffedStates,
        skipped: skippingAction,
        toggleAction: function toggleAction() {
          return _this.handleToggleAction(id);
        },
        jumpTo: function jumpTo() {
          return _this.handleJumpTo(id);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ManifestComponent, [{
    key: 'render',
    value: function render() {
      var actionReports = this.props.stagedActionIds.map(this.renderAction);
      var dispatch = this.props.dispatch;


      return _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.wrap) },
        _react2.default.createElement(
          'div',
          { className: (0, _aphrodite.css)(styles.container) },
          _react2.default.createElement(_button2.default, { label: 'Commit', action: function action() {
              return dispatch(commit());
            } }),
          _react2.default.createElement(_button2.default, { label: 'Rollback', action: function action() {
              return dispatch(rollback());
            } }),
          _react2.default.createElement(_button2.default, { label: 'Reset', action: function action() {
              return dispatch(reset());
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _aphrodite.css)(styles.actions) },
          actionReports.reverse()
        )
      );
    }
  }]);

  return ManifestComponent;
}(_react2.default.Component);

ManifestComponent.propTypes = {
  computedStates: _propTypes2.default.array,
  actionsById: _propTypes2.default.object,
  stagedActionIds: _propTypes2.default.array,
  skippedActionIds: _propTypes2.default.array,
  dispatch: _propTypes2.default.func
};

ManifestComponent.update = function () {};

exports.default = ManifestComponent;


var styles = _aphrodite.StyleSheet.create({
  wrap: {
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderBottom: '1px solid #ddd'
  },
  actions: {
    margin: '10px'
  }
});