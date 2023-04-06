import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  Space,
  notification,
} from "antd";
import { useState } from "react";
const { Title } = Typography;
const { Content } = Layout;

const TransferOwnership = ({ contract, setSpin }) => {
  const [form] = Form.useForm();

  const onFormFinish = async ({ owner, number }) => {
    try {
      setSpin(true);
      const transaction = await contract.transferCarOwnership(number, owner);
      await transaction.wait();

      notification.open({
        message: "Success",
        description: `Car ownership transfered`,
      });
      reset();
    } catch (err) {
      notification.open({
        message: "Error",
        description: `${err.reason}`,
      });
    }
    setSpin(false);
  };
  const reset = () => {
    form.resetFields();
  };
  return (
    <Content style={{ padding: "0 45px" }}>
      <div>
        <Title level={3}>Transfer Ownership</Title>
        <Form form={form} layout="vertical" onFinish={onFormFinish}>
          <Form.Item
            name="number"
            label="Car Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Car Number" />
          </Form.Item>
          <Form.Item
            name="owner"
            label="New Owner"
            rules={[{ required: true }]}
          >
            <Input placeholder="New Owner" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Transfer
              </Button>
              <Button htmlType="button" onClick={reset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default TransferOwnership;
