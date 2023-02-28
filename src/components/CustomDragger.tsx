import type { UploadProps } from "antd";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const CustomDragger = ({ setFileList }: any) => {
  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: true,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file, FileList) {
      setFileList(FileList.filter((f) => f.type !== ""));
      return false;
    },
  };

  return (
    <Dragger {...props} multiple directory>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">1. Unzip Universe download PM.zip</p>
      <p className="ant-upload-hint">2. Upload here</p>
    </Dragger>
  );
};

export default CustomDragger;
