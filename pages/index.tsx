import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { MeetupFromDb } from "./[meetupId]";

interface Props {
  meetups: MeetupFromDb[];
}

const Home = (props: Props) => {
  return <>
  <Head>
    <title>React meetups</title>
    <meta name="description" content="Hang out"/>
    <link rel="icon" href="https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*" />

  </Head>
  <MeetupList meetups={props.meetups} />
  </>
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://santifp1997:JghcXJ3tjUzMjAaG@my-database.vpv9w3h.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((el) => ({
        title: el.title,
        address: el.address,
        image: el.image,
        id: el._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default Home;
