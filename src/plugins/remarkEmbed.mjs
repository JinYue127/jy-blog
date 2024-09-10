import { visit } from "unist-util-visit"; /*
/*
参考与https://www.howtocanvas.com/create-amazing-pages-in-canvas/responsive-youtube-iframes 和 https://github.com/lxchapu/astro-gyoza
<div style="width: 100%; min-width: 400px; max-width: 800px;">
  <div    style="position: relative; width: 100%; overflow: hidden; padding-top: 56.25%;"
  >
    <p>
      <iframe style="position: absolute; top: 0; left: 0; right: 0; width: 100%; height: 100%; border: none;"
        src="https://www.youtube.com/embed/-SXbjBKAPGI"
        width="560"
        height="315"
        allowfullscreen="allowfullscreen"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </p>
  </div>
</div>
* */

export function remarkEmbed() {
  return function (tree) {
    visit(tree, (node) => {
      if (node.type === "leafDirective") {
        if (!["youtube", "bilibili", "codepen"].includes(node.name)) return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        const id = attributes.id;

        if (!id) return;

        data.hName = "div";
        data.hChildren = [
          {
            type: "element",
            tagName: "div",
            properties: {
              style:
                "position: relative; width: 100%; overflow: hidden; padding-top: 56.25%;",
            },
            children: [
              {
                type: "element",
                tagName: "p",
                properties: {},
                children: [
                  {
                    type: "element",
                    tagName: "iframe",
                    properties: {
                      style:
                        "position: absolute; top: 0; left: 0; right: 0; width: 100%; height: 100%; border: none;",
                      class: "video",
                      title: `${node.name} Video Player`,
                      src: "",
                      frameBorder: 0,
                      allow: "",
                      allowFullScreen: true,
                      loading: "lazy",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ];

        switch (node.name) {
          case "youtube":
            data.hChildren[0].children[0].children[0].properties.src = `https://www.youtube.com/embed/${id}`;
            data.hChildren[0].children[0].children[0].properties.allow =
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            break;
          case "bilibili":
            data.hChildren[0].children[0].children[0].properties.src = `//player.bilibili.com/player.html?isOutside=true&bvid=${id}`;
            data.hChildren[0].children[0].children[0].properties.allow =
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            break;
          case "codepen":
            data.hChildren[0].children[0].children[0].properties.src = `https://codepen.io/${attributes.author}/embed/${id}`;
            break;
        }
      }
    });
  };
}
