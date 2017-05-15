import React, { Component } from 'react';
import PropTypes from 'prop-types'
import countries from './countries';

class ReactFlagsSelect extends Component {
	constructor(props){
		super(props);

		let fullCountries = Object.keys(countries);

		let selectCountries = this.props.countries && this.props.countries.filter( country => {
			return countries[country];
		});
		let defaultCountry = countries[this.props.defaultCountry] && this.props.defaultCountry;

		this.state = {
			openOptions: false,
			countries: selectCountries || fullCountries,
			defaultCountry: defaultCountry
		}

		this.toggleOptions = this.toggleOptions.bind(this);
		this.closeOptions = this.closeOptions.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	toggleOptions() {
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	}

	closeOptions(event) {
		if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions ) {
			this.setState({
				openOptions: false
			});
		}
	}

	onSelect(countryCode) {
		this.setState({
			selected: countryCode
		})
		this.props.onSelect && this.props.onSelect(countryCode);
	}

	updateSelected(countryCode) {
		let isValid = countries[countryCode];

		isValid && this.setState({
			selected: countryCode
		})
	}

	componentDidMount() {
		!this.props.disabled && window.addEventListener("click", this.closeOptions);
	}

	componentWillUnmount() {
		!this.props.disabled && window.removeEventListener("click", this.closeOptions);
	}

	render() {

		let isSelected = this.state.selected || this.state.defaultCountry;
		let selectedSize = this.props.selectedSize;
		let optionsSize = this.props.optionsSize;
		let alignClass = this.props.alignOptions.toLowerCase() === 'right' ? 'to--right' : '';

		return (
			<div className={`flag-select ${this.props.className ? this.props.className :  ""}`}>
				<div ref="selectedFlag" style={{fontSize: `${selectedSize}px`}} className={`selected--flag--option ${this.props.disabled ? 'no--focus' : ''}`} onClick={this.toggleOptions}>
					{isSelected && 
						<span className="country-flag" style={{width: `${selectedSize}px`, height: `${selectedSize}px`}} >
							<img src={require(`../flags/${isSelected.toLowerCase()}.svg`)} />
							{this.props.showSelectedLabel &&
								<span className="country-label">{ this.props.customLabels[isSelected] || countries[isSelected] }</span>
							}
						</span>
					}

					{!isSelected && 
						<span className="country-label">{this.props.placeholder}</span>
					}
					<span className={`arrow-down ${this.props.disabled ? 'hidden' : ''}`}>▾</span>
				</div>

				{this.state.openOptions &&
					<div ref="flagOptions" style={{fontSize: `${optionsSize}px`}} className={`flag-options ${alignClass}`}>
						{this.state.countries.map( countryCode => 
							<div className="flag-option" key={countryCode} onClick={() => this.onSelect(countryCode)}>
								<span className="country-flag" style={{width: `${optionsSize}px`, height: `${optionsSize}px`}} >
									<img src={require(`../flags/${countryCode.toLowerCase()}.svg`)} />
									{this.props.showOptionLabel &&
										<span className="country-label">{ this.props.customLabels[countryCode] || countries[countryCode] }</span>
									}
								</span>
							</div>
						)}
					</div>
				}
			</div>
		)
	}
}

ReactFlagsSelect.defaultProps = {
	selectedSize: 16,
	optionsSize: 14,
	placeholder: "Select a country",
	showSelectedLabel: true,
	showOptionLabel: true,
	alignOptions: 'left',
	customLabels: [],
	disabled: false
}

ReactFlagsSelect.propsType = {
	countries: PropTypes.array,
	customLabels: PropTypes.array,
	selectedSize: PropTypes.number,
	optionsSize: PropTypes.number,
	defaultCountry: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	showSelectedLabel: PropTypes.bool,
	showOptionLabel: PropTypes.bool,
	alignOptions: PropTypes.string,
	onSelect: PropTypes.func,
	disabled: PropTypes.bool
}

export default ReactFlagsSelect;
