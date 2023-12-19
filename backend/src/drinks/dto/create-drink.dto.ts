import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateDrinkDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  image?: string

  @IsUUID()
  category: string
}
