import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics/index';
import dependencies from '../epics/dependencies';

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

export default [epicMiddleware];
