const baseUrl = process.env.REACT_APP_API_FILE_BASE_URL;
const getSysFileUrl = (id = '') => {
  return `${baseUrl}/sys-file/${id}`
}

export default getSysFileUrl