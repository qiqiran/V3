import { parseRoutes } from 'src/utils/directoryParse';

const basics = parseRoutes(require.context('./basics', false, /\.ts$/));

export default [...basics];
