import React, {FunctionComponent, useEffect, useState} from 'react';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import { IModule } from 'features/components/module/types';
import { run } from 'formula';
import './module.scss'

const Module: FunctionComponent<IModule> = (props) => {
  const settings: { formula: string } = JSON.parse(props.settings);
  // todo: be smarter.. pull just the variables needed.. no unnessesary redux updates
  // - could be done by using a regEx with a list of all variable names.. add them to the module settings/state as varDependencies
  const variables = useSelector((state: RootState) => state.grid.variables);

  const [formulaOutput, setFormulaOutput] = useState('');
  useEffect(() => {
    // could fail if value can not be converted to a number
    // todo: reinvent how variables are saved in redux (characterSlice + variableSlice?)
    // todo: validate before trying to parse the formula .. some characters are not allwed and will throw an exception
    let res = run(settings.formula, Object.fromEntries(variables.map(v => [v.name, Number(v.value)])));
    setFormulaOutput(res);
  }, [settings, variables])

  return (
    <div className="formula">
      <span><b>Variables:</b> {variables.map(v => v.name).join(', ')}</span>
      <span><b>Formula:</b> {settings.formula}: {formulaOutput}</span>
    </div>
  )  
}

export default Module;