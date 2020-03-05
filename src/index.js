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

	onSelect(countryCode) {
		this.setState({
			selected: countryCode,
			filter : ''
		});
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

	setCountries() {
		const fullCountries = Object.keys(countries);

		let selectCountries = this.props.countries && this.props.countries.filter( country => {
			return countries[country] ;
		});

		//Filter BlackList
		if (this.props.blackList && selectCountries) {
			selectCountries = fullCountries.filter(countryKey =>{
					return selectCountries.filter(country =>{
						return countryKey === country;
					}).length === 0
			});
		}

		this.setState({
			countries: selectCountries || fullCountries
		}, ()=> {
			const { selected } = this.state;

			if (selected && !this.state.countries.includes(selected)) {
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

		let isSelected = this.state.selected || this.state.defaultCountry;
		let selectedSize = this.props.selectedSize;
		let optionsSize = this.props.optionsSize;
		let alignClass = this.props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

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
					 aria-haspopup="listbox"
					 aria-expanded={this.state.openOptions}
					 aria-labelledby="select_flag_button">
					{isSelected &&
						<span className="flag-select__option flag-select__option--placeholder">
							<img className="flag-select__option__icon" src={require(`../flags/${isSelected.toLowerCase()}.svg`)} alt={isSelected}/>
							{this.props.showSelectedLabel &&
								<span className="flag-select__option__label">{ this.props.customLabels[isSelected] || countries[isSelected] }</span>
							}
						</span>
					}
					{!isSelected &&
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

						{(this.state.filter ? this.state.filteredCountries : this.state.countries).map(countryCode =>
							(<li
								key={countryCode}
								role="option"
								tabIndex="0"
								id={`select_flag_${countryCode}`}
								className={`flag-select__option ${this.props.showOptionLabel ? 'has-label' : ''}`}
								onClick={() => this.onSelect(countryCode)}
								onKeyUp={evt => this.onSelectWithKeyboard(evt, countryCode)}>
								<span style={{width: `${optionsSize}px`, height: `${optionsSize}px`}}>
									<img
										className="flag-select__option__icon"
										alt={`flag for ${countries[countryCode]}`}
										src={require(`../flags/${countryCode.toLowerCase()}.svg`)} />
									{this.props.showOptionLabel && (
										<span className="flag-select__option__label">
										{ this.props.customLabels[countryCode] || countries[countryCode] }
									</span>
									)}
								</span>
							</li>)
						)}
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
	customLabels: {},
	disabled: false,
	blackList: false,
	searchable: false,
	searchPlaceholder: 'Search',
};

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
	searchable: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
};

export default ReactFlagsSelect;
