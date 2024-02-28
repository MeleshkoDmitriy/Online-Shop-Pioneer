import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterByFeatures, resetFilters, sortByPrice } from "../../../../Redux/Slices/productsSlice";
import { useState } from "react";

const BarWrapper = styled.section`
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.primary};
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .select {
    margin-left: ${props => props.theme.padding.primary};
  }
`;

export const FilterBar = () => {
  const { defaultsSelect } = useSelector(({ products }) => products);
  const [featureValue, setFeatureValue] = useState(defaultsSelect[0]);
  const [priceValue, setPriceValue] = useState(defaultsSelect[1]);

  const dispatch = useDispatch();

  const handleFeatures = (value) => {
    setFeatureValue(value);
    dispatch(filterByFeatures(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setFeatureValue(defaultsSelect[0]);
    setPriceValue(defaultsSelect[1]);
  };

  const handlePrice = (value) => {
    setPriceValue(value);
    dispatch(sortByPrice(value));
  };

  return (
    <BarWrapper>
      <div className="block">
        <span>Features filter:</span>
        <Select
          className="select features"
          placeholder={defaultsSelect[0]}
          value={featureValue}
          style={{ width: 200 }}
          onChange={handleFeatures}
          options={[
            { value: 'all products', label: 'All products' },
            { value: 'top', label: 'Top' },
            { value: 'new', label: 'New' },
            { value: 'sale', label: 'Sale' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </div>
      <div className="block">
        <span>Sorting by price:</span>
        <Select
          className="select price"
          placeholder={defaultsSelect[1]}
          value={priceValue}
          style={{ width: 200 }}
          onChange={handlePrice}
          options={[
            { value: 'default order', label: 'Default order' },
            { value: 'from chip to expensive', label: 'From chip to expensive' },
            { value: 'from expensive to ship', label: 'From expensive to ship' },
          ]}
        />
      </div>
      <div className="button">
        <Button type="default" onClick={handleReset}>
          Reset filters
        </Button>
      </div>
    </BarWrapper>
  );
};
