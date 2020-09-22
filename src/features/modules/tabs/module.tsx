import React, {FunctionComponent, ChangeEvent} from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { IModule } from 'features/components/module/types';
import ModuleRenderer from 'features/components/module/moduleRenderer';
import { ISettings } from './types';
import './module.scss';

const TabPanel: FunctionComponent<{index: number, value: number, module: string}> = ({index, value, module}) => {
  return (
    <div hidden={value !== index}>
      {
        value === index &&
        module && (
          <ModuleRenderer id={module} />
        )
      }
    </div>
)};

const Module: FunctionComponent<IModule> = (props) => {
  const settings: ISettings = JSON.parse(props.settings);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <div className="tabs">
      <AppBar className="bar" position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {
            Object.keys(settings.tabs).map(key => <Tab key={key} label={settings.tabs[key].label} />)
          }
        </Tabs>
      </AppBar>
      {
        Object.keys(settings.tabs).map((key, index) => (
          <TabPanel key={index} index={index} value={value} module={settings.tabs[key].module} />
        ))
      }
    </div>
  )  
}

export default Module;