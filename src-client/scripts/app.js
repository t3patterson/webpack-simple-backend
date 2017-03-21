import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'

let SimpleComponent = React.createClass({
	render: function(){
		return <div style={{textAlign: 'center'}}>
			<h2 style={{color: 'navy', fontFamily:'Helvetica'}}>
					Cheer up frowny face<br/>
			</h2>
			<small>The build is working</small>
		</div>
	}
})

ReactDOM.render(<SimpleComponent/>, document.querySelector('#app-container'))



