
export function env(envVariable) {

  const envVariableTable = {
    "backendIP" : process.env.BACKEND_IP,
    "apiVersion": process.env.API_VERSION
  }

  return envVariableTable[envVariable]; 
}
