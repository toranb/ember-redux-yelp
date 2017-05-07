import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics/index';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default [epicMiddleware];
