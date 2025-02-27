/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 */

'use strict';

export type Timestamp = number;
export type PerformanceEntryType = 'event';

export class PerformanceEntry {
  name: string;
  entryType: PerformanceEntryType;
  startTime: Timestamp;
  duration: number;

  // For "event" entries only:
  processingStart: ?Timestamp;
  processingEnd: ?Timestamp;
  interactionId: ?number;

  // $FlowIgnore: Flow(unclear-type)
  toJSON(): Object {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
    };
  }
}

export type PerformanceEntryList = $ReadOnlyArray<PerformanceEntry>;

export class PerformanceObserverEntryList {
  _entries: PerformanceEntryList;

  constructor(entries: PerformanceEntryList) {
    this._entries = entries;
  }

  getEntries(): PerformanceEntryList {
    return this._entries;
  }

  getEntriesByType(type: PerformanceEntryType): PerformanceEntryList {
    return this._entries.filter(entry => entry.entryType === type);
  }

  getEntriesByName(
    name: string,
    type?: PerformanceEntryType,
  ): PerformanceEntryList {
    if (type === undefined) {
      return this._entries.filter(entry => entry.name === name);
    } else {
      return this._entries.filter(
        entry => entry.name === name && entry.entryType === type,
      );
    }
  }
}

export type PerformanceObserverCallback = (
  list: PerformanceObserverEntryList,
  observer: PerformanceObserver,
) => void;

export type PerformanceObserverInit =
  | {
      entryTypes: PerformanceEntryType[],
      buffered?: boolean,
    }
  | {
      type: PerformanceEntryType,
      buffered?: boolean,
    };

/**
 * Implementation of the PerformanceObserver interface for RN,
 * corresponding to the standard in https://www.w3.org/TR/performance-timeline/
 *
 * @example
 * const observer = new PerformanceObserver((list, _observer) => {
 *   const entries = list.getEntries();
 *   entries.forEach(entry => {
 *     reportEvent({
 *       eventName: entry.name,
 *       startTime: entry.startTime,
 *       endTime: entry.startTime + entry.duration,
 *       processingStart: entry.processingStart,
 *       processingEnd: entry.processingEnd,
 *       interactionId: entry.interactionId,
 *     });
 *   });
 * });
 * observer.observe({ type: "event" });
 */
export default class PerformanceObserver {
  _callback: PerformanceObserverCallback;

  constructor(callback: PerformanceObserverCallback) {
    this._callback = callback;
  }

  observe(options: PerformanceObserverInit) {
    console.log('PerformanceObserver: started observing');
  }

  disconnect(): void {
    console.log('PerformanceObserver: stopped observing');
  }

  takeRecords(): PerformanceEntryList {
    return [];
  }

  static supportedEntryTypes: PerformanceEntryType[] = ['event'];
}
