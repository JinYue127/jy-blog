import { visit } from "unist-util-visit";

/**
 * 创建一个remark插件，用于在markdown文本中，对长度超过3个词的句子末尾添加非换行空格
 * 这个插件主要解决markdown转换为HTML时，过长的句子末尾可能会因为自动换行而导致的视觉问题
 * 通过在句子末尾添加非换行空格，可以保持句子在视觉上的完整性，避免自动换行带来的割裂感
 *
 * @returns {Function} 返回一个转换器函数，该函数接受一个语法树作为参数，并对其进行遍历处理
 */
export function remarkDeruntify() {
  /**
   * 转换器函数，遍历语法树，对每个文本节点进行处理
   * 如果文本节点中的单词数量大于等于4，则在末尾添加非换行空格
   * 这样做是为了在HTML输出中避免长句子末尾被自动换行
   *
   * @param {Node} tree - 语法树对象，包含了一系列的节点和文本
   */
  function transformer(tree) {
    // 使用unist-util-visit插件遍历语法树中的每个节点
    visit(tree, "text", function (node) {
      // 计算当前文本节点中的单词数量
      let wordCount = node.value.split(" ").length;

      // 如果单词数量大于等于4，则在文本末尾添加非换行空格
      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  }

  // 返回转换器函数供remark框架使用
  return transformer;
}
