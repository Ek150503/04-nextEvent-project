export async function getAllEvent() {
  const response = await fetch(
    "https://next-projects-ek150503-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeatureEvents() {
  const AllEvents = await getAllEvent();

  return AllEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const AllEvents = await getAllEvent();

  return AllEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const AllEvents = await getAllEvent();

  const { year, month } = dateFilter;

  let filteredEvents = AllEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
