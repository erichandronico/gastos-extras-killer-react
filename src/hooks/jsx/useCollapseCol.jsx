import { useCallback, useState } from "react";
import { Titulo } from "../../components/Titulos/Titulo";
import { trans } from "../../helpers/utils";
import '../../components/Forms/css/forms.css'
import { ReportLayout } from "../../components/Layouts/ReportLayout";

const toggleClasses = {
    true:   { formVisible: true, formCol: 'col4', gridCol: 'col8', formDisplay: 'block', dxCol: 'col12', btnIcon: 'showpanel', btnHint: trans('Expandir'), btnClass: 'buttonCollapse' },
    false:  { formVisible: false, formCol: 'col0', gridCol: 'col12', formDisplay: 'none', dxCol: 'col0', btnIcon: 'hidepanel', btnHint: trans('Colapsar'), btnClass: 'buttonExpand'}
};

export const useCollapseCol = () => {

    const [colsClassState, setColsClassState] = useState( toggleClasses['true'] )

    const toggleForm    = useCallback( () =>  setColsClassState(  toggleClasses[!colsClassState?.formVisible]  ), [colsClassState]);  
    const Header        = useCallback( ({titulo}) => (<Titulo title={titulo} toggleFn={toggleForm} btnIcon={ colsClassState?.btnIcon } btnHint={ colsClassState?.btnHint } btnClass={ colsClassState?.btnClass }  />), [colsClassState, toggleForm])
    const WideCol       = useCallback( ({children}) => 
    (
        <div className={ colsClassState?.gridCol } >
            <ReportLayout>{  children }</ReportLayout>
        </div>
    ), [colsClassState])

    const FormCol       = useCallback( ({children}) => (
        <div className={ colsClassState?.formCol } >
            <div style={{height: '100%', display: colsClassState.formDisplay}} className={colsClassState.dxCol} >
                {  children }
            </div>
        </div>
    ),[colsClassState])


    return { Titulo: Header, FormCol, WideCol }
}