import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DrinksModule } from './drinks/drinks.module'
import { CategoriesModule } from './categories/categories.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [DrinksModule, CategoriesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
