import * as React from 'react';
import { useFD } from './FDProvider';
import { constants } from './constants';
import type { FDFileId, FDFileStatus } from './types';

const { useCallback } = React;
const {
  labels: {
    fdBody: { selectAria },
  },
} = constants;

const noop = () => {};

export const FDBody = () => {
  const {
    state: { allFiles, selectedFileIds },
    dispatch,
  } = useFD();

  const handleOnClick = useCallback(
    ({
      fileId,
      fileStatus,
    }: {
      fileId: FDFileId;
      fileStatus: FDFileStatus;
    }) => {
      /**
       * @note
       *  conditionally dispatch action if status is 'available'.
       *  this is handled in the FDProvider as well (for completeness),
       *  so we can skip this logic from the view, having it here prevents
       *  extra steps.
       */
      if (fileStatus === 'available') {
        dispatch({
          type: 'TOGGLE_SELECT_FILE',
          payload: {
            id: fileId,
          },
        });
      }
    },
    [dispatch]
  );

  if (!allFiles.length) {
    return null;
  }

  return (
    <ul className="fd-body">
      {allFiles.map((aFile, outerIndex) => {
        const { name, path, status } = aFile;
        const key = `${name}-${outerIndex}`;
        // @ts-ignore
        const aFileValues = ['', ...Object.entries(aFile)];
        // @note
        //  Array.prototype.includes is not supported by the IDE
        const isFileSelected = selectedFileIds.indexOf(path) !== -1;
        return (
          <li
            key={key}
            className={`fd-body-row fd-cursor ${
              isFileSelected ? 'fd-body-row-selected' : ''
            }`}
          >
            <ul
              onClick={(_) =>
                handleOnClick({ fileId: path, fileStatus: status })
              }
            >
              {aFileValues.map(([aKey, aValue], innerIndex) => {
                return (
                  <li
                    key={`${outerIndex}-${innerIndex}`}
                    className={`
                      fd-body-cell
                      ${innerIndex === 0 && 'fd-body-checkbox'}
                      ${innerIndex !== 0 && `fd-body-${aKey} fd-ellipse`}
                    `}
                  >
                    {innerIndex === 0 && (
                      <input
                        type="checkbox"
                        checked={isFileSelected}
                        onChange={noop}
                        aria-label={`${selectAria} ${name}`}
                        className=""
                      />
                    )}
                    {innerIndex !== 0 && (
                      <p className="fd-ellipse" data-value={aValue}>
                        {aValue}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
