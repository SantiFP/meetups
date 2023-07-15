import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

interface Place {
  id: string;
  image: string;
  title: string;
  address: string;
}

const MeetupItem = (props: Place) => {

  const router = useRouter().push;

  const showDetails = () => {
    router(`/${props.id}`)
  };

  return (
    <li key={props.id} className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetails}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
