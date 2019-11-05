import bunyan from 'bunyan';
import bformat from 'bunyan-format';

const formatOut = bformat({ outputMode: 'short', levelInString: true });
const logger = bunyan.createLogger({
  name: 'destance-lerning-service',
  stream: formatOut,
});

export default logger;
