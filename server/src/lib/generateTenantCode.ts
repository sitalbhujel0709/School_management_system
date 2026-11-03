export const generateTenantCode = ():string => {
  const date = new Date().toISOString().split("T")[0];
  const random = Math.floor(Math.random()*999)
  const code = `TNT_${date.split("-").join("")}_${random}`;
  return code;
}