import classes from "./contact-form.module.css";
import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function ContactForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  const notificationContext = useContext(NotificationContext);

  const sendMessageHandler = (event) => {
    event.preventDefault();

    notificationContext.showNotification({
      title: "Sending message",
      message: "Your message is on its way",
      status: "pending",
    });

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        name: nameRef.current.value,
        message: messageRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.message || "something went wrong!");
        });
      })
      .then((data) => {
        notificationContext.showNotification({
          title: "Success!",
          message: "Message sent!",
          status: "success",
        });
      })
      .catch((err) => {
        notificationContext.showNotification({
          title: "Error!",
          message: err.message || "something went wrong",
          status: "error",
        });
      });
  };
  return (
    <section className={classes.contact}>
      <h1> How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="message" rows={5} />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
