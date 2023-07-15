import MeetupDetail from "@/components/meetups/MeetupDetai";
import { GetStaticPropsContext } from "next";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export interface MeetupFromDb {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}
interface MeetUpFetched {
  meetup: MeetupFromDb;
}

// export interface MeetupToDb {
//   id: string;
//   title: string;
//   image: string;
//   address: string;
//   description: string;
// }

const MeetupDetailPage = (props: MeetUpFetched) => {

  console.log(props);
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg"
        />
      </Head>

      <MeetupDetail
        title={props.meetup.title}
        image={props.meetup.image}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://santifp1997:JghcXJ3tjUzMjAaG@my-database.vpv9w3h.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((el) => ({ params: { meetupId: el._id.toString() } })),
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.meetupId as string;
  const client = await MongoClient.connect(
    "mongodb+srv://santifp1997:JghcXJ3tjUzMjAaG@my-database.vpv9w3h.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(id),
  }) 

  client.close();

  console.log('props en getStaticProps',selectedMeetup);

  return {
    props: {
      meetup: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
    },
  };
};

export default MeetupDetailPage;
