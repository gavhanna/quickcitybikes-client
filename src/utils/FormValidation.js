export const formValid = ({ isError, ...rest }) => {
  // let isValid = false;
  const errs = [];

  Object.values(isError).forEach((val) => {
    if (val.length > 0) {
      errs.push(val);
    }
  });

  // Object.values(rest).forEach((val) => {
  //   if (val === '') {
  //     errs.push(val);
  //   }
  // });

  return errs.length === 0;
};
