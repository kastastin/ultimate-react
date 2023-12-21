import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((el) => el.country).includes(curr.country))
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
