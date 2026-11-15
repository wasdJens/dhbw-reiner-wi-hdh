import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ZodResponse({ status: 200, type: [OrderDto] })
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @ZodResponse({ status: 201, type: OrderDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiConflictResponse({ type: ErrorDto })
  @ApiBadGatewayResponse({ type: ErrorDto })
  @ApiServiceUnavailableResponse({ type: ErrorDto })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
