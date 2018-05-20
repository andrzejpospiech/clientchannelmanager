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


// module.exports = {
//   getTitleValidationState: RealPropertyValidator.getTitleValidationState(),
//   getHeadlineValidationState: RealPropertyValidator.getHeadlineValidationState(),
// }
//export  getTitleValidationState ;
//export const getHeadlineValidationState = RealPropertyValidator.getHeadlineValidationState();
//export default RealPropertyValidator;