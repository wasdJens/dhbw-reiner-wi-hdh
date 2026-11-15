import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiGoneResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { type ZodDto, ZodResponse } from 'nestjs-zod';
import { z } from 'zod';
import { ErrorDto } from './error.dto';

const ohneKey = ApiUnauthorizedResponse({
  type: ErrorDto,
  description: 'API-Key fehlt oder ist ungültig (AUTH_401)',
});

// Dokumentation eines Endpunkts GET /v1/<ressource>
export function ListenEndpunkt(
  summary: string,
  description: string,
  type: ZodDto<z.ZodType, false>,
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ZodResponse({ status: 200, type, description: 'Eine Seite der Liste' }),
    ApiBadRequestResponse({
      type: ErrorDto,
      description: 'Ein Query-Parameter ist ungültig (ANFRAGE_400)',
    }),
    ohneKey,
  );
}

// Dokumentation eines Endpunkts GET /v1/<ressource>/{nummer}
export function EinzelEndpunkt(
  summary: string,
  param: { name: string; description: string; example: string },
  type: ZodDto<z.ZodType, false>,
  code: string,
  geloescht = false,
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiParam(param),
    ZodResponse({ status: 200, type, description: summary }),
    ohneKey,
    ApiNotFoundResponse({
      type: ErrorDto,
      description: `Nummer unbekannt (${code}_404)`,
    }),
    ...(geloescht
      ? [
          ApiGoneResponse({
            type: ErrorDto,
            description: `Im aktuellen Datenstand gelöscht (${code}_410)`,
          }),
        ]
      : []),
  );
}
