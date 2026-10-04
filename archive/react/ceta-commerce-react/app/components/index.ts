/**
 * Component Catalog – Zentraler Export aller wiederverwendbaren Komponenten
 *
 * Verwendung in Smart Components (Pages):
 * import { Button, ProductCard, StatusBadge } from '~/components';
 *
 * Dieses Pattern heißt "Barrel Export" und sorgt für saubere Imports.
 */

// UI Primitives
export { Button } from "./ui/Button";
export { Badge } from "./ui/Badge";
export { Card, CardImage, CardBody, CardFooter } from "./ui/Card";
export { Input } from "./ui/Input";
export { Select } from "./ui/Select";
export { TextArea } from "./ui/TextArea";

// Layout
export { Header } from "./layout/Header";
export { Footer } from "./layout/Footer";
export { Navigation } from "./layout/Navigation";
export { PageHeader } from "./layout/PageHeader";

// Product
export { ProductCard } from "./product/ProductCard";
export { ProductGrid } from "./product/ProductGrid";
export { VariantPicker } from "./product/VariantPicker";
export { PriceDisplay } from "./product/PriceDisplay";
export { FeatureList } from "./product/FeatureList";

// Cart
export { CartBadge } from "./cart/CartBadge";
export { CartItemRow } from "./cart/CartItemRow";
export { CartSummary } from "./cart/CartSummary";

// Maintenance
export { StatusBadge } from "./maintenance/StatusBadge";
export { RequestCard } from "./maintenance/RequestCard";
export { RequestList } from "./maintenance/RequestList";
export { RequestForm } from "./maintenance/RequestForm";
