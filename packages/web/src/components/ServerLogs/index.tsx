import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';

import { ranaSocket } from '../../vendors/ranaSocketIo';
import styles from './ServerLogs.module.css';
import { parseLine, prepareLines } from './utils';

const UPDATE_LOGS_DELAY = 500;

const ServerLogs = () => {
  const fullServerLogs: string[] = [];
  const [logs, setLogs] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogAppend = useCallback(
    debounce(
      (logsToUpdate) => setLogs(prepareLines(logsToUpdate.slice(-100))),
      UPDATE_LOGS_DELAY
    ),
    []
  );

  ranaSocket.on('log', (message: string) => {
    fullServerLogs.push(message);
    handleLogAppend(fullServerLogs);
  });

  const renderLine = (line: string) => {
    return parseLine(line).groups.map((group) => {
      return group.name ? (
        <span className={cn(styles[group.name])}>{group.value}</span>
      ) : (
        <span className={cn(styles.line)}>{group.value}</span>
      );
    });
  };
  
  return (
    <div className={cn(styles.serverLogs)}>
      {logs.map((log) => (
        <span className={cn(styles.log)}>{renderLine(log)}</span>
      ))}
    </div>
  );
};

export default ServerLogs;
