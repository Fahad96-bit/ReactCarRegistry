import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  Space,
  notification,
  Table,
} from "antd";
import { useState } from "react";
const { Title, Text } = Typography;
const { Content } = Layout;

const SearchCar = ({ contract, setSpin }) => {
  const [form] = Form.useForm();
  const [carDetails, setCarDetails] = useState([]);

  const onFormFinish = async ({ carNumber }) => {
    try {
      setSpin(true);
      const transaction = await contract.getCarDetail(carNumber);
      const carDetailData = [
        {
          owner: transaction[0],
          make: transaction[1],
          model: transaction[2],
          year: transaction[3].toString(),
        },
      ];
      setCarDetails(carDetailData);
      notification.open({
        message: "Success",
        description: `Car record searched successfully`,
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
        <Title level={3}>Search Car Details</Title>
        <Form form={form} layout="vertical" onFinish={onFormFinish}>
          <Form.Item
            name="carNumber"
            label="Car Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Car Number" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button htmlType="button" onClick={reset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
        {carDetails.length > 0 && (
          <Table
            columns={[
              {
                title: "Car Owner",
                dataIndex: "owner",
                key: "owner",
              },
              {
                title: "Car Make",
                dataIndex: "make",
                key: "make",
              },
              {
                title: "Car Model",
                dataIndex: "model",
                key: "model",
              },
              {
                title: "Car Year",
                dataIndex: "year",
                key: "year",
              },
            ]}
            dataSource={carDetails}
          />
        )}
      </div>
    </Content>
  );
};

export default SearchCar;
