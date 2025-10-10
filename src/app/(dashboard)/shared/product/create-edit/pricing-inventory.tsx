import FormGroup from '@/app/(dashboard)/shared/form-group';
import cn from '@/utils/class-names';
import ProductAvailability from '@/app/(dashboard)/shared/product/create-edit/product-availability';
import InventoryTracing from '@/app/(dashboard)/shared/product/create-edit/inventory-tracking';
import ProductPricing from '@/app/(dashboard)/shared/product/create-edit/product-pricing';
import { PriceingType, PriceingTypeOption, productQuantity, productVariants, UOMOption } from './form-utils';
import { Select } from 'rizzui/select';
import { Controller, useFormContext } from 'react-hook-form';
import { Flex } from 'rizzui/flex';
import KitShow from '@/kit/components/KitShow/KitShow';
import { useEffect } from 'react';
import ProductQuantity from './product-quantity';

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isPriceingType = watch('priceingType')

  useEffect(() => {
    if (isPriceingType === PriceingType.SALEBASEPRICEING) {
      setValue('isQuantityPrice', false);
      setValue('quantityPrice', productQuantity);
      setValue('productVariants', productVariants);
    } else if (isPriceingType === PriceingType.PRODUCTBASEPRICING) {
      setValue('mrp', null);
      setValue('b2bSalePrice', null);
      setValue('b2cSalePrice', null);
    }
  }, [isPriceingType, setValue]);

  return (
    <>
      <Flex align="center" className="order-2 @3xl:order-1 @3xl:max-w-[400px]">
        <Controller
          name='priceingType'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              selectClassName="h-9 !min-w-[200px]"
              optionClassName="h-9"
              className="w-full pt-5"
              dropdownClassName="!z-100 h-auto p-1.5"
              options={PriceingTypeOption}
              placeholder={'Select Priceing Type'}
              value={value ?? null}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )}
        />
        <Controller
          name='uom'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              selectClassName="h-9 !min-w-[150px]"
              optionClassName="h-9"
              className="w-full pt-5"
              dropdownClassName="!z-100 h-auto p-1.5"
              options={UOMOption}
              placeholder={'Select UOM'}
              value={value ?? null}
              onChange={onChange}
              getOptionValue={(option) => option.label}
            />
          )}
        />
      </Flex>
      <KitShow show={isPriceingType === PriceingType.SALEBASEPRICEING}>
        <FormGroup
          title="Pricing"
          description="Add your product pricing here"
          className={cn(className)}
        >
          <ProductPricing />
        </FormGroup>
      </KitShow>
      <KitShow show={isPriceingType === PriceingType.PRODUCTBASEPRICING}>
        <FormGroup
          title="Quantity Options"
          description="Add your product quantity here"
          className={cn(className)}
        >
          <ProductQuantity />
        </FormGroup>
        <FormGroup
          title="Variant Options"
          description="Add your product variants here"
          className={cn(className)}
        >
          <InventoryTracing />
        </FormGroup>
      </KitShow>
      <FormGroup
        title="Availability"
        description="Add your product inventory info here"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup>
    </>
  );
}
