import { Button } from "../misc/Button";
import { notification } from "~~/utils/scaffold-eth";

export const GetStarted = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10 gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="text-4xl font-bold">
          Welcome to <span className="text-accent">Adora.Promo</span>!
        </div>
        <div className="text-xl">Let&apos;s get started...</div>
      </div>
      <div className="rounded-lg bg-primary w-2/5 h-2/3 p-16 flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col gap-2 text-lg">
          <label>Connect Wallet</label>
          <Button
            widthPx={80}
            heightPx={12}
            bgColor="secondary-content"
            textColor="accent"
            text="Connect Wallet"
            onClick={() => notification.loading("Connecting Wallet...")}
          />
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <label>Connect Twitter</label>
          <Button
            widthPx={80}
            heightPx={12}
            bgColor="secondary-content"
            textColor="accent"
            text="Connect Twitter"
            onClick={() => notification.loading("Connecting Twitter...")}
          />
        </div>
      </div>
    </div>
  );
};
