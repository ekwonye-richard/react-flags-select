import React from 'react'
import { render } from 'react-dom'
import * as Highlight from 'react-syntax-highlight';
import './scss/demo.scss';
import '../../scss/react-flags-select.scss';
import 'highlight.js/styles/default.css';

import ReactFlagsSelect from '../../src';

class Demo extends React.Component {
	render() {
		return (
			<div>
				<div className="header">
					<span className="title">React Flags Select</span>
				</div>
				<div className="main">
					<p className="info">A customizable svg flags select components for React Js.</p>
					<div className="section-header">
						<span>Examples</span> 
					</div>
					<hr />
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Default</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect />'} />
						</div>
						<ReactFlagsSelect />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Default Country</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n defaultCountry="US" />'} />
						</div>
						<ReactFlagsSelect
					    defaultCountry="US" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Searchable</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n searchable={true} />'} />
						</div>
						<ReactFlagsSelect
						searchable={true} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Searchable (with placeholder)</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n searchable={true} \n searchPlaceholder="Search for a country" />'} />
						</div>
						<ReactFlagsSelect
						searchable={true}
						searchPlaceholder="Search for a country" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Countries</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT", "NG"]} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT", "NG"]} />
					</div>

					<div className="demo-group">
						<div className="demo-group-title">
							<span>Countries (BlackList)</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT", "NG"]} \n blackList={true} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT", "NG"]}
					    blackList={true} />
					</div>

					<div className="demo-group">
						<div className="demo-group-title">
							<span>Custom Labels</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Placeholder</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} \n placeholder="Select Language" />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					    placeholder="Select Language" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Show Selected Label</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} \n placeholder="Select Language" \n showSelectedLabel={false} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					    placeholder="Select Language"
					    showSelectedLabel={false} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Show Option Label</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} \n placeholder="Select Language" \n showSelectedLabel={false} \n showOptionLabel={false} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					    placeholder="Select Language"
					    showSelectedLabel={false}
					    showOptionLabel={false} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Selected Size</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} \n placeholder="Select Language" \n showSelectedLabel={false} \n showOptionLabel={false} \n selectedSize={14} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					    placeholder="Select Language"
					    showSelectedLabel={false}
					    showOptionLabel={false}
					    selectedSize={14} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Options Size</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n countries={["US", "GB", "FR", "DE", "IT"]} \n customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} \n placeholder="Select Language" \n showSelectedLabel={false} \n showOptionLabel={false} \n selectedSize={14} \n optionsSize={14} />'} />
						</div>
						<ReactFlagsSelect
					    countries={["US", "GB", "FR", "DE", "IT"]} 
					    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					    placeholder="Select Language"
					    showSelectedLabel={false}
					    showOptionLabel={false}
					    selectedSize={14}
					    optionsSize={14} />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>className</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n className="menu-flags" />'} />
						</div>
						<ReactFlagsSelect
					    className="menu-flags" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Align Options</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n alignOptions="left" />'} />
						</div>
						<ReactFlagsSelect
					    alignOptions="left" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Disabled</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactFlagsSelect \n defaultCountry="US" \n showSelectedLabel={false} \n disabled={true}/>'} />
						</div>
						<ReactFlagsSelect
					    defaultCountry="US"
					    showSelectedLabel={false}
					    disabled={true} />
					</div>
				</div>
			</div>
		)
	}
}



render(<Demo/>, document.querySelector('#demo'));
