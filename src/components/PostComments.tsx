import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export default function PostComments() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);

    const handleThemeChange = () => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    // 监听文档加载完成事件
    const observer = new MutationObserver(() => {
      handleThemeChange();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 移除事件监听器
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // 立即执行一次以初始化主题
    handleInitialTheme();
  }, []);

  const handleInitialTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="size-full">
      {mounted && (
        <Giscus
          id="comments"
          repo={import.meta.env.PUBLIC_GISCUS_REPO || ""}
          repoId={import.meta.env.PUBLIC_GISCUS_REPO_ID || ""}
          category={import.meta.env.PUBLIC_GISCUS_CATEGORY || ""}
          categoryId={import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || ""}
          mapping="url"
          term="Welcome to my blog"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang={import.meta.env.PUBLIC_GISCUS_LANG || "zh-CN"}
          loading="lazy"
        />
      )}
    </div>
  );
}
