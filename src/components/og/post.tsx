import type { CollectionEntry } from "astro:content";
import { profileConfig } from "@config";

export default (post: CollectionEntry<"posts">) => {
  return (
    <div
      style={{
        background: `linear-gradient(to top left, rgb(178, 153, 253), rgb(111, 203, 253))`,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          background: "#fefbfb",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          margin: "12px",
          height: "88%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            lang="zh-CN"
            style={{
              fontSize: 72,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "hidden",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "8px",
              fontSize: 48,
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                {profileConfig.avatar && (
                  <img
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                    src={profileConfig.avatar}
                    alt="avatar"
                  />
                )}
                {profileConfig.name}
              </span>
            </span>

            <span style={{ overflow: "hidden", fontWeight: "bold" }}>
              Hello World!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
