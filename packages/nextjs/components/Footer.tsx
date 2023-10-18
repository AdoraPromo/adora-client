import { HeartIcon } from "@heroicons/react/24/outline";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="w-full min-h-0 py-5 px-1 mb-11 lg:mb-0 text-neutral-content fixed bottom-0 mx-auto">
      <div className="w-full flex justify-center items-center gap-2">
        <p className="m-0 text-center">
          Built with <HeartIcon className="inline-block h-5 w-5 stroke-primary" /> at
        </p>
        <a
          className="flex justify-center items-center"
          href="https://github.com/AdoraPromo"
          target="_blank"
          rel="noreferrer"
        >
          <span className="link text-primary">Adora.Promo</span>
        </a>
      </div>
    </div>
  );
};
