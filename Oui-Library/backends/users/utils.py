# utils.py
import random


def getOTP():
    return ''.join(random.choices('123456789012345326789291028',k= 8))
