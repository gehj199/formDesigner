import classnames from 'classnames';
import {$, isObject} from '../../utils';

import Store from '../store';
import LabeledTextbox from './labeledTextbox';

import {getEnvironment} from './mixinUtils';

export default class LabeledCombobox extends LabeledTextbox{
	static defaultProps = {
    mode: 'default', // default, view, print
	};

  constructor(dom, props) {
    super(dom, props, 'combobox');
		if(this.props.mode === 'default'){
			this.onChange = this.props.onChange;
			this.props.onChange = this._handleChange;
			this.dom.attr('name', this.props.name);
			this.dom.attr('id', this.props.id);
			this.dom[this.plugin](this.props);
		}
	}

	_prefixOptions(){
		var options = this.props.options;
		if(options){
			options.forEach((opt) => {
				opt.text = getEnvironment(opt.text.binding, opt.text.value);
			});
			this.props.data = options;
		}
	}

	render(){
		var {value, mode, data,id} = this.props;
		if(mode === 'default'){
			this.rendering = true;
			this.dom.attr('id', this.props.id);
			this.dom[this.plugin]('setValue', value);
			this.rendering = false;
		} else {
			var options = this.props.options;
			var text = value;
			if(options && options.length){
				for(var i = 0, l = options.length; i < l; i++){
					if(options[i].value === value){
						//text = getEnvironment(options[i].text.binding, options[i].text.value);
						text=options[i].text;
						break;
					}
				}
			}
			this.dom.next().html(text);
		}
		return this;
	}
}
