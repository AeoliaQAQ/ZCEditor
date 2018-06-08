import React,{Component} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import i18n from '@/ZCEditor/i18n';

class ZCEditor extends Component{

  constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
        i18nStatus:'chinese',
        language:'中文'
      };
      this.onChange = (editorState) => this.setState({editorState});
      this.styleInLineStyle=(style)=>this._styleInLineStyle(style);
      this.styleBolkStyle=(style)=>this._styleBolkStyle(style)
    }
    _styleInLineStyle=(style)=>{
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
    }
    _styleBolkStyle=(style)=>{
      this.onChange(RichUtils.toggleBlockType(this.state.editorState,style));
    }
    //显示转化
    transLanguge=()=>{
      if(this.state.i18nStatus==='chinese'){
        this.setState({
          i18nStatus:'english',
          language:'English'
        })
      }else{
        this.setState({
          i18nStatus:'chinese',
          language:'中文'
        })
      }
    }
    render() {
      return (
          <div>
              <div className="i18n_btn">
                <button onClick={this.transLanguge}>{this.state.language}</button>
              </div>
              <STYLECOLLECTION
                editorState={this.state.editorState} 
                onToggle={this.styleInLineStyle}
                i18nStatus={this.state.i18nStatus}/>
              <BOLKCOLLECTION
                editorState={this.state.editorState} 
                i18nStatus={this.state.i18nStatus}
                onToggle={this.styleBolkStyle}/>
              <div style={{backgroundColor:"#765840"}}>
                <Editor editorState={this.state.editorState} onChange={this.onChange} ref="editor"/>
              </div>
          </div>
      );
    }
}
class SpanButton extends Component{
  constructor(props){
    super(props);
    this.onToggle=(e)=>{
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }
  render(){
    let className="ZCEditor_btn_default"
    if(this.props.active){
      className+=" ZCEditor_btn_active"
    }
    return(
        <span className={className} onMouseDown={this.onToggle}>{this.props.label}</span>
    )
  }
}
const STYLECOLLECTION=(props)=>{
  let active=props.editorState.getCurrentInlineStyle();
  return (
    <div className="ZCEditor_controll">
      {COLLECTION[props.i18nStatus].FONTBTN.map(item=>
        <SpanButton 
          onToggle={props.onToggle} 
          label={item.label} 
          style={item.style}
          key={item.label}
          active={active.has(item.style)}/>
      )}
    </div>
  )
}
const BOLKCOLLECTION=(props)=>{
  const selection = props.editorState.getSelection();
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return(
    <div className="ZCEditor_controll">
    {
      COLLECTION[props.i18nStatus].BLOKBTN.map(item=>
        <SpanButton 
          onToggle={props.onToggle} 
          label={item.label} 
          style={item.style}
          key={item.label}
          active={item.style==blockType}/>
    )}
    </div>
  )
}
const COLLECTION={
  "english":{
      "FONTBTN":[
        {label:'粗体',style:'BOLD'},
        {label:'斜体',style:'ITALIC'},
        {label:'下划线',style:'UNDERLINE'},
        {label:'删除线',style:'STRIKETHROUGH'},
        {label:'代码',style:'CODE'}
      ],
      "BLOKBTN":[
        {label:'H1',style:'header-one'},
        {label:'H2',style:'header-two'},
        {label:'H3',style:'header-three'},
        {label:'H4',style:'header-four'},
        {label:'H5',style:'header-five'},
        {label:'H6',style:'header-six'},
      ]
  },
  "chinese":{
      "FONTBTN":[
        {label:'BOLD',style:'BOLD'},
        {label:'ITALIC',style:'ITALIC'},
        {label:'UNDERLINE',style:'UNDERLINE'},
        {label:'STRIKETHROUGH',style:'STRIKETHROUGH'},
        {label:'CODE',style:'CODE'}
      ],
      "BLOKBTN":[
        {label:'H1',style:'header-one'},
        {label:'H2',style:'header-two'},
        {label:'H3',style:'header-three'},
        {label:'H4',style:'header-four'},
        {label:'H5',style:'header-five'},
        {label:'H6',style:'header-six'},
      ]
  }
}
export default ZCEditor;

