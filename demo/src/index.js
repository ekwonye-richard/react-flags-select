import React from 'react'
import {render} from 'react-dom'

import ReactFlagsSelect from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-flags-select Demo</h1>
      <ReactFlagsSelect
		countries={["US", "GB", "FR","DE","IT", "GMD"]}
		customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
		defaultCountry="GB"
		selectedSize={14}
		optionsSize={14}
		showSelectedLabel={false} />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
