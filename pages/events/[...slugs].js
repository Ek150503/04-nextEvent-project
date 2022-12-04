import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function EventsFilterPage() {
  const router = useRouter();
  const filterData = router.query.slugs;

  //   console.log(filterData);

  if (!filterData) {
    return <p className='center'>Loading</p>;
  }

  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. please adjustn your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Event</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvent = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvent || filteredEvent.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Event</Button>
        </div>
      </Fragment>
    );
  }

  //   console.log(filteredEvent);

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </Fragment>
  );
}

export default EventsFilterPage;
