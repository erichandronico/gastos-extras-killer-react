import { useCallback, useMemo, useRef } from "react"
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { exportDataGrid as exportDataGridToPdf }  from "devextreme/pdf_exporter";
import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';
import { jsPDF } from 'jspdf';
import { SiMicrosoftexcel } from "react-icons/si";
import { AiOutlineFilePdf } from "react-icons/ai";
import { trans } from "../../helpers/utils";
import './css/exportGrid.css'



const onExporting = ({title, worksheetName=undefined, landscape=true }) => (component, format) => {

    switch( format ) {
  
      case "pdf":
        const doc = new jsPDF({ orientation: (landscape) ? 'landscape' : 'portrait', unit: "in", format: [22, 17] });
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component,
            landscape,
            indent: 5,
          }).then(() => {
            doc.save(`${title}.pdf`);
          });
        break;
      
      case "xlsx":
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(worksheetName ?? title);
        exportDataGridToExcel({
          component: component,
          worksheet: worksheet,
          autoFilterEnabled: true
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              `${title}.xlsx`
            );
          });
        });
        break;
  
    }
  };


const handleOnExporting = ({title}) => onExporting({title})



export const useExportGrid = () => {

    // const {lang}                = useSelector( state => state.auth )
    const lang = 'CL'
    const gridRef               = useRef(null)
    const handleExportToPDF     = useCallback( (title) => handleOnExporting({title}) ( gridRef?.current?.instance, 'pdf' ), [gridRef?.current])
    const handleExportToExcel   = useCallback( (title) => handleOnExporting({title}) ( gridRef?.current?.instance, 'xlsx' ), [gridRef?.current])

    const textTrans = useMemo( () => ({
        exportPdf:  trans('Exportar a PDF'),
        exportExcel:  trans('Exportar a Excel'),
     }),[lang])

    const ExportExcel = useCallback(({title, marginRight=8}) => (
        <button  className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1" style={{height: 35, marginRight}} title={ textTrans.exportExcel }  onClick={ () => handleExportToExcel(title) }>
            <SiMicrosoftexcel size={20} style={{ marginBottom: '4px', width: 21 }} />
        </button>
    ), [gridRef?.current])

    const ExportPDF = useCallback(({title, marginRight=8}) => (
        <button  className="btn btn-light position-relative custom-button p-2 custom-toolbar-button mt-1" style={{height: 35, marginRight}}  title={ textTrans.exportPdf } onClick={ () => handleExportToPDF(title) }>
            <AiOutlineFilePdf size={20} style={{ marginBottom: '4px', width: 21 }} />
        </button>
    ), [gridRef?.current])


    return { gridRef, handleExportToPDF, handleExportToExcel, ExportExcel, ExportPDF }
}