import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  username: z.string().min(6).max(20)!,
  email: z.string().email(),
  password: z
    .password()
    .min(8)
    .max(100)
    .atLeastOne('digit')
    .atLeastOne('special')
    .atLeastOne('uppercase')
    .atLeastOne('lowercase'),
  picture: z.string().url(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema.required()) {}
