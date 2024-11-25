import { siteConfig } from "../config"; // 导入站点配置
import { execSync } from "child_process"; // 导入用于同步执行命令的模块
import { statSync } from "fs"; // 导入用于同步获取文件状态的模块

/**
 * 插件功能：添加文件最后修改时间
 * 根据配置，使用git log或文件系统信息来获取文件的最后修改时间，并将其添加到frontmatter中
 * @returns {function} 处理文件的回调函数
 */
export function remarkModifiedTime() {
  return function (_tree, file) {
    // 获取文件的原始路径
    const filepath = file.history[0];
    // 如果站点配置的更新时间类型为"git"
    if (siteConfig.updateTime.type === "git") {
      // 使用git命令获取文件的最后提交时间
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
      // 将结果转换为字符串并保存到frontmatter的lastModified字段
      file.data.astro.frontmatter.lastModified = result.toString();
    } else {
      // 使用文件系统获取文件的最后修改时间
      const result = statSync(filepath);
      // 将结果转换为ISO格式并保存到frontmatter的lastModified字段
      file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
    }
  };
}
