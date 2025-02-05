import { FilterOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";
import { RiFilter3Line } from "@remixicon/react";

export default function ButtonFilter({
  contentBtn,

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
      <Button type="primary" style={{ display: "flex" }}>
        <RiFilter3Line />
        {contentBtn}
      </Button>
    </ConfigProvider>
  );
}
