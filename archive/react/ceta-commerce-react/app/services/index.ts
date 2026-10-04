export {
  getAllProducts,
  getProductById,
  getProductBySlug,
  searchProducts,
  getVariantById,
  getCategories,
  getStartingPrice,
} from "./product.service";

export {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  getCartItemCount,
  clearCart,
  onCartChange,
} from "./cart.service";

export {
  getAllRequests,
  getRequestById,
  getRequestsByStatus,
  createRequest,
  updateRequestStatus,
  getOpenRequestCount,
  onMaintenanceChange,
} from "./maintenance.service";
