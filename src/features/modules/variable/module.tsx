import React, {FunctionComponent, useMemo, ChangeEvent} from 'react';
import { RootState } from 'app/store';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { TextField } from '@material-ui/core';
import { IModule } from 'features/components/module/types';
import { changeVariableValue } from 'features/components/grid/gridSlice';
import './module.scss';

const selectVariableById = () => createSelector(
  (state: RootState) => state.grid.variables,
  (_: any, id: any) => id,
  (variables, id) => variables.find(e => e.id === id)
)

const Module: FunctionComponent<IModule> = (props) => {
  const parsed = JSON.parse(props.settings);

  const settings: { variableId: string, isEditable: boolean } = {
    variableId: parsed.variableId,
    isEditable: parsed.isEditable
  };

  const selectVariable = useMemo(selectVariableById, []);
  const variable = useSelector((state: RootState) => selectVariable(state, settings.variableId));

  const dispatch = useDispatch();
  
  const onVariableValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeVariableValue({ id: settings.variableId, value: event.currentTarget.value }));
  }

  return (
    <div className="variable">
      {
        variable &&
        (
          settings.isEditable
            ? <TextField label={variable.name} type={variable.type} value={variable.value} onChange={onVariableValueChange} variant={'outlined'} />
            : <span><b>{variable.name}:</b> {variable.value} (<i>{variable.tags.join(', ')}</i>)</span>
        )
      }
    </div>
  )
}

export default Module;