import { Body, Controller, Get, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { DatenService, STAND_BESCHREIBUNG } from '../daten/daten.service';
import { ErrorDto } from '../error.dto';
import { StandDto, StandWechselDto } from './stand.dto';

@ApiTags('System')
@ApiUnauthorizedResponse({
  type: ErrorDto,
  description: 'API-Key fehlt oder ist ungültig (AUTH_401)',
})
@Controller('system/stand')
export class SystemController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ApiOperation({ summary: 'Aktueller Datenstand' })
  @ZodResponse({ status: 200, type: StandDto, description: 'Der Datenstand' })
  get() {
    return this.antwort();
  }

  @Put()
  @ApiOperation({
    summary: 'Datenstand wechseln',
    description:
      'Wechselt sofort für alle Clients zwischen Stand 1 und Stand 2. ' +
      'Der Stand gilt bis zum nächsten Wechsel oder Neustart.',
  })
  @ZodResponse({
    status: 200,
    type: StandDto,
    description: 'Der neue Datenstand',
  })
  @ApiBadRequestResponse({
    type: ErrorDto,
    description: 'stand ist nicht 1 oder 2 (ANFRAGE_400)',
  })
  put(@Body() body: StandWechselDto) {
    this.daten.setStand(body.stand);
    return this.antwort();
  }

  private antwort() {
    const stand = this.daten.getStand();
    return { stand, beschreibung: STAND_BESCHREIBUNG[stand] };
  }
}
