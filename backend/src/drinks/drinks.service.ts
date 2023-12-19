import { Injectable } from '@nestjs/common'
import { CreateDrinkDto } from './dto/create-drink.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { delay } from 'src/utils/delay'
interface FindAllProps {
  search?: string
  category?: string
}
@Injectable()
export class DrinksService {
  private repository: Prisma.DrinkDelegate
  constructor(private prisma: PrismaService) {
    this.repository = this.prisma.drink
  }
  async create({ category, name, description, image }: CreateDrinkDto) {
    return this.repository.create({
      data: {
        name,
        categoryId: category,
        description,
        image,
      },
    })
  }
  async findAll({ search, category }: FindAllProps) {
    const filter = []
    if (search?.trim()) {
      filter.push({
        name: {
          contains: search.trim(),
        },
      })
    }
    if (category) {
      filter.push({
        categoryId: category,
      })
    }
    return this.repository.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        id: true,
        name: true,
      },
      ...(filter?.length > 0
        ? {
            where: {
              AND: filter,
            },
          }
        : {}),
    })
  }

  async findOne(id: string) {
    const drink = await this.repository.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    })

    if (!drink) {
      return null
    }

    return drink
  }
}
