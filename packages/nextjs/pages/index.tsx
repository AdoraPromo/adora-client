import { useRouter } from "next/router";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useGlobalState } from "~~/services/store/store";

const Home: NextPage = () => {
  const { address } = useGlobalState();
  const router = useRouter();

  if (address) {
    router.push("/outgoing");
    return;
  }

  return (
    <>
      <MetaHeader />
      <div className="h-full flex items-center justify-center flex-col flex-grow pb-48 gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="text-neutral text-4xl font-bold">Welcome to</div>
          <div className="text-primary text-7xl font-bold">Adora.Promo!</div>
          {/* <div className="text-xl text-neutral">Let&apos;s get started...</div> */}
          <div className="text-2xl text-neutral flex flex-col items-center justify-center">
            Connect your Wallet <span>to get started!</span>
          </div>
        </div>
        {/* <Button
            classes={{
              width: "1/4",
              height: "36",
              padding: "5",
              bgColor: "primary",
              textColor: "accent",
              textSize: "2xl",
              fontWeight: "bold",
            }}
            text="Connect Wallet"
            onClick={() => notification.loading("Connecting Wallet...")}
          /> */}
      </div>
    </>
  );
};

export default Home;
