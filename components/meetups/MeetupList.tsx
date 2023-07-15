import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { MeetupData } from './NewMeetupForm';

const MeetupList = (props:{meetups: MeetupData[]}) => {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup: MeetupData) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
