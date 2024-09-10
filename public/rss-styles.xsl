<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title" /> RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style type="text/css">*{box-sizing:border-box}h1,h2{color:#fff}html{font-family:sans-serif}body{margin:0;background-color:#011b43}.container-md{max-width:768px;margin-right:auto;margin-left:auto}.pr-1{padding-right:4px !important}.px-3{padding-right:16px !important;padding-left:16px !important}.py-2{padding-top:8px !important;padding-bottom:8px !important}.py-3{padding-top:16px !important;padding-bottom:16px !important}.py-5{padding-top:32px !important;padding-bottom:32px !important}.mb-0{margin-bottom:0 !important}.mt-2{margin-top:8px !important}.mt-md-5{margin-top:32px !important}.border-0{border:0 !important}.markdown-body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:16px;line-height:1.5;word-wrap:break-word}.markdown-body>* :first-child{margin-top:0 !important}.markdown-body>* :last-child{margin-bottom:0 !important}.markdown-body a:not([href]){color:inherit;text-decoration:none}.markdown-body .absent{color:#cb2431}.markdown-body .anchor{float:left;padding-right:4px;margin-left:-20px;line-height:1}.markdown-body .anchor:focus{outline:0}.markdown-body p{margin-top:0;margin-bottom:16px}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25}.markdown-body h1 .octicon-link,.markdown-body h2 .octicon-link,.markdown-body h3 .octicon-link,.markdown-body h4 .octicon-link,.markdown-body h5 .octicon-link,.markdown-body h6 .octicon-link{color:#1b1f23;vertical-align:middle;visibility:hidden}.markdown-body h1:hover .anchor,.markdown-body h2:hover .anchor,.markdown-body h3:hover .anchor,.markdown-body h4:hover .anchor,.markdown-body h5:hover .anchor,.markdown-body h6:hover .anchor{text-decoration:none}.markdown-body h1:hover .anchor .octicon-link,.markdown-body h2:hover .anchor .octicon-link,.markdown-body h3:hover .anchor .octicon-link,.markdown-body h4:hover .anchor .octicon-link,.markdown-body h5:hover .anchor .octicon-link,.markdown-body h6:hover .anchor .octicon-link{visibility:visible}.markdown-body h1{padding-bottom:.3em;font-size:2em;border-bottom:1px solid #eaecef}.markdown-body h2{padding-bottom:.3em;font-size:1.5em;border-bottom:1px solid #eaecef}.markdown-body h3{font-size:1.25em}.markdown-body h4{font-size:1em}.markdown-body h5{font-size:.875em}.markdown-body h6{font-size:.85em;color:#6a737d}.bg-yellow-light{background-color:#fff5b1 !important;padding:10px}b,strong{font-weight:600}h1{font-size:2em;margin:.67em 0}small{font-size:80%}a{color:#64ffda;text-decoration:none}a:hover{text-decoration:underline}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:0}h1{font-size:32px;font-weight:600}h2{font-size:24px;font-weight:600}h3{font-size:20px;font-weight:600}h4{font-size:16px;font-weight:600}h5{font-size:14px;font-weight:600}h6{font-size:12px;font-weight:600}p{margin-top:0;margin-bottom:10px}small{font-size:90%}nav{display:block}svg:not(:root){overflow:hidden}.text-gray{color:#8892b0 !important}.description{color:#8892b0 !important}.blog-description{margin-bottom:5px}.text-white{color:#fff !important}.width-full{width:100% !important}.d-flex{display:flex !important}.flex-justify-center{justify-content:center !important}.flex-items-center{align-items:center !important}</style>
      </head>
      <body>
        <nav class="container-md px-3 py-2 mt-2 mt-md-5 markdown-body">
          <p class="bg-yellow-light">
            <strong>This is a web feed,</strong> also known as an RSS feed. <strong>Subscribe</strong>
            by copying the URL from the address bar into your newsreader. </p>
          <p class="text-gray"> Visit <a href="https://aboutfeeds.com">About Feeds</a> to get
            started with newsreaders and subscribing. It’s free. </p>
        </nav>
        <div class="container-md px-3 py-3 markdown-body">
          <header class="py-5">
            <h1 class="border-0">
              <!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1"
                id="RSSicon" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                    <stop offset="0.0" stop-color="#E3702D" />
                    <stop offset="0.1071" stop-color="#EA7D31" />
                    <stop offset="0.3503" stop-color="#F69537" />
                    <stop offset="0.5" stop-color="#FB9E3A" />
                    <stop offset="0.7016" stop-color="#EA7C31" />
                    <stop offset="0.8866" stop-color="#DE642B" />
                    <stop offset="1.0" stop-color="#D95B29" />
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15" />
                <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52" />
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)" />
                <circle cx="68" cy="189" r="24" fill="#FFF" />
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF" />
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF" />
              </svg>
              Aritra's RSS Feed </h1>
            <h2>
              <xsl:value-of select="/rss/channel/title" />
            </h2>
            <p class="description">
              <xsl:value-of select="/rss/channel/description" />
            </p>
            <a class="head_link" target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute> Visit
              Website &#x2192; </a>
          </header>
          <h2>My Blogs So Far...</h2>
          <xsl:for-each select="/rss/channel/item">
            <xsl:variable name="allContent" select="*[name()='content:encoded']" />
            <div class="py-5">
              <h3 class="mb-0">
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h3>
              <h5 class="text-white">
                <xsl:value-of
                  select="substring-before(substring-after($allContent, '&lt;p&gt;Subtitle: '), '&lt;&#47;p&gt;')" />
              </h5>
              <p class="text-gray blog-description">
                <xsl:value-of select="description" />
              </p>
              <small class="text-gray">
                <xsl:variable name="pubDate" select="substring(pubDate, 6, 11)" /> 📅 <xsl:value-of
                  select="concat(substring($pubDate, 1, 2), ' ', substring($pubDate, 4, 3), ', ', substring(pubDate, 12, 5), ' (', substring(pubDate, 1, 3), ')')" />
                • ⏱️ <xsl:value-of
                  select="substring-before(substring-after($allContent, '&lt;p&gt;Duration: '), '&lt;&#47;p&gt;')" />
              </small>
            </div>
            <div class="width-full d-flex flex-justify-center flex-items-center">
              <smalll class="text-white">⁕ ⁕ ⁕</smalll>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
