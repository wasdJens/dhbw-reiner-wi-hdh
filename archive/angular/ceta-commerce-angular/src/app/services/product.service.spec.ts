import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 3 products', () => {
    const products = service.getAllProducts();
    expect(products).toHaveLength(3);
  });

  it('should find product by ID', () => {
    const product = service.getProductById('ceta-core');
    expect(product).toBeTruthy();
    expect(product!.name).toBe('CetaCore');
  });

  it('should return null for unknown product ID', () => {
    expect(service.getProductById('unknown')).toBeNull();
  });

  it('should find product by slug', () => {
    const product = service.getProductBySlug('ceta-guard');
    expect(product).toBeTruthy();
    expect(product!.name).toBe('CetaGuard');
  });

  it('should search products by name', () => {
    const results = service.searchProducts('CetaCore');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('ceta-core');
  });

  it('should search products by category', () => {
    const results = service.searchProducts('Sicherheit');
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('should return all products for empty search', () => {
    expect(service.searchProducts('')).toHaveLength(3);
    expect(service.searchProducts('  ')).toHaveLength(3);
  });

  it('should find variant by ID', () => {
    const variant = service.getVariantById('ceta-core', 'ceta-core-pro');
    expect(variant).toBeTruthy();
    expect(variant!.tier).toBe('pro');
  });

  it('should return null for unknown variant', () => {
    expect(service.getVariantById('ceta-core', 'unknown')).toBeNull();
  });

  it('should get unique categories', () => {
    const categories = service.getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(3);
    expect(categories).toContain('Sicherheit');
  });

  it('should calculate starting price', () => {
    const product = service.getProductById('ceta-core')!;
    const startingPrice = service.getStartingPrice(product);
    expect(startingPrice).toBe(249);
  });
});
