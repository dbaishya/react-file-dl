import * as React from 'react';
import { mockData } from './FileDownloader/__mocks__/mock.data';
import FileDownloader, { FDFile } from './FileDownloader';
import './example.style.css';

export default function Example() {
  return (
    <div className="example">
      <h1>Example: React File Downloader</h1>
      <hr />
      <div className="example-inner">
        <FileDownloader files={mockData as FDFile[]} />
      </div>
    </div>
  );
}
