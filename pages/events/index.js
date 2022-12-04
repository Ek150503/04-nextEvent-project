import React, { Fragment } from "react";
import EventList from "../../components/events/event-list";

import { getAllEvent } from "../../helper/api-utils";

import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";

function EventsPage({ events }) {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const events = await getAllEvent();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default EventsPage;
