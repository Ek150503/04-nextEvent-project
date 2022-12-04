import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "./../../components/event-detail/event-summary";
import EventLogisticts from "./../../components/event-detail/event-logistics";
import EventContent from "./../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventPage() {
  const router = useRouter();
  const { id } = router.query;

  const event = getEventById(id);

  if (!event) {
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

export default EventPage;
