export interface IDialog {
  nickname: string;
  message: string;
  type: "TEXT" | "IMAGE" | "VOD" | "VOICE";
  "datetime(UTC)": string;
}

const Dialog = ({ d }: { d: IDialog }) => {
  return (
    <div
      key={d["datetime(UTC)"]}
      className="bg-universe w-fit rounded-r-full px-3 py-2
      first:rounded-tl-full
      last:rounded-bl-full
      "
    >
      <p className="text-white">{d.message}</p>
      {/* <p>{d["datetime(UTC)"]}</p> */}
    </div>
  );
};

export default Dialog;
