export const zFill = (str,nums) => {
  let len = str.length
  for(let i = len;i < nums;i++){
    str = '0' + str
  }
  return str
}