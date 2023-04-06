import React, { useEffect, useState } from "react";
import SearchCar from "./SearchCar";
import RegisterCar from "./RegisterCar";
import TransferOwnership from "./TransferOwnership";
import { Layout, Menu, notification, Spin } from "antd";
import contractAddress from "./contracts/contract-address.json";
import CMArtifact from "./contracts/artifiact.json";
import { ethers } from "ethers";
const { Header } = Layout;

function App() {
  const [contract, setContract] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [spin, setSpin] = useState(false);
  const connectWallet = async () => {
    try {
      const [selectedAddress] = await window.ethereum.request({
        method: "eth_requestAccounts", // get the currently connected address
      });
      setSelectedAddress(selectedAddress);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const cm = new ethers.Contract(
        contractAddress.CM, // contract address
        CMArtifact.abi, // contract abi (meta-data)
        provider.getSigner(0) // Signer object signs and sends transactions
      );
      setContract(cm);
    } catch (err) {
      notification.open({
        message: "Error",
        description: `${err.message}`,
      });
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);

  const menu = [
    {
      key: 1,
      label: "Search",
    },
    {
      key: 2,
      label: "Add New Registry",
    },
    {
      key: 3,
      label: "Transfer Ownership",
    },
  ];

  const [menuKey, setMenuKey] = useState("");

  const getMenuComponents = (menuKey) => {
    if (menuKey === "1")
      return <SearchCar contract={contract} setSpin={setSpin} />;
    if (menuKey === "2")
      return <RegisterCar contract={contract} setSpin={setSpin} />;
    if (menuKey === "3")
      return <TransferOwnership contract={contract} setSpin={setSpin} />;
    return <SearchCar contract={contract} setSpin={setSpin} />;
  };

  return (
    <div className="App">
      <Spin spinning={spin}>
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={menu}
              onClick={({ key }) => setMenuKey(key)}
            />
            {getMenuComponents(menuKey)}
          </Header>
        </Layout>
      </Spin>
    </div>
  );
}

export default App;
