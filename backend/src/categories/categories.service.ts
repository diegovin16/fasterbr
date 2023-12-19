import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class CategoriesService {
  private repository: Prisma.CategoryDelegate
  constructor(private prisma: PrismaService) {
    this.repository = this.prisma.category
  }

  async create({ name }: CreateCategoryDto) {
    return this.repository.create({
      data: {
        name,
      },
    })
  }

  async findAll() {
    return this.repository.findMany({
      take: 100,
    })
  }

  async findOne(id: string) {
    const category = await this.repository.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return null
    }

    return category
  }
}
