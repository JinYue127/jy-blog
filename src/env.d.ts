/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PUBLIC_GISCUS_REPO: `${string}/${string}`;
  readonly PUBLIC_GISCUS_REPO_ID: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID: string;
  readonly PUBLIC_GISCUS_LANG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
