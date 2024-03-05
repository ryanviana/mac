import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterService } from './counter.service';
import { Counter, CounterSchema } from './counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
  ],
  providers: [CounterService],
  exports: [CounterService], // Make CounterService available outside of this module
})
export class CounterModule {}
