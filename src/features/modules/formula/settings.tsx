import React, {FunctionComponent, ChangeEvent, useState, useEffect} from 'react';
import { IDialogSettings } from 'features/components/module/types';
import { ISettings } from './types';
import { TextField } from '@material-ui/core';

const VariableDialog: FunctionComponent<IDialogSettings> = (props) => {
  const parsed = JSON.parse(props.settings);
  const [settings, setSettings] = useState<ISettings>({
    formula: parsed.formula
  });

  useEffect(() => {
    props.onSettingsChange(JSON.stringify(settings));
  }, [props, settings]);

  const handleChange = (event: ChangeEvent<{value: string}>) => {
    const value = event.target.value;
    setSettings(old => ({
      ...old,
      formula: value
    }));
  };

  return (
    <>
      <TextField color="primary" value={settings.formula} onChange={handleChange} />
    </>
  )
}

export default VariableDialog;