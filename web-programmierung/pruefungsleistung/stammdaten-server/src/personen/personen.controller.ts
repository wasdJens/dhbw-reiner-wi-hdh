import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Person,
  PersonDto,
  PersonListeDto,
  PersonQueryDto,
} from './person.dto';

@ApiTags('Personen')
@Controller('v1/personen')
export class PersonenController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Personen',
    'Mitarbeiterinnen und Mitarbeiter, sortiert nach personal_nr. Filter sind kombinierbar.',
    PersonListeDto,
  )
  findAll(@Query() query: PersonQueryDto) {
    const { seite, pro_seite, geaendert_seit, ...felder } = query;
    return this.daten.liste<Person>(
      'personen',
      { felder, geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':personal_nr')
  @EinzelEndpunkt(
    'Eine Person',
    { name: 'personal_nr', description: 'Personalnummer', example: 'P-00017' },
    PersonDto,
    'PERSON',
    true,
  )
  findOne(@Param('personal_nr') nummer: string) {
    return this.daten.eins<Person>('personen', nummer);
  }
}
