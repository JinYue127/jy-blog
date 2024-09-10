import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
  title: string;
  subtitle: string;
  url: string;
  lang: string;
  updateTime: {
    enable: boolean;
    type: "git" | "fs";
  };
  description: string;
  devMode: {
    showDraftPages: boolean;
  };
  themeColor: {
    hue: number;
    fixed: boolean;
  };
  banner: {
    enable: boolean;
    src: string;
    position?: string;
    credit: {
      enable: boolean;
      text: string;
      url?: string;
    };
  };
};

export enum LinkPreset {
  Home = 0,
  Archive = 1,
  About = 2,
}

export type NavBarLink = {
  name: string;
  url: string;
  external?: boolean;
};

export type NavBarConfig = {
  links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
  twitterId?: string;
  avatar?: string;
  name: string;
  bio?: string;
  links: {
    name: string;
    url: string;
    icon: string;
  }[];
};

export type LicenseConfig = {
  enable: boolean;
  name: string;
  url: string;
};

export type LIGHT_DARK_MODE =
  | typeof LIGHT_MODE
  | typeof DARK_MODE
  | typeof AUTO_MODE;
