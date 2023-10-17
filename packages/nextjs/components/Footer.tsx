import { HeartIcon } from "@heroicons/react/24/outline";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0 text-neutral-content">
      <div className="w-full flex justify-center items-center gap-2">
        <p className="m-0 text-center">
          Built with <HeartIcon className="inline-block h-4 w-4" /> at
        </p>
        <a
          className="flex justify-center items-center"
          href="https://github.com/AdoraPromo"
          target="_blank"
          rel="noreferrer"
        >
          <span className="link">Adora.Promo</span>
        </a>
      </div>
    </div>
  );
};
