'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _countries = require('./countries');

var _countries2 = _interopRequireDefault(_countries);

require('../css/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactFlagsSelect = function (_Component) {
	_inherits(ReactFlagsSelect, _Component);

	function ReactFlagsSelect(props) {
		_classCallCheck(this, ReactFlagsSelect);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		var fullCountries = Object.keys(_countries2.default);

		var selectCountries = _this.props.countries && _this.props.countries.filter(function (country) {
			return _countries2.default[country];
		});
		var defaultCountry = _countries2.default[_this.props.defaultCountry] && _this.props.defaultCountry;

		_this.state = {
			openOptions: false,
			countries: selectCountries || fullCountries,
			defaultCountry: defaultCountry
		};

		_this.toggleOptions = _this.toggleOptions.bind(_this);
		_this.closeOptions = _this.closeOptions.bind(_this);
		_this.onSelect = _this.onSelect.bind(_this);
		return _this;
	}

	ReactFlagsSelect.prototype.toggleOptions = function toggleOptions() {
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	};

	ReactFlagsSelect.prototype.closeOptions = function closeOptions(event) {
		if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions) {
			this.setState({
				openOptions: false
			});
		}
	};

	ReactFlagsSelect.prototype.onSelect = function onSelect(countryCode) {
		this.setState({
			selected: countryCode
		});
		this.props.onSelect && this.props.onSelect(countryCode);
	};

	ReactFlagsSelect.prototype.updateSelected = function updateSelected(country) {
		var isValid = _countries2.default[country];

		isValid && this.setState({
			selected: country
		});
	};

	ReactFlagsSelect.prototype.componentDidMount = function componentDidMount() {
		!this.props.disabled && window.addEventListener("click", this.closeOptions);
	};

	ReactFlagsSelect.prototype.componentWillUnmount = function componentWillUnmount() {
		!this.props.disabled && window.removeEventListener("click", this.closeOptions);
	};

	ReactFlagsSelect.prototype.render = function render() {
		var _this2 = this;

		var isSelected = this.state.selected || this.state.defaultCountry;
		var selectedSize = this.props.selectedSize;
		var optionsSize = this.props.optionsSize;
		var alignClass = this.props.alignOptions.toLowerCase() === 'right' ? 'to--right' : '';

		return _react2.default.createElement(
			'div',
			{ className: 'flag-select ' + (this.props.className ? this.props.className : "") },
			_react2.default.createElement(
				'div',
				{ ref: 'selectedFlag', style: { fontSize: selectedSize + 'px' }, className: 'selected--flag--option ' + (this.props.disabled ? 'no--focus' : ''), onClick: this.toggleOptions },
				isSelected && _react2.default.createElement(
					'span',
					{ className: 'country-flag' },
					_react2.default.createElement('span', {
						style: { width: selectedSize + 'px', height: selectedSize + 'px' },
						dangerouslySetInnerHTML: { __html: require('!svg-inline-loader!../flags/' + isSelected.toLowerCase() + '.svg') } }),
					this.props.showSelectedLabel && _react2.default.createElement(
						'span',
						{ className: 'country-label' },
						this.props.customLabels[isSelected] || _countries2.default[isSelected]
					)
				),
				!isSelected && _react2.default.createElement(
					'span',
					{ className: 'country-label' },
					this.props.placeholder
				),
				_react2.default.createElement(
					'span',
					{ className: 'arrow-down ' + (this.props.disabled ? 'hidden' : '') },
					'\u25BE'
				)
			),
			this.state.openOptions && _react2.default.createElement(
				'div',
				{ ref: 'flagOptions', style: { fontSize: optionsSize + 'px' }, className: 'flag-options ' + alignClass },
				this.state.countries.map(function (countryCode) {
					return _react2.default.createElement(
						'div',
						{ className: 'flag-option', key: countryCode, onClick: function onClick() {
								return _this2.onSelect(countryCode);
							} },
						_react2.default.createElement(
							'span',
							{ className: 'country-flag' },
							_react2.default.createElement('span', {
								style: { width: optionsSize + 'px', height: optionsSize + 'px' },
								dangerouslySetInnerHTML: { __html: require('!svg-inline-loader!../flags/' + countryCode.toLowerCase() + '.svg') } }),
							_this2.props.showOptionLabel && _react2.default.createElement(
								'span',
								{ className: 'country-label' },
								_this2.props.customLabels[countryCode] || _countries2.default[countryCode]
							)
						)
					);
				})
			)
		);
	};

	return ReactFlagsSelect;
}(_react.Component);

ReactFlagsSelect.defaultProps = {
	selectedSize: 16,
	optionsSize: 14,
	placeholder: "Select a country",
	showSelectedLabel: true,
	showOptionLabel: true,
	alignOptions: 'left',
	customLabels: [],
	disabled: false
};

ReactFlagsSelect.propsType = {
	countries: _propTypes2.default.array,
	customLabels: _propTypes2.default.array,
	selectedSize: _propTypes2.default.number,
	optionsSize: _propTypes2.default.number,
	defaultCountry: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	className: _propTypes2.default.string,
	showSelectedLabel: _propTypes2.default.bool,
	showOptionLabel: _propTypes2.default.bool,
	alignOptions: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,
	disabled: _propTypes2.default.bool
};

exports.default = ReactFlagsSelect;
module.exports = exports['default'];