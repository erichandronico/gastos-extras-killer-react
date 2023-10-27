import { DataGrid } from "devextreme-react"
import { useCategoryVsDate } from "../../hooks/queries/useCategoryVsDate"
import { Column } from "devextreme-react/data-grid"
import { currencyFormatter } from "../../helpers/utils"





export const CartolaHistoricaPieGrid = () => {

    const catVsDate = useCategoryVsDate()

  return (
    <DataGrid
        dataSource={catVsDate?.data?.pieFormat}
        className="grid1 mt-2"
        height={400}
        paging={{ pageSize: 10}}
        >
            <Column dataField="category" caption="Categoría" />
            <Column dataField="total" dataType="currency" format={{ formatter: currencyFormatter.format}} sortOrder="desc" />


    </DataGrid>
  )
}
