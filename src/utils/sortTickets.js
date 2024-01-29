export const sortTickets = (ticketsToSort, costFilter) => {
  if (costFilter === 'cheapest') {
    return ticketsToSort.sort((a, b) => a.price - b.price);
  }
  if (costFilter === 'fastest') {
    return ticketsToSort.sort(
      (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    );
  }
  if (costFilter === 'optimal') {
    return [];
  }
};
