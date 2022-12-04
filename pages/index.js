import { getFeatureEvents } from "./../helper/api-utils";

import React from "react";
import EventList from "../components/events/event-list";

function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvent = await getFeatureEvents();

  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800,
  };
}

export default HomePage;
