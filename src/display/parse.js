/*
* 解析页面上的组件
*
*/
import {$, isNil} from '../utils'
// import {getComponent} from '../components/form/display';

import {createComponent} from './components';
import Store from './store';

function parseOptions(item){
  var options = $(item).attr('x-options');
  if(isNil(options)){
    return null;
  }
  if (options[0] !== '{') {
      options = '{' + options + '}';
  }
  return (new Function("return " + options))();
}

var src;
function parse(context){
  var components = $('[x-component]', context);
  var componentName, opts;
  var data = Store.getData(), com;
  components.each(function(i, item){
    componentName = $(item).attr('x-component');
    opts = parseOptions(item);
    if(!opts) return;
    if(window.__mode){
      opts.mode = window.__mode;
    }
    com = createComponent(componentName, item, opts);
    if(com && com.props && com.props.script && com.props.script.value){
      src=com.props.script.value;
    }
    if(com && com.props.datasource && com.props.datasource.modelformat && com.props.datasource.modeltype){
        data['modelformat']=com.props.datasource.modelformat;
        data['modeltype']=com.props.datasource.modeltype;
    }
   if(com && com.props.name && !data[com.props.name] && com.props.dataOptions && !com.props.dataOptions.isComputed){
      data[com.props.name] = '';
    }
  });
}
/*显示级别使用脚本*/
function useScript(context){
  var data = Store.getData();
  if(src){
    var srcs=src.split(/[,;]/);
    var scriptName=new Array();
    srcs.forEach(function(source,i){
      scriptName[i] = document.createElement("script");
      scriptName[i].src = source;
      document.head.appendChild(scriptName[i]);
    });
    return [scriptName,Store];
  }
}

export default parse;
export {parseOptions,useScript};
