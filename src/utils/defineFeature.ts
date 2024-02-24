type Features = {
    isSale: boolean;
    isNew: boolean;
    isTop: boolean;
  };
  
export  const defineFeatureString = (features: Features): string => {
    if (features.isSale) {
      return 'Sale';
    } else if (features.isNew) {
      return 'New';
    } else if (features.isTop) {
      return 'Top';
    } else {
      return 'Buy Now!';
    }
};
  
export  const defineFeatureColor= (features: Features): string => {
    if (features.isSale) {
      return 'Red';
    } else if (features.isNew) {
      return 'Blue';
    } else if (features.isTop) {
      return '#ffb700';
    } else {
      return '#00e339';
    }
};
 