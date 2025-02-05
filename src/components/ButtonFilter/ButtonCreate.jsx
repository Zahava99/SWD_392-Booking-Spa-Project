import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";

export default function ButtonCreate({
  contentBtn,
  width,
  height,
  onClick,
  icon,
  onChange,
  ...rest
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontWeight: "600",
          },
        },
        token: {
          colorPrimary: "#333333",
        },
      }}
    >
      <Button type="primary" icon={<PlusOutlined />}>
        {contentBtn}
      </Button>
    </ConfigProvider>
  );
}
