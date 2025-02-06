import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const isDev = import.meta.env.DEV;
export const siteConfig: SiteConfig = {
  title: "JinYue",
  subtitle: "jy-blog",
  lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  url: isDev ? "http://localhost:4321/" : "https://jinyue.site/blog/",
  updateTime: {
    enable: true,
    type: isDev ? "fs" : "git",
  },
  devMode: {
    showDraftPages: true,
  },
  description: "Welcome to my website!",
  themeColor: {
    hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: "assets/images/banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: true, // Display the credit text of the banner image
      text: "空色天絵 / NEO TOKYO NOIR 01", // Credit text to be displayed
      url: "https://www.pixiv.net/artworks/111024784", // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 3, // Maximum heading depth to show in the table, from 1 to 3
  },
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    LinkPreset.sponsor,
    {
      name: "GitHub",
      url: "https://github.com/JinYue127/jy-blog", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
    {
      name: "Radash",
      url: "https://jinyue.site/radash-study/", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar:
    // isDev ?
    "https://www.helloimg.com/i/2024/09/13/66e3deebaa69e.jpg",
  // :
  //   "https://jy-blog.vercel.app/android-chrome-512x512.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Jin Yue",
  bio: "A Frontend Developer",
  twitterId: "test",
  links: [
    {
      name: "bilibili",
      icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: "https://www.bilibili.com/",
    },
    {
      name: "Tiktok",
      icon: "fa6-brands:tiktok",
      url: "https://www.douyin.com/",
    },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/JinYue127/jy-blog",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};
