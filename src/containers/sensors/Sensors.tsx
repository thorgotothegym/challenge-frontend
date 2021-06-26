import React, { useState, useEffect } from "react";
import { Modal, Button, Spin, Form } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

import { instance } from "../../request/http";

import { ISensor } from "./sensors.model";

import styled from "styled-components";

export const Sensors = () => {
  const [sensors, setSensors] = useState<ISensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  return (
    <>
      <WrapperOptions>
        <h1>what do you want to do?</h1>
        <Button type="primary" onClick={showModal}>
          Creates a sensor
        </Button>
      </WrapperOptions>

      {loading === true ? (
        <Spin size="large" />
      ) : (
        <div id="container">
          <div>
            <div id="one">
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
            </div>
          </div>
          <div className="modal">
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
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
