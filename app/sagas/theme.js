import Ember from 'ember';
import fetch from 'fetch';
import { call, put, takeLatest } from 'redux-saga/effects';

function* loginAsync(action) {
  const activeTheme = action.payload.themeName;
  const username = action.payload.username;
  const fetched = yield call(fetch, `/api/login`, {method: 'POST', body: JSON.stringify({username: username})});
  const response = yield call(f => f.json(), fetched);
  yield put({type: 'LOGIN_USER', response: response});

  let id = response.themeId;
  let name = response.themeName;
  let shortName = name.replace('theme-', '');
  if (activeTheme !== shortName) {
    // flipTheActiveTheme
    yield put({type: 'ACTIVATE_NEW_THEME', id: id, name: name, shortName: shortName});

    //fetchTheNewTheme
    let themeUrl = `/themes/${shortName}.css`;
    let themeLink = document.createElement('link');
    themeLink.href = themeUrl;
    themeLink.rel = 'stylesheet';
    themeLink.type = 'text/css';
    document.body.appendChild(themeLink);

    //persistLocally
    Ember.$.cookie('themeName', `theme-${shortName}`);
  }
}

export function* login() {
  yield takeLatest('LOGIN_ASYNC', loginAsync);
}
