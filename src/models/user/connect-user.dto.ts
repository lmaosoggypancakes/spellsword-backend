import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ConnectUserSchema = z.object({
  username: z.string().min(6).max(20),
});

export class ConnectUserDto extends createZodDto(ConnectUserSchema) {}
