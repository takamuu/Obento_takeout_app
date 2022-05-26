/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
  Center,
  HStack,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useDisclosure } from '@chakra-ui/hooks';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import { FoodOrderModal } from 'components/organisms/food/FoodOrderModal';
import { useSelectFood } from 'hooks/useSelectFood';
import { Image, useBreakpointValue } from '@chakra-ui/react';
// import mapStyles from './mapUtils/mapStyles';

export const Foods: VFC = memo(() => {
  // For FoodModal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getFoods, foods, loading } = useFoods();
  const { onSelectFood, selectedFood } = useSelectFood();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const history = useHistory();
  // レストランページから店舗情報を受取る
  const resultState = history.location.state;
  const restaurant = resultState['restaurant'];
  const onClickFood = useCallback(
    (selectFoodId: number) => {
      onSelectFood({ selectFoodId, foods, onOpen });
    },
    [foods, onSelectFood, onOpen]
  );
  const variant = useBreakpointValue({ base: '360px', md: '400px' });
  const onClickHome = () => history.push(`/`);
  // Setting Google map
  const containerStyle = {
    width: variant,
    height: '267px',
  };
  const center = {
    lat: 34.6663,
    lng: 133.91779,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  const [map, setMap] = useState(null);
  const onLoad = (map) => {
    const sw = new window.google.maps.LatLng(34.6653, 133.91769);
    const ne = new window.google.maps.LatLng(34.6673, 133.91789);
    const bounds = new window.google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds);
    setMap(map);
  };
  const onUnmount = (map) => {
    setMap(null);
  };

  useEffect(() => {
    getFoods(restaurantId);
  }, []);

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap>
          <VStack
            paddingTop={10}
            w="full"
            justify={'center'}
            display={{ base: 'flex', md: 'none' }}
          >
            <Image
              w="200px"
              _hover={{ cursor: 'pointer', opacity: 0.8 }}
              onClick={onClickHome}
              src={`${process.env.PUBLIC_URL}${restaurant.image}`}
            />
            <Text fontFamily={'sans-serif'} fontWeight={'bold'} color="brand">
              {restaurant.name}
            </Text>
          </VStack>
          <HStack
            paddingTop={{ base: 'none', md: '10' }}
            w="full"
            justify={'center'}
          >
            <VStack display={{ base: 'none', md: 'flex' }}>
              <Image
                w="200px"
                _hover={{ cursor: 'pointer', opacity: 0.8 }}
                onClick={onClickHome}
                src={`${process.env.PUBLIC_URL}${restaurant.image}`}
              />
              <Text
                fontFamily={'sans-serif'}
                fontWeight={'bold'}
                color="brand"
                textAlign={'center'}
              >
                {restaurant.name}
              </Text>
            </VStack>
            <VStack paddingBottom={{ base: '10', md: '0' }}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={17}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                ></GoogleMap>
              ) : (
                <></>
              )}
              <Text
                fontFamily={'sans-serif'}
                fontWeight={'bold'}
                color="brand"
                textAlign={'center'}
              >
                {restaurant.city}
                {restaurant.block_building}／ TEL {restaurant.phone_number}
              </Text>
            </VStack>
          </HStack>
          <Wrap p={{ base: 4, md: 10 }} justify={'center'}>
            {foods.map((food) => (
              <WrapItem key={food.id}>
                <FoodCard
                  id={food.id}
                  imageUrl={`${process.env.PUBLIC_URL}${food.image}`}
                  foodName={food.name}
                  foodDescription={food.food_description}
                  foodPrice={food.price}
                  onClick={onClickFood}
                />
              </WrapItem>
            ))}
          </Wrap>
          <Spacer p={6} />
        </Wrap>
      )}
      <FoodOrderModal
        food={selectedFood}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
    </>
  );
});
