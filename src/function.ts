import { Product } from "./interfaces/product";

export function filterProducts(
  name: string,
  value: string | number,
  products: Product[],
  activeFilters: { [name: string]: string | number },
  setValue: React.Dispatch<React.SetStateAction<number | null>>
) {
  setValue(value ? +value : null);
  let filterByPrice = products;
  if (name === "price") {
    filterByPrice = products?.filter((product) => {
      return product.price <= +value;
    });
  }
  if (name !== "price") {
    const filterKey = `${name}_${value}`;
    if (activeFilters[filterKey]) {
      delete activeFilters[filterKey];
    } else {
      activeFilters[filterKey] = filterKey;
    }
  }
  const newFilteredProducts = filterByPrice?.filter((product) => {
    return Object.keys(activeFilters).every((filter) => {
      const [filterName, filterValue] = filter.split("_");
      return product.attributes.some((attribute) => {
        return attribute.key === filterName && attribute.value === filterValue;
      });
    });
  });
  return newFilteredProducts ?? null;
}
export function getUniqueAttributes(
  products: Product[]
): Record<string, (string | number)[]> {
  const groupedAttributes: Record<string, (string | number)[]> = {};
  products?.forEach((product) => {
    product.attributes.forEach((attribute) => {
      const { key, value } = attribute;
      if (!groupedAttributes[key]) {
        groupedAttributes[key] = [];
      }
      if (!groupedAttributes[key].includes(value)) {
        groupedAttributes[key].push(value);
      }
    });
  });
  return groupedAttributes;
}
