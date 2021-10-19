import { parseRoutes } from 'src/utils/directoryParse';

const business = parseRoutes(require.context('./business', false, /\.ts$/));
const basics = parseRoutes(require.context('./basics', false, /\.ts$/));

export default [...business, ...basics];
