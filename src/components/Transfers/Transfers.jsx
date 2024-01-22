import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import { setTransferFilter, setTargetFilter } from '../../store/filtersSlice';

import styles from './Transfers.module.scss';

const Transfers = () => {
  const transferFilters = useSelector((state) => state.filters.transferFilter);
  const dispatch = useDispatch();

  const setAllFilters = () => dispatch(setTransferFilter(!transferFilters.all));
  const setCustomFilter = (payload) => dispatch(setTargetFilter(payload));

  useEffect(() => {
    let count = 0;
    for (let filter in transferFilters) {
      if (filter !== 'all' && !transferFilters[filter]) {
        setCustomFilter({ all: false });
      }
      if (filter !== 'all' && transferFilters[filter]) {
        count++;
        if (count === Object.entries(transferFilters).length - 1) {
          setCustomFilter({ all: true });
        }
      }
    }
  }, [transferFilters]);

  return (
    <div className={styles.settings}>
      <span className={styles.settings_heading}>Количество пересадок</span>
      <form className={styles.settings_form}>
        <Checkbox isChecked={transferFilters.all} label="Все" onChange={setAllFilters} />
        <Checkbox
          isChecked={transferFilters.withoutTransfer}
          onChange={() => setCustomFilter({ withoutTransfer: !transferFilters.withoutTransfer })}
          label="Без пересадок"
        />
        <Checkbox
          isChecked={transferFilters.oneTransfer}
          onChange={() => setCustomFilter({ oneTransfer: !transferFilters.oneTransfer })}
          label="1 пересадка"
        />
        <Checkbox
          isChecked={transferFilters.twoTransfer}
          onChange={() => setCustomFilter({ twoTransfer: !transferFilters.twoTransfer })}
          label="2 пересадки"
        />
        <Checkbox
          isChecked={transferFilters.threeTransfer}
          onChange={() => setCustomFilter({ threeTransfer: !transferFilters.threeTransfer })}
          label="3 пересадки"
        />
      </form>
    </div>
  );
};

export default Transfers;
