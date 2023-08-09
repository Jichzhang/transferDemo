import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

export interface TransferItem {
  label: string;
  value: string | number;
  other?: any;
}

export interface TransferProps {
  options: TransferItem[];
  value?: (string | number)[];
  onChange?: (values: TransferProps['value'], options: TransferItem[]) => void;
}

const Transfer: React.FC<TransferProps> = (props) => {

  const {
    options,
    value,
    onChange,
  } = props;

  const [lSelected, setLSelected] = useState<TransferItem[]>([]);
  const [rSelected, setRSelected] = useState<TransferItem[]>([]);
  const [lOptions, setLOptions] = useState<TransferItem[]>([]);
  const [rOptions, setROptions] = useState<TransferItem[]>([]);

  useEffect(() => {
    if (value?.length) {
      setLOptions(options.filter(o => !value.find(v => v === o.value)));
      setROptions(options.filter(o => value.find(v => v === o.value)));
    } else {
      setLOptions(options);
      setROptions([]);
    }
  }, [options, value]);

  const handleOnLeftItemClick = (option: TransferItem) => {
    const index = lSelected.findIndex(ls => ls.value === option.value);

    if (index !== -1)  lSelected.splice(index, 1);  
    else lSelected.push(option);

    setLSelected([...lSelected]);
  };

  const handleOnRightItemClick = (option: TransferItem) => {
    const index = rSelected.findIndex(rs => rs.value === option.value);

    if (index !== -1) rSelected.splice(index, 1);
    else rSelected.push(option);

    setRSelected([...rSelected]);
  };

  const handleOnClickToRight = () => {
    onChange?.([...(value || []), ...lSelected.map(ls => ls.value)], lSelected);
    setLSelected([]);
  };

  const handleOnClickToLift = () => {
    onChange?.(value?.filter(v => rSelected.findIndex(rs => rs.value === v) === -1), rSelected);
    setRSelected([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {lOptions.map(lo => {
          const selected = lSelected.findIndex(ls => ls.value === lo.value) !== -1;
          
          return (
            <div 
              key={lo.value}
              className={[styles.item, selected ? styles.itemSelected : ''].join(' ')}
              onClick={() => handleOnLeftItemClick(lo)}
            >
              {lo.label}
            </div>
          );
        })}
      </div>
      <div className={styles.center}>
        <div onClick={handleOnClickToRight}>&gt;</div>
        <div onClick={handleOnClickToLift}>&lt;</div>
      </div>
      <div className={styles.right}>
        {rOptions.map(ro => {
          const selected = rSelected.findIndex(rs => rs.value === ro.value) !== -1;

          return (
            <div
              key={ro.value}
              className={[styles.item, selected ? styles.itemSelected : ''].join(' ')}
              onClick={() => handleOnRightItemClick(ro)}
            >
              {ro.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transfer;