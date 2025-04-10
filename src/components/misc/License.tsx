import { formatDateToYYYYMMDD } from "@utils/date-utils";
import { licenseConfig, profileConfig } from "@config";
import { i18n } from "@i18n/translation";
import I18nKey from "@i18n/i18nKey";
import { cn } from "@utils/class-utils";
import { toast } from "react-toastify";
interface Props {
  title: string;
  slug: string;
  pubDate: Date;
  lastModified: string;
  className: string;
}

const License = (props: Props) => {
  const { title, pubDate, lastModified, className } = props;
  const profileConf = profileConfig;
  const licenseConf = licenseConfig;
  const postUrl = decodeURIComponent(window.location.href);
  const onCopy = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success("已复制文章链接");
  };
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--license-block-bg)] px-6 py-5 transition",
        className,
      )}
    >
      <div className="font-bold text-black/75 transition dark:text-white/75">
        {title}
      </div>
      <div className="flex items-center gap-2 text-[var(--primary)]">
        <span className="link">{postUrl}</span>
        <span
          onClick={onCopy}
          className="icon-[fa6-regular--copy] cursor-pointer text-sm transition-transform hover:scale-125"
        />
      </div>
      <div className="mt-2 flex gap-6">
        <div>
          <div className="text-sm text-black/30 transition dark:text-white/30">
            {i18n(I18nKey.author)}
          </div>
          <div className="line-clamp-2 text-black/75 transition dark:text-white/75">
            {profileConf.name}
          </div>
        </div>
        <div>
          <div className="text-sm text-black/30 transition dark:text-white/30">
            {i18n(I18nKey.publishedAt)}
          </div>
          <div className="line-clamp-2 text-black/75 transition dark:text-white/75">
            {formatDateToYYYYMMDD(pubDate)}
          </div>
        </div>
        <div>
          <div className="text-sm text-black/30 transition dark:text-white/30">
            {i18n(I18nKey.lastModified)}
          </div>
          <div className="line-clamp-2 text-black/75 transition dark:text-white/75">
            {formatDateToYYYYMMDD(lastModified)}
          </div>
        </div>
        <div>
          <div className="text-sm text-black/30 transition dark:text-white/30">
            {i18n(I18nKey.license)}
          </div>
          <a
            href={licenseConf.url}
            target="_blank"
            className="link line-clamp-2 text-[var(--primary)]"
          >
            {licenseConf.name}
          </a>
        </div>
      </div>
      <span className="icon-[fa6-brands--creative-commons] pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[15rem] text-black/5 transition dark:text-white/5" />
    </div>
  );
};
export default License;
