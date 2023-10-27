import { useCallback, useMemo, useRef, useState } from "react"
import { trans } from "../../helpers/utils"
import { TextBox, Button } from "devextreme-react"
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai"
import './css/dxCustomToolbar.css'
import { MdDeselect } from "react-icons/md"
import { TbArrowAutofitHeight } from "react-icons/tb"

const defaultHeights = [950, 1400, 2000]

export const useDXCustomToolbar = (gridRef) => {

    const lang = 'cl'

    const textTrans = useMemo( () => ({

        dispositivos:       trans('Dispositivos'),
        msgPantallaCom:     trans('Pantalla Completa'),
        actualizar:         trans('Actualizar'),
        Bloquear:           trans('Bloquear'),
        Desbloquear:        trans('Desbloquear'),
        habilitar:          trans('Habilitar'),
        msgBuscar:          trans('Buscar...' ),
        columnChooser:      trans('Elegir Columnas'),
        msgAgregarFila:     trans('Agregar Fila'),
        borrarSeleccion:    trans('Borrar Selección'),
        enlarge:            trans('Cambiar altura'),

    }), [lang])

    const searchTimeout                     = useRef(null);
    const [height, setHeight]               = useState( defaultHeights?.at(0) )

    const handleSearchInput = useCallback( (e) => {
        const inputValue = e?.event?.target?.value;
        if (searchTimeout?.current) { clearTimeout(searchTimeout?.current) }
        searchTimeout.current = setTimeout(() => { gridRef.current.instance.searchByText(inputValue)  }, 500);
      }, [searchTimeout?.current]);


    const handleHeigthChange = useCallback( ({heights}) => {
        // console.log(heights, height)
        const largos = heights?.length || 0
        const currenIndex = heights.findIndex( i => i == height )
        // console.log('currenIndex', currenIndex, largos -1, heights?.at(currenIndex + 1) )
        setHeight(  ( currenIndex == largos - 1) ? heights?.at(0) : heights?.at(currenIndex + 1) )
    }, [height])


    const RefreshButton     = useCallback( ({ onClick })     => <Button hint={ textTrans.actualizar }    type="normal" stylingMode="outlined" className="custom-toolbar-button mt-1"  icon="refresh" onClick={ onClick } />, [textTrans.actualizar])
    const FullscreenButton  = useCallback( ({ showModal=false, setShowModal }) => !showModal ? <Button hint={ textTrans.msgPantallaCom } className="custom-toolbar-button mt-1" type="normal" stylingMode="outlined"  icon="fas fa-expand" onClick={ () => setShowModal(true) } /> : null, [textTrans.msgPantallaCom])
    const AddRowButton      = useCallback( ({onClick = () => console.log }) => <Button hint={ textTrans.msgAgregarFila } className="custom-toolbar-button mt-1" type="normal" stylingMode="outlined"  icon="plus" onClick={ () =>  { onClick(); gridRef.current.instance.addRow()} } />, [textTrans.msgAgregarFila])
    const ColumnChooser     = useCallback( () => <Button hint={ textTrans.columnChooser } className="custom-toolbar-button mt-1" type="normal" stylingMode="outlined"  icon="columnchooser" onClick={ () => gridRef.current.instance.showColumnChooser() } />, [])
    const SearchPanel       = useCallback( () => <TextBox placeholder={ textTrans.msgBuscar } className="custom-toolbar-button mt-1"  onInput={ handleSearchInput } showClearButton={true} width={170} mode="search" />, [])

    const LockButton = useCallback( ({ selection, onClick=console.log }) => {
        const cantidad = selection?.toLock?.length ?? 0
        return (
            <button title={ textTrans.Bloquear } disabled={ (cantidad == 0) }  className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1" onClick={ onClick } >
                <AiTwotoneLock size={18} style={{ marginBottom: '1px' }} />
                {
                cantidad > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill discreet-badge">
                    { cantidad }
                    <span className="visually-hidden">textTrans.Bloquear</span>
                </span>
                }
            </button> 
        )
                
    }, [textTrans.Bloquear] )

    const UnlockButton = useCallback( ({ selection, onClick=console.log}) => {
        const cantidad = selection?.toUnlock?.length ?? 0
        return (
            <button title={ textTrans.Desbloquear } disabled={ (cantidad == 0) } className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1"  onClick={ onClick } >
                <AiTwotoneUnlock size={18} style={{ marginBottom: '1px' }} />
                {
                cantidad > 0 &&
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill discreet-badge">
                    { cantidad }
                    <span className="visually-hidden">textTrans.Desbloquear</span>
                </span>
                }
            </button>
        )
    }, [textTrans.Desbloquear])


    const ClearSelectionButton = useCallback( ( {cantidad} ) => {
        return (
            <button title={ textTrans.borrarSeleccion } disabled={ (cantidad == 0) } className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1" onClick={ () => gridRef?.current?.instance?.clearSelection() }  >
                <MdDeselect size={19} style={{ marginBottom: '2px' }} />
            </button>
        )
    }, [textTrans.Desbloquear])
    


    const EnlargeButton = useCallback( ({heights = defaultHeights}) => {

        const currenIndex = heights.findIndex( i => i == height )
        if ( currenIndex == -1 ) setHeight( heights?.at(0) )

        return (
            <button title={ textTrans.enlarge }  className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1 border rounded-md" onClick={ () => handleHeigthChange({heights}) }  >
                <TbArrowAutofitHeight size={19} style={{ marginBottom: '2px' }} />
            </button>
        )

    }, [height])



    const CustomButton = useCallback(({ title, disabled, onClick, children, badgeEnabled = false, cantidad = 0 }) => {
        return (
            <button 
                title={title} 
                disabled={disabled ?? cantidad == 0} 
                className="relative p-2 mt-1 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md" 
                onClick={onClick}>
                {children}
                {
                    cantidad > 0 &&
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                        {cantidad}
                        <span className="sr-only">{title}</span>
                    </span>
                }
            </button>
        );
    }, []);
    


    const CustomToolbar = ({ children, title, ComponentIcon, showModal }) => {
        return (
            <>
                <div className="mt-2 ms-2 me-0 ps-2 pt-3 mb-1 flex justify-between items-center">
                    {!showModal && (
                        <div className="flex items-center space-x-4">
                            <h4 className="flex font-semibold text-xl text-stone-700 mt-1">
                                {ComponentIcon} {title}
                            </h4>
                        </div>
                    )}
                    <div className="flex items-center space-x-4">
                        {children}
                    </div>
                </div>
                <hr className="mt-2 mx-4 mb-[-5px]" />
            </>
        );
    };
    


    const TextAndSave = ({ title, onClick, clearOnSave = true }) => {
        const [saveName, setSaveName] = useState("");

        const handleSaveClick = () => {
            if (onClick) {
                onClick({ value: saveName });
                if (clearOnSave) setSaveName("");
            }
        };

        return (
            <>
                <TextBox className="mb-2 me-2" label={trans(title)} value={saveName} onValueChanged={({ value }) => setSaveName(value)} />
                <Button title={trans("Guardar")} disabled={!saveName} className="mt-1" icon="save" onClick={handleSaveClick} />
            </>
        );
    };


    const ToolbarSplitter = useCallback(() => <div className="border-r-2 h-5 mx-3 mt-1"></div>, []);


    return { CustomToolbar, RefreshButton, SearchPanel, LockButton, UnlockButton, ClearSelectionButton, FullscreenButton, AddRowButton, ColumnChooser, CustomButton, ToolbarSplitter, EnlargeButton, TextAndSave, height }
}