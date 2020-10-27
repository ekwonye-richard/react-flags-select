import React, { Component } from 'react';
import PropTypes from 'prop-types'
import countries from './countries';

class ReactFlagsSelect extends Component {
	constructor(props){
		super(props);

		const defaultCountry = countries[this.props.defaultCountry] && this.props.defaultCountry;

		this.state = {
			openOptions: false,
			defaultCountry,
			filteredCountries: []
		}

		this.toggleOptions = this.toggleOptions.bind(this);
		this.closeOptions = this.closeOptions.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.filterSearch = this.filterSearch.bind(this);
		this.setCountries = this.setCountries.bind(this);
	}

	toggleOptions() {
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	}

	toggleOptionsWithKeyboard(evt) {
		evt.preventDefault();
		if (evt.keyCode === 27) {
			//esc key: hide options
			!this.state.disabled && this.setState({
				openOptions: false
			});
		}
	}

	closeOptions(event) {
		if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions && event.target !== this.refs.filterText ) {
			this.setState({
				openOptions: false
			});
		}
	}

	countryIndexFrom(countryCodeOrKey) {
		if (countryCodeOrKey.includes('_')) {
			const [countryCode, label] = countryCodeOrKey.split('_');
			return this.state.countries.findIndex(item => item[countryCode] === label);
		} else {
			return this.state.countries.findIndex(item => item === countryCodeOrKey);
		}
	}

	onSelect(countryCodeOrKey) {
		const itemIndex = this.countryIndexFrom(countryCodeOrKey);

		this.setState({
			selected: itemIndex,
			filter : ''
		}, () => this.props.onSelect && this.props.onSelect(countryCodeOrKey));
	}

	onSelectWithKeyboard(evt, countryCodeOrKey) {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			//enter key: select
			this.onSelect(countryCodeOrKey);
			this.closeOptions(evt);
		} else if (evt.keyCode === 27) {
			//esc key: hide options
			this.toggleOptions();
		}
	}

	updateSelected(countryCodeOrKey) {
		const itemIndex = this.countryIndexFrom(countryCodeOrKey);

		// countryIndexFrom() uses the Es6 `find` method underthehood which return
		// undefined when not found.
		const isValid = itemIndex !== undefined;

		isValid && this.setState({
			selected: itemIndex
		})
	}

	filterSearch(evt) {
		const filterValue = evt.target.value;
		const filteredCountries = filterValue && this.state.countries.filter(item => {
			const label = (typeof item === 'object') ? Object.values(item)[0] : countries[item];
			return label && label.match(new RegExp(filterValue, 'i'));
		});

		this.setState({ filter : filterValue, filteredCountries });
	}

	setCountries() {
		const fullCountries = Object.keys(countries);

		let selectCountries = this.props.countries && this.props.countries.filter(item => (
			typeof item === 'object' ? countries[Object.keys(item)[0]] : countries[item]
		));

		// Filter BlackList
		if (this.props.blackList && selectCountries) {
			selectCountries = fullCountries.filter(countryKey => (
				selectCountries.filter(country => countryKey === country).length === 0
			));
		}

		this.setState({
			countries: selectCountries || fullCountries
		}, () => {
			const { selected } = this.state;

			// Selected in the array position
			if (selected && selected > this.state.countries.length) {
				this.setState({ selected: null });
			}
		});
	}

	componentDidMount() {
		this.setCountries();
		!this.props.disabled && window.addEventListener("click", this.closeOptions);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.countries !== this.props.countries || prevProps.blackList !== this.props.blackList) {
			this.setCountries();
		}
	}

	componentWillUnmount() {
		!this.props.disabled && window.removeEventListener("click", this.closeOptions);
	}

	render() {

		const { selectedSize, optionsSize, alignOptions } = this.props;
		const alignClass = alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

		// isSelected has a value been selected from the array
		// (then this.state.selected is its position), or should we use
		// the defaultCountry (then it searches its position in the array).
		let isSelected;
		let selectedCountryCode;
		let selectedCountryLabel;
		// We must wait for the state.countries as they could be filtered.
		// see setCountries().
		if (this.state.countries) {
			if (this.state.selected !== undefined && this.state.selected !== null) {
				isSelected = this.state.selected;
			} else if (this.state.defaultCountry) {
				isSelected = this.state.countries.findIndex(item => {
					if (typeof item === 'object') {
					 	return Object.keys(item)[0] === this.state.defaultCountry;
					} else {
						return item === this.state.defaultCountry;
					}
				});
			}

			if (isSelected >= 0) {
				if (typeof this.state.countries[0] === 'object') {
					selectedCountryCode = Object.keys(this.state.countries[isSelected])[0];
					selectedCountryLabel = Object.values(this.state.countries[isSelected])[0];
				} else {
					selectedCountryCode = this.state.countries[isSelected];
					selectedCountryLabel = selectedCountryCode;
				}
			}

		}

		return (
			<div className={`flag-select ${this.props.className ? this.props.className :  ""}`}>
				<button
					 ref="selectedFlag"
					 style={{fontSize: `${selectedSize}px`}}
					 className="flag-select__btn"
					 onClick={this.toggleOptions}
					 onKeyUp={evt => this.toggleOptionsWithKeyboard(evt)}
					 disabled={this.props.disabled}
					 id="select_flag_button"
					 type={this.props.buttonType}
					 aria-haspopup="listbox"
					 aria-expanded={this.state.openOptions}
					 aria-labelledby="select_flag_button">
					{isSelected >= 0 &&
						<span className="flag-select__option flag-select__option--placeholder">
							<img className="flag-select__option__icon" src={require(`../flags/${selectedCountryCode.toLowerCase()}.svg`)} alt={selectedCountryCode} />
							{this.props.showSelectedLabel &&
								<span className="flag-select__option__label">
									{selectedCountryLabel || countries[selectedCountryCode]}
								</span>
							}
						</span>
					}
					{(isSelected === null || isSelected === undefined || isSelected < 0) &&
						<span className="flag-select__option flag-select__option--placeholder">{this.props.placeholder}</span>
					}
				</button>

				{this.state.openOptions &&
					<ul tabIndex="-1" role="listbox" ref="flagOptions" style={{fontSize: `${optionsSize}px`}} className={`flag-select__options ${alignClass}`}>
						{this.props.searchable && (
							<div className="filterBox">
								<input type="text" placeholder={this.props.searchPlaceholder} ref="filterText"  onChange={this.filterSearch}/>
							</div>
						)}

						{(this.state.filter ? this.state.filteredCountries : this.state.countries).map(item => {
							let countryCode
							let countryKey
							let value

							if (typeof item === 'object') {
								countryCode = Object.keys(item)[0]
								countryKey = `${countryCode}_${item[countryCode]}`
								value = item[countryCode]
							} else {
								countryCode = item
								countryKey = countryCode
								value = item
							}

							return (
								<li
									key={countryKey}
									role="option"
									tabIndex="0"
									id={`select_flag_${countryCode}`}
									className={`flag-select__option ${this.props.showOptionLabel ? 'has-label' : ''}`}
									onClick={() => this.onSelect(countryKey)}
									onKeyUp={evt => this.onSelectWithKeyboard(evt, countryKey)}>
									<span style={{width: `${optionsSize}px`, height: `${optionsSize}px`}}>
										<img
											className="flag-select__option__icon"
											alt={`flag for ${countries[countryCode]}`}
											src={require(`../flags/${countryCode.toLowerCase()}.svg`)} />
										{this.props.showOptionLabel && (
											<span className="flag-select__option__label">
												{value}
											</span>
										)}
									</span>
								</li>
							)
						})}
					</ul>
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
	disabled: false,
	buttonType: "button",
	blackList: false,
	searchable: false,
	searchPlaceholder: 'Search',
};

ReactFlagsSelect.propTypes = {
	countries: PropTypes.array,
	blackList: PropTypes.bool,
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
	buttonType: PropTypes.string,
	searchable: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
};

export default ReactFlagsSelect;
