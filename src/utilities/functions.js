export const searchCategoryFunction = (dropDown) => {
  let searchCat;
  if (dropDown === "Name") {
    searchCat = `&beer_name=`;
  } else if (dropDown === "foodName") {
    console.log("on food");
    searchCat = `&food=`;
  } else if (dropDown === "maltName") {
    searchCat = `&malt=`;
  } else if (dropDown === "hopsName") {
    searchCat = `&hops=`;
  } else if (dropDown === "yeastName") {
    searchCat = `&yeast=`;
  } else {
    searchCat = "";
  }
  return searchCat;
};

export const searchExtensionFunction = (search, searchCat) => {
  let searchExten;
  if (search !== "") {
    searchExten = searchCat + search;
  } else {
    searchExten = `&page=1&per_page=80`;
  }
  return searchExten;
};

export const classCheckFunction = (classicBeer) => {
  let classicCheck;
  if (classicBeer === true) {
    classicCheck = "&brewed_before=01-2010";
  } else {
    classicCheck = "";
  }
  return classicCheck;
};

export const acidFilterFunction = (boxvalue, beers) => {
  const acidityCheck = (pH) => {
    return pH <= 4;
  };
  let filteredbeers;
  const acidBeer = boxvalue.checked;
  if (acidBeer === true) {
    filteredbeers = beers.filter((beer) => acidityCheck(beer.ph));
  } else {
    filteredbeers = beers;
  }
  return filteredbeers;
};

export const sortBeersFunction = (sortDropDown, filteredbeers) => {
  let sortedBeers;
  if (sortDropDown === "default") {
    sortedBeers = filteredbeers;
  } else if (sortDropDown === "abvHighLow") {
    sortedBeers = filteredbeers.sort((a, b) => b.abv - a.abv);
  } else if (sortDropDown === "abvLowHigh") {
    sortedBeers = filteredbeers.sort((a, b) => a.abv - b.abv);
  } else if (sortDropDown === "releaseRecent") {
    sortedBeers = filteredbeers.sort(function (a, b) {
      let aa = a.first_brewed.split("/").reverse().join(),
        bb = b.first_brewed.split("/").reverse().join();
      return bb < aa ? -1 : bb > aa ? 1 : 0;
    });
  } else if (sortDropDown === "releaseOld") {
    sortedBeers = filteredbeers.sort(function (a, b) {
      let aa = a.first_brewed.split("/").reverse().join(),
        bb = b.first_brewed.split("/").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
  } else {
    sortedBeers = filteredbeers;
  }
  return sortedBeers;
};

export const preAPIFilterCheck = (normalBeersCheck, strengthGreaterThanSix) => {
  if (normalBeersCheck === true && strengthGreaterThanSix === true) {
    return [6, 12];
  } else if (normalBeersCheck === false && strengthGreaterThanSix === true) {
    return [6, 56];
  } else if (normalBeersCheck === true && strengthGreaterThanSix === false) {
    return [3, 12];
  } else if (normalBeersCheck === false && strengthGreaterThanSix === false) {
    return [0, 56];
  } else {
    console.log("hello");
  }
};
