import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/avatar.png" alt="avatar" width={300} height={300} />
      </div>
      <h1>Hi, hskfd</h1>
      <p>
        ljaldfladjf asldkfjas lajkfla flakdjf ladfkjkljghuishg kshfjkshfgkj fds
      </p>
    </section>
  );
}

export default Hero;
