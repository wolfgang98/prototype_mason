export interface IModule {
  id: string;
  type: string;
  settings: string;
  state: string;
}

export interface IDialogSettings {
  settings: string;
  onSettingsChange: (value: string) => void;
}