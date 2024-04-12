def LoadAccountCreatedSuccessEmail(otp):
    from .Loader.account_creation_was_successfull import createContent
    return createContent(otp=otp)

def LoadOTPStatus(status):
    from .Loader import opt_verification
    return opt_verification.OTPStatusEmail(status)
