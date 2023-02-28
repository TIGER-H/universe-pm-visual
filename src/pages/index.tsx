import CustomDragger from "@/components/CustomDragger";
import Dialog, { IDialog } from "@/components/Dialog";
import { CalendarOutlined } from "@ant-design/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Image } from "antd";

const DialogFromFile = ({ fileList }: { fileList: File[] }) => {
  const [dialog, setDialog] = useState<IDialog[]>([]);

  // const dates = dialog.map((d) => d["datetime(UTC)"]);

  useEffect(() => {
    fileList
      .find((f) => f.type === "text/csv")
      ?.text()
      .then((t) => {
        const lines = t.split("\n");
        const headers = lines[0].split(",");
        const data = lines.slice(1).map((line) => {
          const values = line.split(",");
          const entry: any = {};
          headers.forEach((header, index) => {
            entry[header] = values[index];
          });
          return entry;
        });
        setDialog(data);
      });
  }, [fileList]);

  return (
    <div className="bg-black">
      <Head>
        <title>{dialog[0]?.nickname} PM</title>
      </Head>
      <div className="">
        <header className="flex justify-between items-center text-lg text-white h-16 top-0 p-4 sticky backdrop-blur-lg">
          {dialog[0]?.nickname || ""}
          <CalendarOutlined />
        </header>
        <article className="p-2 flex flex-col gap-1 md:w-2/3 mx-auto">
          {dialog.map((d) => {
            switch (d.type) {
              case "IMAGE": {
                const obj = fileList.find((f) => f.name === d.message);
                if (!obj) return;
                return (
                  <Image
                    key={d["datetime(UTC)"]}
                    src={URL.createObjectURL(obj)}
                    alt={d.message}
                    width={400}
                    className="rounded-r-lg"
                  />
                );
              }
              case "VOD": {
                const obj = fileList.find((f) => f.name === d.message);
                if (!obj) return;
                return (
                  <video
                    src={URL.createObjectURL(obj)}
                    controls
                    width={200}
                    key={d["datetime(UTC)"]}
                  />
                );
              }

              // No file, TO FIX
              case "VOICE":
                return;

              default:
                return <Dialog d={d} key={d["datetime(UTC)"]} />;
            }
          })}
        </article>
      </div>
    </div>
  );
};

export default function Home() {
  const [fileList, setFileList] = useState<File[]>([]);

  if (fileList.length > 0) {
    return (
      <div>
        <DialogFromFile fileList={fileList} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>UNIVERSE PM</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <CustomDragger setFileList={setFileList} />
      </main>
    </>
  );
}
