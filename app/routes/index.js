//---------//
// Imports //
//---------//

import Ember from 'ember';
import fp from 'npm:lodash/fp';
import ultimatePagination from 'npm:ultimate-pagination';

import { flattenObj, uMapKeys } from 'twearch/library/utils';


//------//
// Init //
//------//

const apiToModelKeys = getApiToModelKeys()
  , clientID = '7c61gt0s7la2awilwzc7wqn1d9zonc'
  , getPaginationModel = obj => ultimatePagination.getPaginationModel(obj)
  , headers = {
    Accept: 'application/vnd.twitchtv.v5+json'
    , "Client-ID": clientID
  }
  , paginationModelDefaults = {
    hideFirstAndLastPageLinks: true
    ,  hidePreviousAndNextPageLinks: true
  }
  , refreshModel = true
  , queryParams = {
    query: { refreshModel }
    , page: { refreshModel }
  }
  , url = 'https://api.twitch.tv/kraken/search/streams'
  ;


//------//
// Main //
//------//

export default Ember.Route.extend({
  model: fp.identity

  , setupController(controller, { page, query }) {
    if (!query) {
      this._super(controller, {});
      return;
    }

    controller.set('isSearching', true);

    this.controller.set('isSearching', true);
    return makeApiRequest({ page, query })
      .then(model => {
        this.controller.set('isSearching', false);
        controller.set('model', model);
      })
      ;
  }

  , queryParams
});




//-------------//
// Helper Fxns //
//-------------//

function makeApiRequest({ page, query }) {
  const limit = 10
    , offset = (page - 1) * limit
    , data = {
      offset
      , query
      , limit
    }
    ;

  return Ember.$.ajax(url, { headers, data })
    .then(({ _total, streams }) => ({
      pagination: transformPagination(limit, page, _total)
      , streams: transformStreams(streams)
    }))
    .catch(err => {
      console.error(err);
    })
    ;
}

function transformStreams(channels) {
  return fp.map(fp.flow(
    fp.pick([
      'game', 'viewers', 'preview.medium', 'channel.display_name'
      , 'channel.status', 'channel.url'
    ])
    , flattenObj
    , uMapKeys((_val, key) => fp.getOr(key, key, apiToModelKeys))
  ))(channels);
}

function getApiToModelKeys() {
  return {
    display_name: 'title'
    , medium: 'snapshot'
    , status: 'comment'
  };
}

function transformPagination(limit, page, _total) {
  return fp.flow(
    fp.merge(paginationModelDefaults)
    , getPaginationModel
    , fp.map(handleEllipsis)
    , fp.map(fp.pick(['isActive', 'isEllipsis', 'value']))
  )({
    currentPage: fp.toInteger(page)
    , totalPages: Math.ceil(_total / limit)
  });
}

function handleEllipsis(page) {
  const isEllipsis = page.type === 'ELLIPSIS';

  return fp.merge(page, {
    isEllipsis
    , value: (isEllipsis)
      ? '...'
      : page.value
  });
}
