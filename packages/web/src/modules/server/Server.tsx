import React from 'react';
import cn from 'classnames';
import Button, { ButtonSize, ButtonType, ButtonView } from '@ui/Button';

import {
  installServerAC,
  startServerAC,
  stopServerAC,
  acceptEULAServerAC,
} from '@modules/server/serverSlice';
import { removeServerAC } from '@modules/servers/serversSlice';
import Switch from '@ui/Switch';
import Label from '@ui/Label';
import { ServerStatus } from '@rana-mc/types';
import { useAppDispatch } from '../../app/hooks';
import styles from './Server.module.css';

type Props = {
  server: Server;
};

const Server = ({ server }: Props) => {
  const dispatch = useAppDispatch();

  const availableToEdit =
    server.status === ServerStatus.Created || server.status === ServerStatus.Stopped;

  const handleInstall = () => {
    dispatch(installServerAC(server));
  };

  const handleStart = () => {
    dispatch(startServerAC(server));
  };

  const handleStop = () => {
    dispatch(stopServerAC(server));
  };

  const handleRemove = () => {
    dispatch(removeServerAC(server));
  };

  const handleEULAChange = (eulaAccept: boolean) => {
    dispatch(acceptEULAServerAC({ server, accept: eulaAccept }));
  };

  return (
    <div key={server.id} className={cn(styles.server)}>
      <div className={cn(styles.values, { [styles.values]: !availableToEdit })}>
        <span className={cn(styles.value)}>
          id:
          {server.id}
        </span>
        <span className={cn(styles.value)}>
          name:
          {server.name}
        </span>
        <span className={cn(styles.value)}>
          gameVersion:
          {server.gameVersion}
        </span>
        <span className={cn(styles.value)}>
          gameVersionTypeId:
          {server.gameVersionTypeId}
        </span>
        <span className={cn(styles.value)}>
          core:
          {server.core.type}
        </span>
        <span className={cn(styles.value)}>
          core JSON:
          {JSON.stringify(server.core)}
        </span>
        <span className={cn(styles.value)}>
          status:
          {server.status || 'unknown'}
        </span>
      </div>
      <div className={cn(styles.buttons)}>
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Install"
          onClick={handleInstall}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Start"
          onClick={handleStart}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          text="Stop"
          onClick={handleStop}
        />
        <Button
          className={cn(styles.button)}
          size={ButtonSize.Small}
          type={ButtonType.Secondary}
          view={ButtonView.Danger}
          text="Remove"
          onClick={handleRemove}
        />
        <div>
          <Label text="EULA?" />
          <Switch value={server.eula} size="s" onChange={handleEULAChange} />
        </div>
      </div>
    </div>
  );
};

export default Server;
