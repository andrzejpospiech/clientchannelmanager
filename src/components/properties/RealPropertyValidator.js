export function getTitleValidationState(title) {
    if (title == null) return(null);
    const length = title.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }
  
  
export  function getHeadlineValidationState(headline) {
    if (headline == null) return(null);
    const length = headline.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getDescriptionValidationState(description) {
    if (description == null) return(null);
    const length = description.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getAddressValidationState(address) {
    if (address == null) return(null);
    const length = address.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getCityValidationState(city) {
    if (city == null) return(null);
    const length = city.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getProvinceValidationState(province) {
    if (province == null) return(null);
    const length = province.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getPostalCodeValidationState(postalCode) {
    if (postalCode == null) return(null);
    const length = postalCode.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getCountryValidationState(country) {
    if (country == null) { return (null) }
    else { return ("success"); }
  }


export  function getLatitudeValidationState(latitude) {
    if (latitude == null) return(null);
    const length = latitude.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getLongitudeValidationState(longitude) {
    if (longitude == null) return(null);
    const length = longitude.length;
    if (length > 10) return 'success';
    else if (length > 0) return 'warning';
    else if (length === 0) return 'error';
    return null;
  }


export  function getPropertyTypeValidationState(propertyType) {
    if (propertyType == null) { return (null) }
    else { return ("success"); }
  }


export  function getCurrencyTypeValidationState(currencyType) {
    if (currencyType == null) { return (null) }
    else { return ("success"); }
  }


export function getIsInstantBookableValidationState(isInstantBookable) {
    if (isInstantBookable == null) { return (null) }
    else { return ("success"); }
}


// module.exports = {
//   getTitleValidationState: RealPropertyValidator.getTitleValidationState(),
//   getHeadlineValidationState: RealPropertyValidator.getHeadlineValidationState(),
// }
//export  getTitleValidationState ;
//export const getHeadlineValidationState = RealPropertyValidator.getHeadlineValidationState();
//export default RealPropertyValidator;