export class Product {
  /** @type {string[]|Supplier[]} */
  supplierId = undefined

  /** @type {string[]|MasterCategory[]} */
  masterCategoryId = undefined

  /** @type {string[]|MainCategory[]} */
  mainCategoryId = undefined

  /** @type {string[]|SubCategory[]} */
  subCategoryId = undefined

  /** @type {boolean} */
  isFeatured = undefined

  /** @type {boolean} */
  isKillerDeal = undefined

  /** @type {boolean} */
  // approved = undefined

  /** @type {boolean} */
  status = true

  /** @type {boolean} */
  hideWarranty = undefined

  /** @type {string} */
  warrantyMonths = undefined

  /** @type {string} */
  description = undefined

  /** @type {number} */
  price = undefined

  /** @type {string} */
  images = []

  /** @type { number} */
  adminCommission = 0

  /** @type {string} */
  name = undefined

  // /** @type {string} */
  // color = undefined
  //
  // /** @type {string} */
  // ram = undefined
  //
  // /** @type {string} */
  // storage = undefined
  //
  // /** @type {string} */
  // version = undefined
  //
  // /** @type {int} */
  // price = undefined

  variants = []
  options = []
}
