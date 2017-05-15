import React from 'react'
import {render} from 'react-dom'
import '../../css/demo.css';
import '../../css/react-flags-select.css';

import ReactFlagsSelect from '../../src'

let Remarkable = require('remarkable');

class Markdown extends React.Component {
	render() {
		var md = new Remarkable();

		return (
			<div
	          className="content"
	          dangerouslySetInnerHTML={{ __html: md.render(this.props.children) }}
	        />
		)
	}
}

class Demo extends React.Component {
	render() {
		return (
			<div>
				<div className="header">
					<span className="title">React Flags Select</span>
				</div>
				<div className="main">
					<div className="section-header">
						<span>Examples</span>
					</div>
					<hr />
					<ReactFlagsSelect
					countries={["US", "GB", "FR","DE","IT"]}
					customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
					placeholder="Select Language"
					selectedSize={14}
					optionsSize={14}
					showSelectedLabel={false} />
				</div>
			</div>
		)
	}
}



render(<Demo/>, document.querySelector('#demo'))
