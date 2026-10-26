import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { AuthGuard, type AuthRequest } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ErrorDto } from '../error.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UserWithRolesDto } from './dto/user-with-roles.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Jeder angemeldete User sieht sich selbst; Rollen aus der Datenbank
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ZodResponse({ status: 200, type: UserWithRolesDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  findMe(@Req() request: AuthRequest) {
    return this.usersService.findWithRoles(request.user.sub);
  }

  // R7: Weitere Rollen vergibt nur ein admin
  @Post(':id/roles')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ZodResponse({ status: 201, type: UserWithRolesDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  assignRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignRoleDto,
  ) {
    return this.usersService.assignRole(id, dto.role);
  }
}
