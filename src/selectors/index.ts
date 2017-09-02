// Imports to satisfy --declarations build requirements
// https://github.com/Microsoft/TypeScript/issues/9944

// tslint:disable-next-line:no-unused-variable
import {StateWithHistory} from 'redux-undo';
import {createSelector} from 'reselect';
import {InlineData} from 'vega-lite/build/src/data';
import {State} from '../models';
import {Bookmark} from '../models/bookmark';
import {VoyagerConfig} from '../models/config';
import {Log} from '../models/log';
import {ShelfPreview} from '../models/shelf-preview';
import {ShelfFilter, toPredicateFunction} from '../models/shelf/filter';
import {selectData} from './dataset';
import {selectFilters} from './shelf';
// tslint:disable-next-line:no-unused-variable

export * from './dataset';
export * from './result';
export * from './shelf';

export const selectBookmark = (state: State): Bookmark => state.persistent.bookmark;
export const selectConfig = (state: State): VoyagerConfig => state.persistent.config;
export const selectShelfPreview = (state: State): ShelfPreview => state.persistent.shelfPreview;
export const selectLog = (state: State): Log => state.persistent.log;

export const selectFilteredData = createSelector(
  selectData,
  selectFilters,
  (data: InlineData, filters: ShelfFilter[]): InlineData => {
    if (!data || filters.length === 0) {
      return data;
    }
    const filter = toPredicateFunction(filters);
    const values = data.values.filter(filter);
    return {values};
  }
);
