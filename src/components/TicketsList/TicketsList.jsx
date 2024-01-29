import { nanoid } from '@reduxjs/toolkit';

import TicketCard from '../Ticket/Ticket';

import styles from './TicketsList.module.scss';
const TicketsList = ({ tickets }) => {
  return (
    <ul className={styles.list}>
      {tickets.map((ticket) => (
        <TicketCard key={nanoid()} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
