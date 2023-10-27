import { useCallback, useState } from "react"
import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { trans } from "../../helpers/utils"
import {FaHistory} from 'react-icons/fa'
import { useCartola, useCartolas } from "../../hooks/queries/useCartola"
import CartolaHistoricaChart from "./CartolaHistoricaChart"
import { TremorTab } from "../../Layouts/TremorTab"
import { TabPanel } from "@tremor/react"
import { CartolaHistoricaPie } from "./CArtolaHistoricaPie"
import { DxCartolaGrid } from "../CartolaGrid/DxCartolaGrid"
import { SelectBox } from "devextreme-react"
import { CartolaHistoricaPieGrid } from "./CartolaHistoricaPieGrid"


export const CartolaHistorica = () => {
  // const file = useFileContent()

  const [cartolaFilters, setCartolaFilters] = useState({})
  const cartolaQuery                  = useCartola('default', cartolaFilters?.bank, cartolaFilters?.date)
  const cartolas                      = useCartolas()
  const handleSelectCartola           = useCallback(({selectedItem}) => setCartolaFilters(selectedItem), [])
  

  return (
    <MainLayout>
      <Titulo texto={ trans('Cartola Histórica') } Icono={<FaHistory /> } />
      <TremorTab tabList={['Cartola','Categoría vs Fecha', 'Pie']}>
        <TabPanel>
          <div className="flex justify-end">
              <SelectBox 
                  dataSource={cartolas?.data?.cartolas} 
                  valueExpr={"id"} 
                  displayExpr={"id"} 
                  className="mt-1 text-xs" 
                  onSelectionChanged={handleSelectCartola} 
                  value={cartolaFilters?.id} 
                  width={250} 
                  label="Selacciona la Cartola"
              />
          </div>
          <DxCartolaGrid cartola={cartolaQuery} />
        </TabPanel>
        <TabPanel>
          <CartolaHistoricaChart />
        </TabPanel>
        <TabPanel>
          <div className="flex space-x-4">
            <div className="w-2/6 mt-3">
              <CartolaHistoricaPieGrid />
            </div>
            <div className="w-4/6">
              <CartolaHistoricaPie />
            </div>
          </div>
        </TabPanel>
      </TremorTab>
    </MainLayout>
  )
}
