import styles from './Ticket.module.scss';

const formatFlightTime = (date, duration) => {
  const flightStart = new Date(date);
  const flightEnd = new Date(flightStart.getTime() + duration * 60 * 1000);
  return `${String(flightStart.getHours()).padStart(2, '0')}:${String(flightStart.getMinutes()).padStart(
    2,
    '0'
  )} - ${String(flightEnd.getHours()).padStart(2, '0')}:${String(flightEnd.getMinutes()).padStart(2, '0')}`;
};

const formatDuration = (duration) => {
  return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
};

const formatTransfers = (transfers) => {
  switch (transfers) {
    case 1:
      return 'ПЕРЕСАДКА';
    case 2:
    case 3:
      return 'ПЕРЕСАДКИ';
  }
};

const TicketCard = (ticket) => {
  return (
    <li className={styles.ticket}>
      <div className={styles.header}>
        <span className={styles.price}>{ticket.price} Р</span>
        <div className={styles.logo}>
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} />
        </div>
      </div>
      {ticket.segments.map((segment, index) => {
        return (
          <div className={styles.main} key={index}>
            <ul className={styles.container}>
              <li className={styles.item}>
                <span className={styles.title}>
                  {segment.origin} - {segment.destination}
                </span>
                <span className={styles.description}>{formatFlightTime(segment.date, segment.duration)}</span>
              </li>
              <li className={styles.item}>
                <span className={styles.title}>В пути</span>
                <span className={styles.description}>{formatDuration(segment.duration)}</span>
              </li>
              <li className={styles.item}>
                <span className={styles.title}>
                  {!!segment.stops.length && segment.stops.length} {formatTransfers(segment.stops.length)}
                </span>
                <span className={styles.description}>{segment.stops.join(', ')}</span>
              </li>
            </ul>
          </div>
        );
      })}
    </li>
  );
};

export default TicketCard;
