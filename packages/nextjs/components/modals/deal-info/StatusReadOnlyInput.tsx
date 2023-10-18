import Status from "~~/components/deals/Status";

const StatusReadOnlyInput = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-neutral font-bold">Status</label>
      <div className="border-2 py-2 px-4 rounded-lg border-2 border-accent-neutral">
        <Status value={status} />
      </div>
    </div>
  );
};

export default StatusReadOnlyInput;
