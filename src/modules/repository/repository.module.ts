import { Global, Module } from '@nestjs/common';

import { EventRepository } from './services/event.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, EventRepository],
  exports: [UserRepository, EventRepository],
})
export class RepositoryModule {}
