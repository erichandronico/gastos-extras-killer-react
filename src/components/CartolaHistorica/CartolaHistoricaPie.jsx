import { PieChart } from "devextreme-react"
import { Font, Legend, Series, Title, Tooltip } from "devextreme-react/pie-chart"
import { useCategoryVsDate } from "../../hooks/queries/useCategoryVsDate"
import { customizeTooltipPie, toggleLegendVisibility } from "../../helpers/dxUtils"


const onLegendClick = ({component,target}) => toggleLegendVisibility( {target: component.getAllSeries()[0].getPointsByArg(target)[0]} )

export const CartolaHistoricaPie = () => {

    const catVsDate = useCategoryVsDate()

  return (
    <PieChart 
        id="pie"
        dataSource={catVsDate?.data?.pieFormat} 
        palette={"Ocean"} 
        innerRadius={0.75}
        onPointClick={ toggleLegendVisibility }
        onLegendClick={ onLegendClick }
    >   
        <Series 
            type="doughnut" 
            argumentField="category" 
            valueField='total' />
        <Tooltip customizeTooltip={ customizeTooltipPie } enabled={true} />
        <Legend 
            visible={true}
            verticalAlignment="top"
            horizontalAlignment="right"
            itemTextPosition="right"
            orientation="vertical"
            position="inside" 
        >
            <Font size={11} />
        </Legend>


        <Title text="Cartola por Categorías" />

    </PieChart>
  )
}
