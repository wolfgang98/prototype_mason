import React, { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { RootState } from 'app/store';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@material-ui/core';
import './moduleRenderer.scss';

import { IModule, IDialogSettings } from 'features/components/module/types';
import Variable from 'features/modules/variable/module';
import VariableDialog from 'features/modules/variable/settings';
import Formula from 'features/modules/formula/module';
import FormulaDialog from 'features/modules/formula/settings';
import Tabs from 'features/modules/tabs/module';
import TabsDialog from 'features/modules/tabs/settings';
import { saveModuleSettings } from './moduleSlice';

const Modules: {[index: string]: { module: React.FunctionComponent<IModule>, dialog: React.FunctionComponent<IDialogSettings> }} = {
  variable: { module: Variable, dialog: VariableDialog },
  formula: { module: Formula, dialog: FormulaDialog },
  tabs: { module: Tabs, dialog: TabsDialog },
  default: { module: Variable, dialog: TabsDialog }
};

const selectModuleById = () => createSelector(
  (state: RootState) => state.module.byId,
  (_: any, id: any) => id,
  (modules, id) => modules[id]
)

const ModuleRenderer: FunctionComponent<{id: string}> = (props) => {
  const selectModule = useMemo(selectModuleById, []);
  const module = useSelector((state: RootState) => selectModule(state, props.id));

  const ModuleComponent = Modules[module.type || 'default'].module;
  const DialogComponent = Modules[module.type || 'default'].dialog;
  
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // todo: useful to have when modules are beeing loaded by the backend
    setLoaded(true);
  }, [loaded])

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = (save: boolean) => {
    setOpen(false);
    if (save && value) dispatch(saveModuleSettings({ id: props.id, settings: value }));
  }
  
  const handleSettingsChange = (value: string) => {
    setValue(value);
  }

  return (
    <div className="module" onDoubleClick={handleClickOpen}>
      {
        module &&
        Modules[module.type] &&
        Modules[module.type].module &&
        loaded
        ? <ModuleComponent {...module} />
        : <div className='progress'><CircularProgress /></div>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{'MODULE: ' + module.type.toUpperCase()}</DialogTitle>
        <DialogContent>
          {
            module &&
            Modules[module.type] &&
            Modules[module.type].dialog &&
            <DialogComponent settings={module.settings} onSettingsChange={handleSettingsChange} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default ModuleRenderer;