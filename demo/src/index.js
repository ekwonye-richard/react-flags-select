import React from 'react'
import {render} from 'react-dom'
import '../../css/react-flags-select.css';

import ReactFlagsSelect from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-flags-select Demo</h1>
      <ReactFlagsSelect
		countries={["US", "GB", "FR","DE","IT"]}
		customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
		placeholder="Select Language"
		selectedSize={14}
		optionsSize={14}
		showSelectedLabel={false} />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
