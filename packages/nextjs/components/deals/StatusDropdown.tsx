import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "~~/utils/adora/cssUtils";

export interface StatusDropdownProps {
  status: string;
  setStatus: any;
}

export function StatusDropdown({ status, setStatus }: StatusDropdownProps) {
  const onClick = (newStatus: { newStatus: string }) => setStatus(newStatus);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-28 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-accent-content hover:bg-gray-50">
          {status || "Status"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-neutral ring-opacity-10 focus:outline-none">
          <div className="py-1">
            <MenuItem status={"All"} onClick={() => setStatus("")} />
            <MenuItem status={"Accepted"} onClick={onClick} />
            <MenuItem status={"Withdrawn"} onClick={onClick} />
            <MenuItem status={"Pending"} onClick={onClick} />
            <MenuItem status={"Expired"} onClick={onClick} />
            <MenuItem status={"Redeemed"} onClick={onClick} />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const MenuItem = ({ status, onClick }: { status: string; onClick: any }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(active ? "bg-gray-100 text-neutral" : "text-gray-700", "block px-4 py-2 text-md")}
          onClick={() => onClick(status)}
        >
          {status}
        </a>
      )}
    </Menu.Item>
  );
};
