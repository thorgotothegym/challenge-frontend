import { instance } from './http';

export interface ISensor {
  id: number;
  description: string;
  samplingPeriod: number;
  isActive: boolean;
}

export const createSensor = async (ISensor:ISensor) => {
    try {
       await instance.post('api/v1/sensors/', {
            id: ISensor.id,
            description: ISensor.description,
            samplingPeriod: ISensor.samplingPeriod,
            isActive: ISensor.isActive
        } )
        console.log('done??')
    } catch (error) {
        console.log('error', error)
    }
}