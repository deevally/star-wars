import cluster from 'cluster';
import { cpus } from 'os';
import app  from "./app";
import log from "./utils/logger";

const numCPUs = cpus().length;


if(cluster.isPrimary){
    log.info(`Primary ${process.pid} is running`);
   
    //Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        log.info(`worker ${worker.process.pid} died`);
        cluster.fork();
    }
    )

}else{
  const port = process.env.PORT || 9000;
  // Listen to port
  app.listen(port, () => {
    log.info(`Server Started On Port ${port} In ${process.env.NODE_ENV} Mode.`);
  });

  log.info(`Worker ${process.pid} started`);

  process.on('SIGTERM', () => {
    app.close(() => {
      log.info('Process terminated')
    })
  });
}





