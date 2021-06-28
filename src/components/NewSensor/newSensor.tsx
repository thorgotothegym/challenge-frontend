import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, notification } from "antd";

import {
  CollectionCreateFormProps,
  ISensor as INewSensor,
} from "../../containers/sensors/sensors.model";

import { instance } from "../../request/http";

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please add a ID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please add a Description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Is Active"
          name="checkbox"
          valuePropName="checked"
          rules={[{ required: true, message: "is Active?" }]}
        >
          <Radio.Group>
            <Radio value="active">yes</Radio>
            <Radio value="notActive">no</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="SampligPeriod"
          name="sampligPeriod"
          rules={[{ required: true, message: "SampligPeriod" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

interface ICollectionsPage {
  hasBeenCreated?: any;
  updateName: (arg: any) => void;
}

export const CollectionsPage = ({ hasBeenCreated }: ICollectionsPage) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    createSensor(values);
    setVisible(false);
  };

  const createSensor = async (values: any) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      const response = await instance.post<INewSensor>(
        `http://127.0.0.1:8000/api/v1/sensors`,
        { values },
        config
      );
      const data = await response.data;
      notification.open({
        message: "New sensor has been created",
        description: `${data.id}, ${data.description}, ${data.isActive}, ${data.samplingPeriod} `,
        onClick: () => {
          console.log("data", data);
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create New Sensor
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
