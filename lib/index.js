'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _countries = require('./countries');

var _countries2 = _interopRequireDefault(_countries);

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

		//Filter BlackList
		selectCountries = !_this.props.blackList ? selectCountries : fullCountries.filter(function (countryKey) {
			return selectCountries.filter(function (country) {
				return countryKey === country;
			}).length === 0;
		});

		var defaultCountry = _countries2.default[_this.props.defaultCountry] && _this.props.defaultCountry;

		_this.state = {
			openOptions: false,
			countries: selectCountries || fullCountries,
			defaultCountry: defaultCountry,
			filteredCountries: []
		};

		_this.toggleOptions = _this.toggleOptions.bind(_this);
		_this.closeOptions = _this.closeOptions.bind(_this);
		_this.onSelect = _this.onSelect.bind(_this);
		_this.filterSearch = _this.filterSearch.bind(_this);
		return _this;
	}

	ReactFlagsSelect.prototype.toggleOptions = function toggleOptions() {
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	};

	ReactFlagsSelect.prototype.closeOptions = function closeOptions(event) {
		if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions && event.target !== this.refs.filterText) {
			this.setState({
				openOptions: false
			});
		}
	};

	ReactFlagsSelect.prototype.onSelect = function onSelect(countryCode) {
		this.setState({
			selected: countryCode,
			filter: ''
		});
		this.props.onSelect && this.props.onSelect(countryCode);
	};

	ReactFlagsSelect.prototype.updateSelected = function updateSelected(countryCode) {
		var isValid = _countries2.default[countryCode];

		isValid && this.setState({
			selected: countryCode
		});
	};

	ReactFlagsSelect.prototype.filterSearch = function filterSearch(evt) {
		var _this2 = this;

		var filterValue = evt.target.value;
		var filteredCountries = filterValue && this.state.countries.filter(function (key) {
			var label = _this2.props.customLabels[key] || _countries2.default[key];
			return label && label.match(new RegExp(filterValue, 'i'));
		});

		this.setState({ filter: filterValue, filteredCountries: filteredCountries });
	};

	ReactFlagsSelect.prototype.componentDidMount = function componentDidMount() {
		!this.props.disabled && window.addEventListener("click", this.closeOptions);
	};

	ReactFlagsSelect.prototype.componentWillUnmount = function componentWillUnmount() {
		!this.props.disabled && window.removeEventListener("click", this.closeOptions);
	};

	ReactFlagsSelect.prototype.render = function render() {
		var _this3 = this;

		var isSelected = this.state.selected || this.state.defaultCountry;
		var selectedSize = this.props.selectedSize;
		var optionsSize = this.props.optionsSize;
		var alignClass = this.props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

		return _react2.default.createElement(
			'div',
			{ className: 'flag-select ' + (this.props.className ? this.props.className : "") },
			_react2.default.createElement(
				'div',
				{ ref: 'selectedFlag', style: { fontSize: selectedSize + 'px' }, className: 'selected--flag--option ' + (this.props.disabled ? 'no--focus' : ''), onClick: this.toggleOptions },
				isSelected && _react2.default.createElement(
					'span',
					{ className: 'country-flag', style: { width: selectedSize + 'px', height: selectedSize + 'px' } },
					_react2.default.createElement('img', { src: require('../flags/' + isSelected.toLowerCase() + '.svg') }),
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
				this.props.searchable && _react2.default.createElement(
					'div',
					{ className: 'filterBox' },
					_react2.default.createElement('input', { type: 'text', placeholder: 'Search', ref: 'filterText', onChange: this.filterSearch })
				),
				(this.state.filter ? this.state.filteredCountries : this.state.countries).map(function (countryCode) {
					return _react2.default.createElement(
						'div',
						{ className: 'flag-option ' + (_this3.props.showOptionLabel ? 'has-label' : ''), key: countryCode, onClick: function onClick() {
								return _this3.onSelect(countryCode);
							} },
						_react2.default.createElement(
							'span',
							{ className: 'country-flag', style: { width: optionsSize + 'px', height: optionsSize + 'px' } },
							_react2.default.createElement('img', { src: require('../flags/' + countryCode.toLowerCase() + '.svg') }),
							_this3.props.showOptionLabel && _react2.default.createElement(
								'span',
								{ className: 'country-label' },
								_this3.props.customLabels[countryCode] || _countries2.default[countryCode]
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
	alignOptions: "right",
	customLabels: [],
	disabled: false,
	blackList: false,
	searchable: false
};

ReactFlagsSelect.propsType = {
	countries: _propTypes2.default.array,
	blackList: _propTypes2.default.bool,
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
	disabled: _propTypes2.default.bool,
	searchable: _propTypes2.default.bool
};

exports.default = ReactFlagsSelect;
module.exports = exports['default'];