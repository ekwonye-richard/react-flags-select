import React, { Component } from 'react';
import PropTypes from 'prop-types'
import countries from './countries';

class ReactFlagsSelect extends Component {
	constructor(props){
		super(props);

		let fullCountries = Object.keys(countries);

		let selectCountries = this.props.countries && this.props.countries.filter( country => {
			return countries[country] ;
		});


		//Filter BlackList
		selectCountries = !this.props.blackList ? selectCountries : fullCountries.filter(countryKey =>{
				return selectCountries.filter(country =>{
					return countryKey === country;
				}).length === 0
		});

		let defaultCountry = countries[this.props.defaultCountry] && this.props.defaultCountry;

		this.state = {
			openOptions: false,
			countries: selectCountries || fullCountries,
			defaultCountry: defaultCountry,
			filteredCountries: []
		}

		this.toggleOptions = this.toggleOptions.bind(this);
		this.closeOptions = this.closeOptions.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.filterSearch = this.filterSearch.bind(this);
	}

	toggleOptions(event) {
		event.preventDefault();
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	}

	toggleOptionsWithKeyboard(evt) {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			//enter key: toggle options
			this.toggleOptions();
		} else if (evt.keyCode === 27) {
			//esc key: hide options
			!this.state.disabled && this.setState({
				openOptions: false
			});
		}

	}

	closeOptions(event) {
		if (event.target !== this.refs.selectedFlag &&
			  event.target !== this.refs.flagOptions &&
			  event.target !== this.refs.filterText &&
			  event.target !== this.refs.countryFlag &&
			  event.target !== this.refs.countryFlagImg &&
			  event.target !== this.refs.countryLabel &&
			  event.target !== this.refs.carat) {
			this.setState({
				openOptions: false
			});
		}
	}

	onSelect(countryCode) {
		this.setState({
			selected: countryCode,
			filter : ''
		})
		this.props.onSelect && this.props.onSelect(countryCode);
	}

	onSelectWithKeyboard(evt, countryCode) {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			//enter key: select
			this.onSelect(countryCode);
			this.closeOptions(evt);
		} else if (evt.keyCode === 27) {
			//esc key: hide options
			this.toggleOptions();
		}
	}

	updateSelected(countryCode) {
		let isValid = countries[countryCode];

		isValid && this.setState({
			selected: countryCode
		})
	}

	filterSearch(evt) {
		let filterValue = evt.target.value;
		let filteredCountries = filterValue && this.state.countries.filter(key => {
			let label = this.props.customLabels[key] || countries[key];
			return  label && label.match(new RegExp(filterValue, 'i'))
		}) ;

		this.setState({filter : filterValue, filteredCountries : filteredCountries });
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
		let alignClass = this.props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

		return (
			<div className={`flag-select ${this.props.className ? this.props.className :  ""}`}>
				<div ref="selectedFlag" style={{fontSize: `${selectedSize}px`}} className={`selected--flag--option ${this.props.disabled ? 'no--focus' : ''}`} tabIndex="0" onClick={this.toggleOptions} onKeyUp={evt => this.toggleOptionsWithKeyboard(evt)}>
					{isSelected &&
						<span ref="countryFlag" className="country-flag" style={{width: `${selectedSize}px`, height: `${selectedSize}px`}} >
							<img ref="countryFlagImg" src={require(`../flags/${isSelected.toLowerCase()}.svg`)} />
							{this.props.showSelectedLabel &&
								<span className="country-label" ref="countryLabel">{ this.props.customLabels[isSelected] || countries[isSelected] }</span>
							}
						</span>
					}

					{!isSelected &&
						<span className="country-label" ref="countryLabel">{this.props.placeholder}</span>
					}
					<span ref="carat" className={`arrow-down ${this.props.disabled ? 'hidden' : ''}`}>▾</span>
				</div>

				{this.state.openOptions &&
					<div ref="flagOptions" style={{fontSize: `${optionsSize}px`}} className={`flag-options ${alignClass}`}>
						{this.props.searchable &&
							<div className="filterBox">
								<input type="text" placeholder="Search" ref="filterText"  onChange={this.filterSearch}/>
							</div>
						}
						{(this.state.filter ? this.state.filteredCountries : this.state.countries).map( countryCode =>

							<div className={`flag-option ${this.props.showOptionLabel ? 'has-label' : ''}`} key={countryCode} tabIndex="0" onClick={() => this.onSelect(countryCode)} onKeyUp={evt => this.onSelectWithKeyboard(evt, countryCode)}>
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
	alignOptions: "right",
	customLabels: {},
	disabled: false,
	blackList: false,
	searchable: false
}

ReactFlagsSelect.propTypes = {
	countries: PropTypes.array,
	blackList: PropTypes.bool,
	customLabels: PropTypes.object,
	selectedSize: PropTypes.number,
	optionsSize: PropTypes.number,
	defaultCountry: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	showSelectedLabel: PropTypes.bool,
	showOptionLabel: PropTypes.bool,
	alignOptions: PropTypes.string,
	onSelect: PropTypes.func,
	disabled: PropTypes.bool,
	searchable: PropTypes.bool
}

export default ReactFlagsSelect;
