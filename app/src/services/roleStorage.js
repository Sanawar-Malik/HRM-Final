
const storeRole = (value) => {
  if (value) {
   //  console.log("store role", value);
    const { role } = value;
    localStorage.setItem('role', role);
  }
};
const getRole = () => {
  let role = localStorage.getItem('role');
  return { role }
}
const removeRole = () => {
  localStorage.removeItem('role');

}

export { storeRole, getRole, removeRole };
