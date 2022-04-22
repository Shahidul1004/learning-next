import Image from "next/image";
import classes from "./post-header.module.css";

function PostHeader(props) {
  return (
    <header className={classes.header}>
      <h1>{props.title}</h1>
      <Image src={props.image} alt="title" width={200} height={150} />
    </header>
  );
}

export default PostHeader;
