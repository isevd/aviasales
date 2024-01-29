export const filterTickets = (tickets, transferFilter) => {
  const filteredTickets = tickets.filter((ticket) => {
    for (let segment of ticket.segments) {
      if (segment.stops.length === 0 && transferFilter.withoutTransfer) {
        return ticket;
      }
      if (segment.stops.length === 1 && transferFilter.oneTransfer) {
        return ticket;
      }
      if (segment.stops.length === 2 && transferFilter.twoTransfer) {
        return ticket;
      }
      if (segment.stops.length === 3 && transferFilter.threeTransfer) {
        return ticket;
      }
    }
  });

  return filteredTickets;
};
