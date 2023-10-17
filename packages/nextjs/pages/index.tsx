import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GetStarted } from "~~/components/index/GetStarted";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="h-full flex flex-col mt-16">
        <GetStarted />
      </div>
    </>
  );
};

export default Home;
