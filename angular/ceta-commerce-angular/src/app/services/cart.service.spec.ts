import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.cart().items).toHaveLength(0);
    expect(service.cartItemCount()).toBe(0);
    expect(service.cartTotal()).toBe(0);
  });

  it('should add item to cart', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    expect(service.cart().items).toHaveLength(1);
    expect(service.cartItemCount()).toBe(1);
  });

  it('should increase quantity for duplicate item', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.addToCart('ceta-core', 'ceta-core-basic');
    expect(service.cart().items).toHaveLength(1);
    expect(service.cartItemCount()).toBe(2);
  });

  it('should add different items separately', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.addToCart('ceta-level', 'ceta-level-pro');
    expect(service.cart().items).toHaveLength(2);
    expect(service.cartItemCount()).toBe(2);
  });

  it('should calculate total correctly', () => {
    service.addToCart('ceta-core', 'ceta-core-basic'); // 249€
    expect(service.cartTotal()).toBe(249);
  });

  it('should calculate total for multiple items', () => {
    service.addToCart('ceta-core', 'ceta-core-basic'); // 249€
    service.addToCart('ceta-core', 'ceta-core-basic'); // +249€
    expect(service.cartTotal()).toBe(498);
  });

  it('should remove item from cart', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.removeFromCart('ceta-core', 'ceta-core-basic');
    expect(service.cart().items).toHaveLength(0);
  });

  it('should update quantity', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.updateQuantity('ceta-core', 'ceta-core-basic', 5);
    expect(service.cartItemCount()).toBe(5);
  });

  it('should remove item when quantity set to 0', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.updateQuantity('ceta-core', 'ceta-core-basic', 0);
    expect(service.cart().items).toHaveLength(0);
  });

  it('should clear cart', () => {
    service.addToCart('ceta-core', 'ceta-core-basic');
    service.addToCart('ceta-level', 'ceta-level-pro');
    service.clearCart();
    expect(service.cart().items).toHaveLength(0);
    expect(service.cartItemCount()).toBe(0);
  });
});
