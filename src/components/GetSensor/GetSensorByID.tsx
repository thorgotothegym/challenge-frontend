import React, { useEffect, useState } from "react";
import { Modal, List, Input } from "antd";
import { GetSensorID, ISensor } from "../../containers/sensors/sensors.model";
import { instance } from "../../request/http";

export const GetSensorByID = () => {
  const [data, setData] = useState<ISensor>({
    description: "",
    id: 0,
    isActive: false,
    samplingPeriod: 0,
  });
  const [value, setValue] = useState<any>();

  const userHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    getIDSensorData(value);
  };

  const getIDSensorData = async (id: any) => {
    try {
      const response = await instance.get(
        `http://127.0.0.1:8000/api/v1/sensors/${id}`
      );
      const data = await response.data;
      setData(data);
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Modal
        visible={true}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
      >
        <Input type="number" value={value} onChange={userHandle} />
        {value}
        {JSON.stringify(data)}
      </Modal>
    </div>
  );
};
