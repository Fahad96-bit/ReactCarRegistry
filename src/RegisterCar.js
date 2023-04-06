import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  Space,
  notification,
} from "antd";
const { Title } = Typography;
const { Content } = Layout;
const RegisterCar = ({ contract, setSpin }) => {
  const [form] = Form.useForm();

  const onFormFinish = async ({ number, owner, make, model, year }) => {
    try {
      setSpin(true);
      const transaction = await contract.addCarDetail(
        number,
        owner,
        make,
        model,
        year
      );
      await transaction.wait();
      notification.open({
        message: "Success",
        description: `Car registered successfully`,
      });
      reset();
    } catch (err) {
      console.log("err", err);
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
    <Content style={{ padding: "0 60px" }}>
      <div>
        <Title level={3}>Add Car Details</Title>
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
            label="Car Owner"
            rules={[{ required: true }]}
          >
            <Input placeholder="Car Owner" />
          </Form.Item>

          <Form.Item name="make" label="Car Make" rules={[{ required: true }]}>
            <Input placeholder="Car Make" />
          </Form.Item>

          <Form.Item
            name="model"
            label="Car Model"
            rules={[{ required: true }]}
          >
            <Input placeholder="Car Model" />
          </Form.Item>

          <Form.Item name="year" label="Car Year" rules={[{ required: true }]}>
            <Input placeholder="Car Year" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
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

export default RegisterCar;
