import TicketCard from '../Ticket/Ticket';

import styles from './TicketsList.module.scss';
const TicketsList = ({ tickets }) => {
  return (
    <ul className={styles.list}>
      {tickets.map((ticket, index) => (
        <TicketCard key={index} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
