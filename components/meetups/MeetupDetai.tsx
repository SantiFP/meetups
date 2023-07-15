import { MeetupData } from "./NewMeetupForm";
import classes from './MeetupDetail.module.css'


const MeetupDetail = (props:MeetupData) => {
  return (
    <section className={`${classes.detail} space-y-5`}>
      <img src={props.image} alt={props.title} />
      <h1 className="text-2xl">{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};
export default MeetupDetail;
