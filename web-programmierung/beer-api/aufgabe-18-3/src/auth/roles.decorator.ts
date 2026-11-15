import { Reflector } from '@nestjs/core';

// @Roles(['admin']): Rollen, von denen der User eine braucht
export const Roles = Reflector.createDecorator<string[]>();
