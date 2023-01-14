import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const homePage = (props) => {

  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="places to meet" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: meetups,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://santiFP:xVxem28YNxbGZhmz@usersdb-movy.imjdj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
};

export default homePage;
