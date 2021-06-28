import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";

import { CollectionsPage } from "../../components/NewSensor/newSensor";
import { GetSensorByID } from "../../components/GetSensor/GetSensorByID";

import { instance } from "../../request/http";

import { ISensor } from "./sensors.model";

import styled from "styled-components";

export const Sensors = () => {
  const [sensors, setSensors] = useState<ISensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const getSensors = async () => {
      try {
        const response = await instance.get<ISensor[]>(
          `http://127.0.0.1:8000/api/v1/sensors/`
        );
        const data = await response.data;
        setSensors(data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getSensors();
  }, []);

  const showModal = () => {
    return <GetSensorByID />;
  };

  return (
    <>
      <WrapperOptions>
        <h1>what do you want to do?</h1>
        <CollectionsPage />
        <Button
          onClick={() => {
            setModal(true)
          }}
        >
          Get idSensor data
        </Button>
      </WrapperOptions>

      {loading === true ? (
        <Spin size="large" />
      ) : (
        <div id="container">
          <div>
            <ContainerList id="one">
              {sensors?.map((item: ISensor, id: number) => {
                return (
                  <div key={id}>
                    <ul>
                      <li>ID: {item.id}</li>
                      <li>Description: {item.description}</li>
                      <li>
                        isActive: {item.isActive === true ? "True" : "False"}
                      </li>
                      <li>SampligPeriod: {item.samplingPeriod}</li>
                    </ul>
                  </div>
                );
              })}
            </ContainerList>
            {modal === false ? 'falso' : <GetSensorByID />}
          </div>
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

const ContainerList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
