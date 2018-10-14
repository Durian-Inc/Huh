import React from 'react';

class CheckBox extends React.Component {
    
    render() {
        return (
        	<input type="checkbox" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
        )
    }
    
}

class Controls extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= { optionsChecked: [] }
    }
    
    changeEvent(event) {
    
    	let checkedArray = this.state.optionsChecked;
      let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
        
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
                        
        } else {
        
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            
            this.setState({
              optionsChecked: checkedArray
            });
            
        }
    
    }
    
    render() {
    	
        let checkBoxArray = ['Events','Businesses','Hiring'];
       
        let outputCheckboxes = checkBoxArray.map(function(string, i){
        	return (<div><CheckBox value={string} id={'string_' + i} onChange={this.changeEvent.bind(this)} /><label htmlFor={'string_' + i}>{string}</label></div>)
        }, this);
    
        return (
        	<div> Filter Results
              <div>
                  {outputCheckboxes}
              </div>
            </div>
        )
    }
    
}

export default Controls;
