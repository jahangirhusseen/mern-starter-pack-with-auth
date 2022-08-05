// Create error 

const createError = (status,message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err
}
// Export createError
export default createError

