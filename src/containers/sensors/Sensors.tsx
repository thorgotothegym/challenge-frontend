import { AxiosError, AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { instance } from "../../request/http";

import { getDataFromLocalStorage } from "../../utils/get";
import { ISensor } from "./sensors.model";

export const Sensors = () => {
  const [sensors, setSensors] = useState<ISensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSensors = async () => {
      instance
        .get<ISensor>(`api/v1/sensors/`)
        .then((response: AxiosResponse) => {
          setSensors(response.data);
          setLoading(false)
        })
        .catch((error: AxiosError) => {
            console.log('error', error)
        });
    };
    getSensors();
  }, []);

  return (
    <>
      {loading === true ? (
        "loading"
      ) : (
        <div>
          {sensors.map((item: ISensor, id: number) => {
            return (
              <div key={id}>
                <ul>
                  <li>ID: {item.id}</li>
                  <li>Description: {item.description}</li>
                  <li>isActive: {item.isActive === true ? 'True' : 'False'}</li>
                  <li>SampligPeriod: {item.samplingPeriod}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
