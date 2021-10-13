import { parseRoutes } from 'src/utils/directoryParse';

const business = parseRoutes(require.context('./business', false, /\.ts$/));
const system = parseRoutes(require.context('./system', false, /\.ts$/));

export default [...business, ...system];
