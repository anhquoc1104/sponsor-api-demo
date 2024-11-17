import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENT_VARIABLE } from '@app/common';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(configService: ConfigService): Promise<void> {
    const pubClient = createClient({
      url: `redis://${configService.get(ENVIROMENT_VARIABLE.REDIS_HOST)}:${configService.get(ENVIROMENT_VARIABLE.REDIS_PORT)}`,
      password:
        configService.get(ENVIROMENT_VARIABLE.REDIS_PASSWORD) ?? undefined,
    });
    const subClient = pubClient.duplicate();

    // await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient, {
      requestsTimeout: 10000,
    });
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
