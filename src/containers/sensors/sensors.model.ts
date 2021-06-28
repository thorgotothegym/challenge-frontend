export interface ISensor {
  id: number;
  description: string;
  samplingPeriod: number;
  isActive: boolean;
}
export interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: ISensor) => void;
  onCancel?: () => void;
  hasBeenCreated?: boolean;
}

export interface GetSensorID {
  onCreate: () => void;
  onCancel: () => void;
}
