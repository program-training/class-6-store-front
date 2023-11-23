export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  clickCount: number;
  quantity: number;
  attributes: Attributes[];
}
export interface Attributes {
  key: string;
  value: number | string;
}


export function filterProducts(name: string, value: string | number, products: Product[], activeFilters: { [name: string]: string | number }) {
      const filterKey = `${name}_${value}`;
      if (activeFilters[filterKey]) {
        delete activeFilters[filterKey];
      } else {
        activeFilters[filterKey] = filterKey;
      }
    
  
    const newFilteredProducts = products?.filter(product => {
      return Object.keys(activeFilters).every(filter => {
        const [filterName, filterValue] = filter.split('_');
        return product.attributes.some(attribute => {
          return attribute.key === filterName && attribute.value === filterValue;
        });
      });
    });
  
    return newFilteredProducts ?? null;
  }


  export function getUniqueAttributes(products: Product[]): Record<string, (string | number)[]> {
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