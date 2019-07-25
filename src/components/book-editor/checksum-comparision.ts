const compareChecksum = (checksum: string, formValues: string) => {
  console.log(checksum);
  console.log(formValues);
  return checksum === formValues;
};

export default compareChecksum;
