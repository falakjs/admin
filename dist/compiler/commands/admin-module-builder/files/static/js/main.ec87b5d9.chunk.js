(this.webpackJsonpbonga=this.webpackJsonpbonga||[]).push([[0],{29:function(e,t,a){e.exports=a(58)},34:function(e,t,a){},39:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(25),o=a.n(r),u=a(6),c=a(5),m=a(9),i=a(7),s=a(8),p=(a(34),a(10)),d=a(26),h=a(3),b=a(4),f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).state={rows:[]},a.formatters=["","email","image","link","imageLink","humanTime","status","boolean","number","translator","multiLingual"],a.onInputChange=function(e,t,n){a.state.rows[t][e]=n,a.reRender()},a.newRow({head:"#",key:"id"}),a.newRow({head:"name",key:"name"}),a.newRow({head:"image",key:"image",formatter:"image"}),a.newRow({head:"status",key:"status",formatter:"status"}),a}return Object(s.a)(t,e),Object(c.a)(t,[{key:"newRow",value:function(e){e=Object.assign(this.defaultOptions(),e),this.state.rows.push(e)}},{key:"addNewRow",value:function(e){this.state.rows.push(e),this.setState(this.state)}},{key:"removeRow",value:function(e){this.unset("rows",e),this.reRender()}},{key:"unset",value:function(e,t){var a=this.state[e];this.setState(Object(d.a)({},e,a.splice(t,1)))}},{key:"reRender",value:function(){this.setState({rows:Object(p.a)(this.state.rows)})}},{key:"tableOptionColumn",value:function(e,t,a){var n=this,r="tableOptions[columns][".concat(a,"][").concat(e,"]");return l.a.createElement("td",null,l.a.createElement("input",{type:"text",onChange:function(t){n.onInputChange(e,a,t.target.value)},required:!["tooltip","default"].includes(e),className:"form-control",placeholder:e,value:t,name:r}))}},{key:"formatterOption",value:function(e,t){var a=this.formatters.map((function(e,t){return l.a.createElement("option",{key:t,value:e},e)})),n="tableOptions[columns][".concat(t,"][formatter]");return l.a.createElement("td",null,l.a.createElement("select",{name:n,defaultValue:e,className:"form-control"},a))}},{key:"defaultOptions",value:function(){return{head:"",key:"",formatter:"",value:"",tooltip:"",default:""}}},{key:"renderRows",value:function(){var e=this;return this.state.rows.map((function(t,a){return l.a.createElement("tr",{key:a},e.tableOptionColumn("head",t.head,a),e.tableOptionColumn("key",t.key,a),e.formatterOption(t.formatter,a),e.tableOptionColumn("default",t.default,a),e.tableOptionColumn("tooltip",t.tooltip,a),l.a.createElement("td",null,l.a.createElement("button",{type:"button",className:"btn btn-sm btn-danger",onClick:e.removeRow.bind(e,a)},l.a.createElement(h.a,{icon:b.c}))))}))}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h2",null,"Table Options"),l.a.createElement("table",{className:"table table-bordered",id:"table-options-list"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Heading Column"),l.a.createElement("th",null,"Response Key"),l.a.createElement("th",null,"Response Value Formatter"),l.a.createElement("th",null,"Default Value"),l.a.createElement("th",null,"Tooltip"),l.a.createElement("th",null,"Actions"))),l.a.createElement("tbody",null,this.renderRows()),l.a.createElement("tfoot",null,l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"6"},l.a.createElement("button",{type:"button",onClick:this.addNewRow.bind(this,this.defaultOptions()),className:"btn btn-sm btn-info"},l.a.createElement(h.a,{icon:b.a})))))))}}]),t}(n.Component),v=a(27),y=a(11),E=(a(39),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(i.a)(t).call(this,e))).state={rows:[],withStatus:!0},a.addType=function(e,t){a.state.rows[e].push(a.defaultInputValues({type:t})),a.reRender()},a.inputsTypes=[{type:"text",color:"purple",onClick:a.addType},{type:"textarea",color:"brown",onClick:a.addType},{type:"email",color:"orange",onClick:a.addType},{type:"image",color:"pink",onClick:a.addType},{type:"password",color:"teal",onClick:a.addType},{type:"number",color:"blue",onClick:a.addType},{type:"datepicker",color:"grey",onClick:a.addType},{type:"checkbox",color:"indigo",onClick:a.addType},{type:"dropdown",color:"lime",onClick:a.addType}],a.Inputs=function(e){return a.inputsTypes.map((function(t,n){return l.a.createElement("button",{key:n,type:"button",className:"add-type-btn btn btn-sm btn-"+t.color,onClick:t.onClick.bind(Object(y.a)(a),e,t.type)},l.a.createElement(h.a,{icon:b.a,className:"mr-1"}),t.type," Input")}))},a.addDefaultRow(),a}return Object(s.a)(t,e),Object(c.a)(t,[{key:"defaultInputValues",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({type:"",col:"col",name:"",value:"",label:"",placeholder:"",confirmName:"",itemKey:"",service:"",slug:!1,required:!1,multiLingual:!1,imageable:!1,lazyLoading:!1,remoteSearch:!1,none:!1},e)}}]),Object(c.a)(t,[{key:"addDefaultRow",value:function(){this.state.rows.push([this.defaultInputValues({type:"text",name:"name",label:"name",placeholder:"name",value:"name",slug:!1,required:!0})]),this.state.rows.push([this.defaultInputValues({type:"image",name:"image",label:"image",value:"image",required:!0})])}},{key:"reRender",value:function(){this.setState({rows:Object(p.a)(this.state.rows)})}},{key:"addNewRow",value:function(){this.state.rows.push([]),this.setState(this.state)}},{key:"updateValue",value:function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];!1===n?(e[t]=a.target.value,"label"!==t||"undefined"===typeof e.placeholder||e.manualPlaceHolderUpdate||(e.placeholder=a.target.value),"placeholder"===t&&(e.manualPlaceHolderUpdate=!0),"name"!==t||e.manualValueUpdate||(e.value=a.target.value),"value"===t&&(e.manualValueUpdate=!0)):e[t]=a.target.checked,this.reRender()}},{key:"removeInput",value:function(e,t){this.state.rows[e].splice(t,1),this.reRender()}},{key:"removeRow",value:function(e){this.state.rows.splice(e,1),this.reRender()}},{key:"checkboxInput",value:function(e,t,a){var n=this,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e,o=a(e),u=o.replace(/[[|]]*/g,"");return l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:u},r," Input"),l.a.createElement("input",{type:"checkbox",name:o,id:u,value:1,checked:t[e],onChange:function(a){n.updateValue(t,e,a,!0)},className:"ml-2"}))}},{key:"renderTextInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"placeholder",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.checkboxInput("multiLingual",e,t),"text"==e.type&&this.checkboxInput("slug",e,t),this.renderInputOptions(t,e))}},{key:"renderImageInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),this.checkboxInput("multiLingual",e,t),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderNumberInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"placeholder",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderInputOptions",value:function(e,t){var a=this,n=Object(v.a)(Array,Object(p.a)(Array(13))).map((function(e,t){var a,n;return 0==t?(a="col",n="Auto Fill"):(n="col-".concat(t+1),a="col-sm-".concat(t+1)),l.a.createElement("option",{key:t,value:a},n)}));return l.a.createElement(l.a.Fragment,null,l.a.createElement("select",{className:"form-control mb-2",name:e("col"),onChange:function(e){a.updateValue(t,"col",e)},value:t.col},n),l.a.createElement("input",{type:"text",name:e("type"),placeholder:t.type+" Type",value:t.type,readOnly:!0,className:"form-control mb-2"}))}},{key:"renderDatepickerInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"placeholder",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderCheckboxInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderEmailInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"placeholder",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderPasswordInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("confirmName"),placeholder:"Confirm Password Name",value:e.name,onChange:function(t){a.updateValue(e,"confirmName",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"placeholder",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),this.checkboxInput("required",e,t),this.renderInputOptions(t,e))}},{key:"renderDropdownInput",value:function(e,t){var a=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("name"),placeholder:"Name",value:e.name,onChange:function(t){a.updateValue(e,"name",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("value"),placeholder:"Value Key",value:e.value,onChange:function(t){a.updateValue(e,"value",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("label"),placeholder:"Label",value:e.label,onChange:function(t){a.updateValue(e,"label",t)},className:"form-control mb-2"}),l.a.createElement("input",{type:"text",name:t("placeholder"),placeholder:"Heading",value:e.placeholder,onChange:function(t){a.updateValue(e,"placeholder",t)},className:"form-control mb-2"}),!e.lazyLoading&&l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("itemsKey"),placeholder:"itemsKey (i.e `this.languages` or `['enabled', 'disabled']`), (Can not be used along with lazyLoading inputs)",value:e.itemsKey,onChange:function(t){a.updateValue(e,"itemsKey",t)},className:"form-control mb-2"})),this.checkboxInput("required",e,t),this.checkboxInput("imageable",e,t),this.checkboxInput("none",e,t),this.checkboxInput("lazyLoading",e,t),e.lazyLoading&&l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",name:t("service"),placeholder:"Service Name",value:e.service,onChange:function(t){a.updateValue(e,"service",t)},className:"form-control mb-2"}),this.checkboxInput("remoteSearch",e,t)),this.renderInputOptions(t,e))}},{key:"renderInput",value:function(e,t,a){var n;switch(e.type){case"text":case"textarea":n=this.renderTextInput;break;case"image":n=this.renderImageInput;break;case"email":n=this.renderEmailInput;break;case"number":n=this.renderNumberInput;break;case"datepicker":n=this.renderDatepickerInput;break;case"checkbox":n=this.renderCheckboxInput;break;case"dropdown":n=this.renderDropdownInput;break;case"password":n=this.renderPasswordInput}return l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{type:"button",className:"btn btn-sm btn-danger btn-circle ",onClick:this.removeInput.bind(this,t,a)},l.a.createElement(h.a,{icon:b.b})),n.call(this,e,(function(e){return"formOptions[rows][".concat(t,"][").concat(a,"][").concat(e,"]")})))}},{key:"renderRow",value:function(e,t){var a=this;return e.map((function(e,n){return l.a.createElement("div",{key:n,className:e.col},a.renderInput.call(a,e,t,n))}))}},{key:"renderRows",value:function(){var e=this;return this.state.rows.map((function(t,a){return l.a.createElement("div",{className:"row form-row",key:a},l.a.createElement("div",{className:"col-12 text-right"},l.a.createElement("button",{type:"button",className:"btn btn-sm btn-danger btn-circle ",onClick:e.removeRow.bind(e,a)},l.a.createElement(h.a,{icon:b.b}))),e.renderRow(t,a),l.a.createElement("div",{className:"col-12"},e.Inputs(a)))}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("h2",null,"Form Options"),this.renderRows(),l.a.createElement("button",{type:"button",className:"add-row-btn btn btn-sm btn-info",onClick:this.addNewRow.bind(this)},l.a.createElement(h.a,{icon:b.a,className:"mr-1"}),"Row"),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"status"},"Add Status Dropdown"),l.a.createElement("input",{type:"checkbox",id:"status",className:"ml-2",name:"formOptions[withStatus]",checked:this.state.withStatus,onChange:function(t){return e.state.withStatus=t.checked},value:"1"})))}}]),t}(n.Component)),g=a(28),k=a.n(g),N=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={sent:!1},a}return Object(s.a)(t,e),Object(c.a)(t,[{key:"createModule",value:function(e){e.preventDefault(),k.a.post("http://localhost:8881/create-module",new FormData(e.target)),this.setState({sent:!0})}},{key:"render",value:function(){return l.a.createElement("div",{className:"container"},this.state.sent&&l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",{className:"font-weight-bold text-center green-text"},"Admin Module Has Been Created Successfully")),!this.state.sent&&l.a.createElement("form",{onSubmit:this.createModule.bind(this)},l.a.createElement("h1",{className:"text-center"},"Admin Module Builder"),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"module"},"Module"),l.a.createElement("input",{type:"text",required:!0,name:"module",placeholder:"Module",className:"form-control"}))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"route"},"Route"),l.a.createElement("input",{type:"text",required:!0,name:"route",placeholder:"Route",className:"form-control"})))),l.a.createElement(f,null),l.a.createElement(E,null),l.a.createElement("button",{className:"btn btn-success font-weight-bold"},"Create")))}}]),t}(n.Component);a(56),a(57);o.a.render(l.a.createElement(N,null),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.ec87b5d9.chunk.js.map