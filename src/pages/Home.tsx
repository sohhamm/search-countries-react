import { Box, SimpleGrid, useCounter } from '@chakra-ui/react';
import * as React from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import { useGetAllCountries } from '../data/use-countries';
import { useCountryStore } from '../store/country-store';

export default function Home() {
  const { countries, error } = useGetAllCountries();
  const setCountryNames = useCountryStore((state) => state.setCountryNames);
  const regionFilter = useCountryStore((state) => state.regionFilter);

  React.useEffect(() => {
    let arr: string[] = [];
    if (countries) {
      countries.forEach((country: any) => {
        arr.push(country.name);
      });
      setCountryNames(arr);
    }
  }, [countries]);

  if (error) return <p>error fetching data..</p>;
  if (!countries) return <p>loading...</p>;
  console.log(countries);

  return (
    <Box>
      <Header />
      <SimpleGrid
        columns={{ sm: 1, md: 3, lg: 4 }}
        spacing={16}
        mx="auto"
        w="100%"
        px="4em"
      >
        {countries
          .filter((country: any) => {
            if (regionFilter) {
              console.log(country.region);
              return country.region === regionFilter;
            } else {
              return true;
            }
          })
          .map((country: any) => (
            <CountryCard country={country} key={country.name} />
          ))}
      </SimpleGrid>
    </Box>
  );
}
