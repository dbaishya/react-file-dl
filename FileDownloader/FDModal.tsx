import * as React from 'react';
import { useFD } from './FDProvider';
import { constants } from './constants';

const { useCallback } = React;

const {
  labels: {
    fdModal: { close },
  },
} = constants;

export const FDModal = () => {
  const {
    state: { allFiles, selectedFileIds, isDownloadSelected },
    dispatch,
  } = useFD();

  const handleOnClick = useCallback(() => {
    dispatch({
      type: 'CLOSE_DOWNLOAD_BOX',
    });
  }, [dispatch]);

  if (!isDownloadSelected || !allFiles.length) {
    return null;
  }

  return (
    <div className="fd-modal">
      <div className="fd-modal-header">
        <button
          onClick={() => handleOnClick()}
          className="fd-modal-closebtn fd-cursor"
        >
          {close}
        </button>
      </div>
      <div className="fd-modal-body">
        <ul>
          {allFiles
            .filter((aFile) => selectedFileIds.indexOf(aFile.path) !== -1)
            .map((aFile, index) => {
              const { name, path } = aFile;
              const key = `${name}-${index}`;
              return (
                <li key={key} className="fd-file">
                  <p>{name}</p>
                  <span>{path}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
