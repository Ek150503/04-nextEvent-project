import React, { Fragment } from "react";
import { useRouter } from "next/router";

import {
  getEventById,
  getAllEvent,
  getFeatureEvents,
} from "../../helper/api-utils";

import EventSummary from "./../../components/event-detail/event-summary";
import EventLogisticts from "./../../components/event-detail/event-logistics";
import EventContent from "./../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventPage({ event }) {
  console.log(event);
  if (!event) {
    return (
      <div className='center'>
        <span className='loader'></span>
      </div>
    );
  }

  if (event.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event Found</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogisticts
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const event = await getEventById(id);

  if (!event) {
    return {
      props: {
        event: [],
      },
    };
  }

  return {
    props: {
      event: event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeatureEvents();

  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventPage;
