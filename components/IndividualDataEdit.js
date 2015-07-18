import React from 'react';
import BasicIndividualInput from './BasicIndividualInput';
import BasicTextareaInput from './BasicTextareaInput';
import BasicIndividualDetailEdit from './BasicIndividualDetailEdit';
import BasicOptionInput from './BasicOptionInput';
import DBpediaInput from './DBpediaInput';
import PasswordInput from './PasswordInput';
import {LanguageInput} from 'void-components';

class IndividualDataEdit extends React.Component {
    handleDataEdit(value){
        this.props.onDataEdit(value);
    }
    handleDetailDataEdit(detailData){
        this.props.onDetailDataEdit(detailData);
    }
    handleEnterPress(){
        this.props.onEnterPress();
    }
    render() {
        let editor, editorConfig = '', extendedEditor, extendedEditorConfig = '';
        if(this.props.config){
            if(this.props.config.extendedEditor){
                extendedEditorConfig = this.props.config.extendedEditor[0];
            }
            if(this.props.config.editor){
                editorConfig = this.props.config.editor[0];
                //in case of Aggregate nature, can consider editorI
                if(this.props.config.objectReactorType && this.props.config.objectReactorType[0] === 'AggregateObjectReactor' && this.props.config.editorI){
                    editorConfig = this.props.config.editorI[0];
                }
            }
        }
        if(this.props.spec.extendedViewData){
            //go to extended edit
            switch(extendedEditorConfig){
                case 'BasicIndividualDetailEdit':
                    extendedEditor = <BasicIndividualDetailEdit spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} onDetailDataEdit={this.handleDetailDataEdit.bind(this)} onEnterPress={this.handleEnterPress.bind(this)}/>;
                break;
                default:
                    extendedEditor = <BasicIndividualDetailEdit spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} onDetailDataEdit={this.handleDetailDataEdit.bind(this)} onEnterPress={this.handleEnterPress.bind(this)}/>;
            }
        }
        //normal edit
        switch(editorConfig){
            case 'BasicIndividualInput':
                editor = <BasicIndividualInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} allowActionByKey="1" onEnterPress={this.handleEnterPress.bind(this)}/>;
            break;
            case 'BasicTextareaInput':
                editor = <BasicTextareaInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)}/>;
            break;
            case 'PasswordInput':
                editor = <PasswordInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} allowActionByKey="1" onEnterPress={this.handleEnterPress.bind(this)}/>;
            break;
            case 'DBpediaInput':
                editor = <DBpediaInput asWikipedia="1" spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} allowActionByKey="1" onEnterPress={this.handleEnterPress.bind(this)}/>;
            break;
            case 'LanguageInput':
                editor = <LanguageInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)}/>;
            break;
            case 'BasicOptionInput':
                editor = <BasicOptionInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} allowActionByKey="1" onEnterPress={this.handleEnterPress.bind(this)}/>;
            break;
            default:
                editor = <BasicIndividualInput spec={this.props.spec} config={this.props.config} onDataEdit={this.handleDataEdit.bind(this)} allowActionByKey="1" onEnterPress={this.handleEnterPress.bind(this)}/>;
        }
        //check if it has a blank node value config
        let hideObject = 0;
        if(this.props.config && this.props.config.hasBlankNode && extendedEditor){
            hideObject = 1;
        }
        return (
            <div className="ui" ref="individualDataEdit">
                {hideObject ? '' : <div className="ui attached secondary segment"> {editor} </div>}
                {extendedEditor}
            </div>
        );
    }
}

export default IndividualDataEdit;