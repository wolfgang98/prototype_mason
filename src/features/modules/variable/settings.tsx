import React, {FunctionComponent, ChangeEvent, useState, useEffect} from 'react';
import { Select, MenuItem, Switch } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { IDialogSettings } from 'features/components/module/types';
import { ISettings } from './types';

const VariableDialog: FunctionComponent<IDialogSettings> = (props) => {
  const parsedJSON = JSON.parse(props.settings);
  const [settings, setSettings] = useState<ISettings>({
    variableId: parsedJSON.variableId,
    isEditable: parsedJSON.isEditable
  });

  const variables = useSelector((state: RootState) => state.grid.variables);

  useEffect(() => {
    props.onSettingsChange(JSON.stringify(settings));
  }, [props, settings]);

  const handleSelectChange = (event: ChangeEvent<{value: any}>) => {
    const value = String(event.target.value);
    setSettings(old => ({
      ...old,
      variableId: value
    }));
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setSettings(old => ({
      ...old,
      isEditable: value
    }));
  };

  return (
    <>
      {/* Todo: Add Material UI Labels */}
      <span>Variable: </span>
      <Select  value={settings.variableId} onChange={handleSelectChange}>
        { variables.map(v => <MenuItem value={v.id}>{v.name}</MenuItem>) }
      </Select>
      {/* Todo: Use css */}
      <br/>
      {/* Todo: Add Material UI Labels */}
      <span>Editable: </span>
      <Switch color="primary" checked={settings.isEditable} onChange={handleChange} />
    </>
  )
}

export default VariableDialog;