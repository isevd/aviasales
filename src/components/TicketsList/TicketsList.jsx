import TicketCard from '../Ticket/Ticket';

import styles from './TicketsList.module.scss';

const TicketsList = ({ tickets }) => {
  return (
    <ul className={styles.list}>
      {tickets.map((ticket) => (
        <TicketCard
          key={`${ticket.carrier}${ticket.price}${ticket.segments[0].date}${ticket.segments[0].duration}${ticket.segments[1].date}${ticket.segments[1].duration}`}
          {...ticket}
        />
      ))}
    </ul>
  );
};

export default TicketsList;
