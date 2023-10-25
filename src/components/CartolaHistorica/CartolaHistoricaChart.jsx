
import { Chart } from 'devextreme-react';
import { useCategoryVsDate } from '../../hooks/queries/useCategoryVsDate';
import { CommonSeriesSettings, Title, ValueAxis, SeriesTemplate, Tooltip } from 'devextreme-react/chart';
import { memo } from 'react';
import { onPointClickfn, toggleLegendVisibility, tooltipFn } from '../../helpers/dxUtils';

const CartolaHistoricaChart = () => {

  const catVsDate = useCategoryVsDate()

    return (
      <Chart 
        id="barChart" 
        dataSource={catVsDate?.data?.categoryVsDate} 
        palette={"Harmony Light"} 
        adaptiveLayout={{ width: 500, keepLabels: true }}
        legend={{ visible: true, verticalAlignment: 'top', horizontalAlignment: 'center', itemTextPosition: "right", orientation: 'horizontal', position: 'outside', font: { size: 10 } }}
        commonPaneSettings={{ border: { visible: true, width: 1, top: false, right: false, left: false, bottom: true } }}
        onPointClick={ onPointClickfn }
        onLegendClick={ toggleLegendVisibility }
        >
        <CommonSeriesSettings type="bar" argumentField="category" valueField='total' />
        <SeriesTemplate nameField='date' />
        <ValueAxis position="left" title="$CLP" />
        <Tooltip 
          enabled={true} 
          shared={true}
          format='fixedPoint'
          precision={0} 
          customizeTooltip={ tooltipFn }
        />
        <Title text="Gráfico de Cartola Histórica" />
      </Chart>
      );
}

export default memo(CartolaHistoricaChart)