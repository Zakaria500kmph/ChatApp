class apiError extends Error{
    constructor(message="This is Error",code){
      super(message)
      this.message=message,
      this.code=code
    }
}
export {apiError}