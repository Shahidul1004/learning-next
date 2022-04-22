import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import Image from "next/image";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

function PostContent({ post }) {
  const imagePath = `/images/${post.slug}/${post.image}`;

  const customRenderers = {
    img(imageData) {
      return (
        <Image
          src={`/images/${post.slug}/${imageData.src}`}
          alt={imageData.alt}
          width={600}
          height={300}
        />
      );
    },
    code(codeData) {
      const { node, inline, className, children, ...props } = codeData;
      const match = /language-(\w+)/.exec(className || "");
      return (
        <SyntaxHighlighter style={atomDark} language={match[1]}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
