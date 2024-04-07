def LoadAccountCreatedSuccessEmail(otp):
    from .Loader.account_creation_was_successfull import html_content
    return html_content.format(otp=otp)

def LoadOTPStatus(status):
    from .Loader import opt_verification
    return opt_verification.OTPStatusEmail(status)
