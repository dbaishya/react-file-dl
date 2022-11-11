import * as React from 'react';
import { FDBody } from './FDBody';
import { FDControl } from './FDControl';
import { FDHeader } from './FDHeader';
import { FDModal } from './FDModal';
import { FDProvider } from './FDProvider';
import type { FDFile } from './types';
/**
 * @note
 *  CSS-in-JS library would be an alt recommendation
 *  for styling, esp. when other components needs to
 *  be build as a part of a design system.
 */
import './styles.css';

export type FileDownloaderProps = {
  files: FDFile[];
};

export const FileDownloader = ({ files }: FileDownloaderProps) => {
  return (
    <FDProvider files={files}>
      <div className="fd">
        <div className="fd-inner">
          <FDControl />
          <FDHeader />
          <FDBody />
        </div>
        <FDModal />
      </div>
    </FDProvider>
  );
};
