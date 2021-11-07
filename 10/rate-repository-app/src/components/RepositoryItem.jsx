// Example of props
// {
//   id: "reduxjs.redux",
//   fullName: "reduxjs/redux",
//   description: "Predictable state container for JavaScript apps",
//   language: "TypeScript",
//   forksCount: 13902,
//   stargazersCount: 52869,
//   ratingAverage: 0,
//   reviewCount: 0,
//   ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
// }

import React from "react";
import { Text, View } from "react-native";

const RepositoryItem = ({ data }) => {
  console.log(data);
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
  } = data;
  return (
    <View>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
