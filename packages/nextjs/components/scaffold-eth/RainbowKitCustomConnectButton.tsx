import { useState } from "react";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Address, BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const router = useRouter();
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);
  const { address, setAddress } = useGlobalState();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        if (!address && connected) {
          setAddress(account.address);
        } else if (address && !connected) {
          router.push("/");
          setAddress("");
        }

        return (
          <>
            {(() => {
              if (!connected) {
                // TODO: Fix hover state where the button goes black for some reason
                return (
                  <button
                    className="btn btn-primary btn-sm text-accent p-4 flex flex-col items-center"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle gap-1">
                      <span>Wrong network</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
                    >
                      <li>
                        <button
                          className="btn-sm !rounded-xl flex py-3 gap-3"
                          type="button"
                          onClick={() => switchNetwork?.(configuredNetwork.id)}
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              }

              return (
                <div className="px-2 flex justify-end items-center ">
                  <div className="dropdown dropdown-end leading-3">
                    <label
                      tabIndex={0}
                      className="btn bg-transparent text-accent btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto"
                    >
                      <BlockieAvatar address={account.address} size={30} ensImage={account.ensAvatar} />
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
                    >
                      <li>
                        {addressCopied ? (
                          <div className="btn-sm !rounded-xl flex gap-3 py-3">
                            <CheckCircleIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            <span className=" whitespace-nowrap">Copy address</span>
                          </div>
                        ) : (
                          <CopyToClipboard
                            text={account.address}
                            onCopy={() => {
                              setAddressCopied(true);
                              setTimeout(() => {
                                setAddressCopied(false);
                              }, 800);
                            }}
                          >
                            <div className="btn-sm !rounded-xl flex gap-3 py-3">
                              <DocumentDuplicateIcon
                                className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                                aria-hidden="true"
                              />
                              <span className=" whitespace-nowrap">Copy address</span>
                            </div>
                          </CopyToClipboard>
                        )}
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <input type="checkbox" id="qrcode-modal" className="modal-toggle" />
                    <label htmlFor="qrcode-modal" className="modal cursor-pointer">
                      <label className="modal-box relative">
                        {/* dummy input to capture event onclick on modal box */}
                        <input className="h-0 w-0 absolute top-0 left-0" />
                        <label
                          htmlFor="qrcode-modal"
                          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                        >
                          ✕
                        </label>
                        <div className="space-y-3 py-6">
                          <div className="flex space-x-4 flex-col items-center gap-6">
                            <QRCodeSVG value={account.address} size={256} />
                            <Address address={account.address} format="long" disableAddressLink />
                          </div>
                        </div>
                      </label>
                    </label>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
