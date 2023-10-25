import { Tab, TabGroup, TabList, TabPanels } from '@tremor/react'
import React from 'react'

export const TremorTab = ({children, tabList=[]}) => {
    
  return (
        <TabGroup className="p-2">
            <TabList>
                { tabList.map( tabName => ( <Tab key={tabName}>{tabName}</Tab>)) }
            </TabList>
            <TabPanels>
                {children}
            </TabPanels>
        </TabGroup>
  )
}
