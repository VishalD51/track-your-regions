import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from '@mui/material';
import { useNavigation } from './NavigationContext';
import { fetchAncestors, fetchRegion } from '../api';
import { defaultRegion } from './constants';

const BreadcrumbNavigation = () => {
  const { selectedRegion, setSelectedRegion, selectedHierarchy } =
    useNavigation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([defaultRegion]);

  useEffect(() => {
    const fetchAndSetAncestors = async () => {
      if (selectedRegion.id !== null && selectedRegion.id !== 0) {
        const ancestors = await fetchAncestors(
          selectedRegion.id,
          selectedHierarchy.hierarchyId
        );
        if (Array.isArray(ancestors)) {
          const reversedAncestors = ancestors.reverse();
          setBreadcrumbItems([defaultRegion, ...reversedAncestors]);
        } else {
          console.error('Ancestors is not an array:', ancestors);
        }
      } else {
        setBreadcrumbItems([defaultRegion]);
      }
    };
    fetchAndSetAncestors();
  }, [selectedRegion, selectedHierarchy]);

  const handleBreadcrumbClick = async (regionId, index) => {
    let hasSubregions;
    if (regionId === null || regionId === 0) {
      hasSubregions = true;
    } else {
      try {
        const region = await fetchRegion(
          regionId,
          selectedHierarchy.hierarchyId
        );
        hasSubregions = region.hasSubregions;
      } catch (error) {
        console.error(
          `Error fetching region ${regionId}, consider the region as not having subregions:`,
          error
        );
        hasSubregions = false;
      }
    }
    setSelectedRegion({
      id: regionId,
      name: breadcrumbItems[index].name,
      hasSubregions: hasSubregions,
    });
    // Truncate the breadcrumbItems array up to the clicked index + 1
    setBreadcrumbItems((prevItems) => prevItems.slice(0, index + 1));
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <Typography
          color="inherit"
          key={index}
          onClick={() =>
            handleBreadcrumbClick(item.id, index, item.hasSubregions)
          }
          style={{ cursor: 'pointer' }}
        >
          {item.name}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
