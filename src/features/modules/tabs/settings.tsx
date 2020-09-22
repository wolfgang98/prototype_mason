import React, {FunctionComponent, ChangeEvent, useState, useEffect} from 'react';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { IDialogSettings } from 'features/components/module/types';
import { ISettings } from './types';

const TabsDialog: FunctionComponent<IDialogSettings> = (props) => {
  const [settings, setSettings] = useState<ISettings>(JSON.parse(props.settings))

  const {byId, allIds} = useSelector((state: RootState) => state.module);

  useEffect(() => {
    props.onSettingsChange(JSON.stringify(settings));
  }, [props, settings]);

  const handleChange = (index: string, event: ChangeEvent<{value: string}>) => {
    const value = String(event.target.value);
    setSettings(old => ({
      tabs: {
        ...old.tabs,
        [index]: { label: value as string || '', module: old.tabs[index].module }
      }
    }));
  }

  const handleSelectChange = (index: string, event: ChangeEvent<{value: any}>) => {
    const value = String(event.target.value);
    setSettings(old => ({
      tabs: {
        ...old.tabs,
        [index]: { label: old.tabs[index].label, module: value }
      }
    }));
  }
  
  const handleClick = () => {
    setSettings(old => ({
      tabs: {
        ...old.tabs,
        [String(Object.keys(old.tabs).length)]: { label: '', module: '' }
      }
    }));
  }

  return (
    <>
      {/* todo: use material grid components to make it easier to position, resize */}
      {
        Object.keys(settings.tabs).map(index => (
          <div key={index}>
            <TextField type="string" value={settings.tabs[index].label} onChange={(e) => handleChange(index, e)} />
            <Select value={settings.tabs[index].module} onChange={(e) => handleSelectChange(index, e)}>
              {
                allIds.map(id => <MenuItem value={id}>{byId[id].type} ({id})</MenuItem>)
              }
            </Select>
          </div>
        ))
      }
      { <br/> /* todo: use css */}
      <Button variant='outlined' onClick={handleClick}>New Tab</Button>
    </>
  )
}

export default TabsDialog;