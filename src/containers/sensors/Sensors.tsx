import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { AxiosError, AxiosResponse } from "axios";

import { instance } from "../../request/http";

import { ISensor } from "./sensors.model";

import styled from "styled-components";

export const Sensors = () => {
  const [sensors, setSensors] = useState<ISensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSensors = async () => {
    instance
      .get<ISensor>(`api/v1/sensors/`)
      .then((response: AxiosResponse) => {
        setSensors(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log("error", error);
      });
  };

  /* useEffect(() => {
    
    getSensors();
  }, []); */

  return (
    <>
      <WrapperOptions>
        <h1>what do you want to do?</h1>
        <Button
          type="primary"
          onClick={() => {
            getSensors();
          }}
        >
          Get all the sensors
        </Button>
        <Button type="primary" disabled={true}>Creates a sensor</Button>
        <Button type="primary" disabled={true}>Get senor_id sensor data</Button>
        <Button type="primary" disabled={true}>Replaces senor_id sensor data</Button>
        <Button type="primary" disabled={true}>Partially updates senor_id sensor data</Button>
        <Button type="primary" disabled={true}>Deletes the senor_id sensor</Button>
      </WrapperOptions>
      
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

const WrapperOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 5px;
  }
`;
